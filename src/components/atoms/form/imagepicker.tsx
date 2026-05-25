import React, { useState, useEffect, useRef } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { DocumentUpload, Gallery } from "iconsax-reactjs";
import fileUploadReq from "@/api/uploader";
import { Progress } from "@/components/ui/progress";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/Toast";
import CustomButton from "../button/CustomButton";

interface ImagePickerProp<TFieldValues extends FieldValues = FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

function ImagePicker<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  defaultValue,
  onChange,
}: ImagePickerProp<TFieldValues>) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    defaultValue || null,
  );
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const { handleSuccess, handleError } = useToast();

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl && selectedFile) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl, selectedFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (fieldOnChange: (value: any) => void) => {
    if (!selectedFile) {
      inputRef.current?.click();
      return;
    }

    try {
      setUploading(true);
      const data = await fileUploadReq({
        pathname: "product-images",
        payload: { productImages: [selectedFile] },
        onProgress: (percent) => setProgress(percent),
      });

      if (data) {
        handleSuccess("Image uploaded successfully");
      }

      const uploadedUrl = Array.isArray(data) ? data[0] : data;

      fieldOnChange(uploadedUrl);
      if (onChange) onChange(uploadedUrl);
      setPreviewUrl(uploadedUrl);
      setSelectedFile(null);
      setProgress(0);
    } catch (error) {
      handleError("Image upload failed", error?.toString() || "");
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full md:max-w-[50%]">
          {label && (
            <FormLabel className="text-sm lg:text-base text-primary-dark font-medium mb-1">
              {label}
            </FormLabel>
          )}
          <FormControl>
            <div className="flex flex-col items-center space-y-3">
              <div
                className={`w-full h-48 bg-[#FEFEFE] border border-[#F3F2F4] rounded-xl flex justify-center items-center overflow-hidden`}
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Uploaded"
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="flex flex-col items-center space-y-2 text-sm">
                    <Gallery size="32" color="#1A191C" />
                    <p className="font-bold">No image selected</p>
                    <p>PNG, JPEG. Max 5MB</p>
                  </div>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={inputRef}
                onChange={handleFileChange}
              />

              <CustomButton
                type="button"
                variant={selectedFile ? "default" : "outline"}
                size="sm"
                className="flex items-center space-x-2"
                onClick={() => handleUpload(field.onChange)}
                loading={uploading}
              >
                <DocumentUpload size="18" />
                <span>{selectedFile ? "Upload" : "Select Image"}</span>
              </CustomButton>
              {progress > 0 && uploading && (
                <Progress className="w-full" value={progress} />
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ImagePicker;
