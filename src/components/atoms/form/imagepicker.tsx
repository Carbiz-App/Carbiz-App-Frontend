import fileUploadReq from "@/api/uploader";
import CustomButton from "@/components/atoms/button/CustomButton";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import {
  formatFileSize,
  getFileSizeError,
  MAX_UPLOAD_FILE_SIZE_BYTES,
} from "@/lib/upload";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/Toast";
import { CheckCircle2, ImagePlus, RefreshCw, Upload, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface ImagePickerProp<TFieldValues extends FieldValues = FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  description?: string;
  defaultValue?: string;
  /** View existing uploads only — no picking or replacing */
  readOnly?: boolean;
  /** Block server upload while still allowing local file selection */
  uploadDisabled?: boolean;
  maxFileSize?: number;
  onChange?: (value: string) => void;
}

function ImagePicker<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  description,
  defaultValue,
  readOnly = false,
  uploadDisabled = false,
  maxFileSize = MAX_UPLOAD_FILE_SIZE_BYTES,
  onChange,
}: ImagePickerProp<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <ImagePickerField
          label={label}
          description={description}
          defaultValue={defaultValue}
          readOnly={readOnly}
          uploadDisabled={uploadDisabled}
          maxFileSize={maxFileSize}
          value={field.value as string | undefined}
          onChange={(url) => {
            field.onChange(url);
            onChange?.(url);
          }}
        />
      )}
    />
  );
}

type ImagePickerFieldProps = {
  label?: string;
  description?: string;
  defaultValue?: string;
  readOnly?: boolean;
  uploadDisabled?: boolean;
  maxFileSize?: number;
  value?: string;
  onChange: (value: string) => void;
};

function ImagePickerField({
  label,
  description,
  defaultValue,
  readOnly = false,
  uploadDisabled = false,
  maxFileSize = MAX_UPLOAD_FILE_SIZE_BYTES,
  value,
  onChange,
}: ImagePickerFieldProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    value || defaultValue || null,
  );
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const { handleSuccess, handleError } = useToast();

  const uploadedUrl = value || defaultValue;
  const isUploaded = !!uploadedUrl && !uploading && !error && !pendingFile;
  const isPendingPick =
    !!pendingFile && !uploading && !error && uploadDisabled;

  useEffect(() => {
    if (value) {
      setPreviewUrl(value);
      setError(null);
      setPendingFile(null);
    } else if (defaultValue && !pendingFile) {
      setPreviewUrl(defaultValue);
    }
  }, [value, defaultValue, pendingFile]);

  const uploadFile = useCallback(
    async (file: File) => {
      if (uploadDisabled) {
        return;
      }

      const sizeError = getFileSizeError(file, maxFileSize);
      if (sizeError) {
        setError(sizeError);
        handleError("File too large", sizeError);
        return;
      }

      setUploading(true);
      setProgress(0);
      setError(null);

      try {
        const data = await fileUploadReq({
          pathname: "product-images",
          payload: { productImages: [file] },
          onProgress: (percent) => setProgress(percent),
        });

        const uploaded = Array.isArray(data) ? data[0] : data;

        if (!uploaded) {
          throw new Error("No file URL returned");
        }

        onChange(uploaded);
        setPreviewUrl(uploaded);
        setPendingFile(null);
        handleSuccess("Document uploaded successfully");
      } catch (err) {
        setError("Upload failed. Please try again.");
        handleError("Image upload failed", err?.toString() || "");
      } finally {
        setUploading(false);
      }
    },
    [handleError, handleSuccess, maxFileSize, onChange, uploadDisabled],
  );

  const selectFile = useCallback(
    (file: File) => {
      setPendingFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setProgress(0);

      if (uploadDisabled) {
        setError(null);
        handleError(
          "Upload blocked",
          "Your documents are approved. New uploads are not allowed.",
        );
        return;
      }

      const sizeError = getFileSizeError(file, maxFileSize);
      if (sizeError) {
        setError(sizeError);
        handleError("File too large", sizeError);
        return;
      }

      setError(null);
      void uploadFile(file);
    },
    [handleError, maxFileSize, uploadDisabled, uploadFile],
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) selectFile(file);
    },
    [selectFile],
  );

  const onDropRejected = useCallback(() => {
    const message = `File is too large. Maximum size is ${formatFileSize(maxFileSize)}.`;
    setError(message);
    handleError("File too large", message);
  }, [handleError, maxFileSize]);

  const { getRootProps, getInputProps, isDragActive, open, isDragReject } =
    useDropzone({
      onDrop,
      onDropRejected,
      accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"] },
      maxFiles: 1,
      maxSize: maxFileSize,
      multiple: false,
      disabled: uploading || readOnly,
      noClick: true,
      noKeyboard: false,
    });

  const clearSelection = () => {
    if (pendingFile && previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(uploadedUrl || null);
    setPendingFile(null);
    setError(null);
    setProgress(0);
  };

  const removeUploaded = () => {
    onChange("");
    setPreviewUrl(null);
    setPendingFile(null);
    setError(null);
    setProgress(0);
  };

  return (
    <FormItem className="w-full">
      {label && (
        <FormLabel className="text-sm lg:text-base text-primary-dark font-medium">
          {label}
        </FormLabel>
      )}
      {description && (
        <p className="text-xs text-[#837E8E] mt-1 mb-2">{description}</p>
      )}

      <FormControl>
        <div className="space-y-3">
          {!previewUrl && !uploading ? (
            readOnly ? (
              <div className="rounded-xl border-2 border-dashed border-border-gray bg-[#F9F9FA] px-4 py-8 text-center">
                <p className="text-sm text-[#837E8E]">No document uploaded</p>
              </div>
            ) : (
              <div
                {...getRootProps()}
                className={cn(
                  "rounded-xl border-2 border-dashed bg-[#FEFEFE] transition-colors outline-none",
                  isDragActive &&
                    !isDragReject &&
                    "border-primary bg-[#F1ECF9]/40",
                  isDragReject && "border-red-400 bg-red-50",
                  uploading ? "cursor-not-allowed opacity-70" : "cursor-pointer",
                )}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center gap-3 px-4 py-8 text-center">
                  <div className="flex size-11 items-center justify-center rounded-full bg-[#F1ECF9]">
                    <ImagePlus className="size-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-[#1A191C]">
                      {isDragActive
                        ? "Drop your file here"
                        : "Upload a document"}
                    </p>
                    <p className="text-xs text-[#837E8E]">
                      Drag and drop an image, or choose a file from your device
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={open}
                    className="inline-flex items-center gap-2 rounded-lg border border-primary bg-white px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-[#F1ECF9]"
                  >
                    <Upload className="size-4" />
                    Choose file
                  </button>
                  <p className="text-[11px] text-[#A990DD]">
                    PNG, JPG, GIF or WebP · Max {formatFileSize(maxFileSize)}
                  </p>
                </div>
              </div>
            )
          ) : (
            <div
              className={cn(
                "relative overflow-hidden rounded-xl border bg-[#FEFEFE]",
                isUploaded && "border-[#027A48]/30",
                error && "border-red-300",
              )}
            >
              <div className="relative aspect-[4/3] w-full bg-[#F3F2F4]">
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt={label ? `${label} preview` : "Document preview"}
                    className="size-full object-contain"
                  />
                )}

                {uploading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/45 px-6">
                    <p className="text-sm font-medium text-white">
                      Uploading… {progress}%
                    </p>
                    <Progress value={progress} className="h-2 w-full max-w-xs" />
                  </div>
                )}

                {error && !uploading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/55 p-4 text-center">
                    <p className="text-sm font-medium text-white">{error}</p>
                    <div className="flex gap-2">
                      {pendingFile &&
                        !getFileSizeError(pendingFile, maxFileSize) && (
                          <button
                            type="button"
                            onClick={() => uploadFile(pendingFile)}
                            className="inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-xs font-medium text-[#1A191C] hover:bg-gray-100"
                          >
                            <RefreshCw className="size-3.5" />
                            Retry
                          </button>
                        )}
                      <button
                        type="button"
                        onClick={clearSelection}
                        className="rounded-md bg-white/90 px-3 py-1.5 text-xs font-medium text-[#1A191C] hover:bg-gray-100"
                      >
                        Choose another
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {(isUploaded || isPendingPick) && (
                <div className="flex items-center justify-between gap-3 border-t bg-white px-3 py-2.5">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 text-xs font-medium",
                      isPendingPick ? "text-amber-600" : "text-[#027A48]",
                    )}
                  >
                    {isPendingPick ? (
                      "Upload blocked — account verified"
                    ) : (
                      <>
                        <CheckCircle2 className="size-4" />
                        {readOnly ? "Uploaded (locked)" : "Uploaded"}
                      </>
                    )}
                  </span>
                  {!readOnly && !uploadDisabled && isUploaded && (
                    <div className="flex gap-2">
                      <CustomButton
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={open}
                      >
                        Replace
                      </CustomButton>
                      <button
                        type="button"
                        aria-label="Remove document"
                        onClick={removeUploaded}
                        className="inline-flex size-8 items-center justify-center rounded-md border border-border text-[#837E8E] hover:bg-red-50 hover:text-red-500"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  )}
                  {!readOnly && isPendingPick && (
                    <button
                      type="button"
                      onClick={clearSelection}
                      className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-[#837E8E] hover:bg-gray-50"
                    >
                      Clear
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
          {error && !previewUrl && !uploading && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
              {error}
            </p>
          )}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

export default ImagePicker;
