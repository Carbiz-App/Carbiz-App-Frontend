import { Gallery } from "iconsax-reactjs";
import React from "react";
import { Control, Controller } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useDropzone } from "react-dropzone";
import fileUploadReq from "@/api/uploader";

interface ImagePickerProp {
  name: string;
  control: Control<any>;
  label?: string;
  maxLength?: number;
  multiple?: boolean;
  onChange?: (value: string) => void;
}

const ImagePicker: React.FC<ImagePickerProp> = ({
  name,
  control,
  label,
  maxLength = 5,
  multiple = false,
  onChange,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const [uploads, setUploads] = React.useState<File[]>([]);

        const onDrop = async (acceptedFiles: File[]) => {
          const newFiles = multiple
            ? [...uploads, ...acceptedFiles]
            : acceptedFiles;
          const limitedFiles = newFiles.slice(0, maxLength);

          setUploads(limitedFiles);

          await fileUploadReq({
            pathname: "upload/kycDocuments",
            payload: { documents: limitedFiles },
          }).then((data) => {
            field.onChange(data); // send to form
            if (onChange) onChange(data);
          });
        };

        const { getRootProps, getInputProps, isDragActive } = useDropzone({
          onDrop,
          accept: { "image/*": [] },
          maxFiles: maxLength,
          multiple,
          disabled: uploads.length >= maxLength,
        });

        return (
          <FormItem className="w-full max-w-[50%]">
            {label && (
              <FormLabel className="text-sm lg:text-base text-primary-dark font-medium mb-1">
                {label}
              </FormLabel>
            )}
            <FormControl>
              <div
                className="bg-[#FEFEFE] py-10 px-5 flex flex-col justify-center items-center border border-[#F3F2F4] rounded-xl font-family-satoshi text-sm space-y-4 cursor-pointer"
                {...getRootProps()}
              >
                <Gallery size="32" color="#1A191C" />
                <p>
                  <span className="font-bold">Upload a file</span> or drag and
                  drop
                </p>
                <input {...getInputProps()} />
                <p>PNG, JPEG, PDF. Up to 5mb</p>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default ImagePicker;
