import { uploadImageRest } from "@/api/imageUpload";
import CircularProgress from "@/components/atoms/progress";
import { cn } from "@/lib/utils";
import { ProductSchemaType } from "@/schema/products.schema";
import { ImagePlus, Star, Upload, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UseFormSetValue } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const MAX_IMAGES = 5;

type ImageItem = {
  id: string;
  file: File | null;
  url: string;
  progress: number;
  uploading: boolean;
  error: string | null;
  isFeatured: boolean;
};

interface UploaderProps {
  setValue: UseFormSetValue<ProductSchemaType>;
  value: ProductSchemaType["productImages"];
  error?: string;
  initialUrls?: string[];
}

const Uploader: React.FC<UploaderProps> = ({
  setValue,
  error,
  initialUrls = [],
}) => {
  const [images, setImages] = useState<ImageItem[]>([]);

  useEffect(() => {
    if (initialUrls.length && images.length === 0) {
      const preloaded: ImageItem[] = initialUrls.map((url, index) => ({
        id: uuidv4(),
        file: null,
        url,
        progress: 100,
        uploading: false,
        error: null,
        isFeatured: index === 0,
      }));
      setImages(preloaded);
      updateForm(preloaded);
    }
  }, [initialUrls]);

  const updateForm = (imgs: ImageItem[]) => {
    const uploaded = imgs
      .filter((img) => !img.uploading && !img.error && img.url)
      .sort((a, b) =>
        a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1,
      )
      .map(({ url }) => url);
    setValue("productImages", uploaded, { shouldValidate: true });
  };

  const uploadBatch = useCallback(
    (batch: ImageItem[]) => {
      const batchFiles = batch
        .map((item) => item.file)
        .filter((file): file is File => file !== null);

      if (batchFiles.length === 0) return;

      uploadImageRest(batchFiles, (progress) => {
        batch.forEach((item) => {
          setImages((prev) =>
            prev.map((img) =>
              img.id === item.id ? { ...img, progress } : img,
            ),
          );
        });
      })
        .then((urls) => {
          setImages((prev) => {
            const updated = prev.map((img) => {
              const batchIndex = batch.findIndex((b) => b.id === img.id);
              if (batchIndex !== -1) {
                return {
                  ...img,
                  url: urls[batchIndex],
                  uploading: false,
                  progress: 100,
                };
              }
              return img;
            });

            updateForm(updated);
            return updated;
          });
        })
        .catch(() => {
          batch.forEach((item) => {
            setImages((prev) =>
              prev.map((img) =>
                img.id === item.id
                  ? { ...img, uploading: false, error: "Upload failed" }
                  : img,
              ),
            );
          });
        });
    },
    [setValue],
  );

  const queueUploads = useCallback(
    (items: ImageItem[]) => {
      const batchSize = 5;
      for (let i = 0; i < items.length; i += batchSize) {
        uploadBatch(items.slice(i, i + batchSize));
      }
    },
    [uploadBatch],
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const remainingSlots = MAX_IMAGES - images.length;
      const filesToAdd = acceptedFiles.slice(0, remainingSlots);

      const newItems: ImageItem[] = filesToAdd.map((file) => ({
        id: uuidv4(),
        file,
        url: URL.createObjectURL(file),
        progress: 0,
        uploading: true,
        error: null,
        isFeatured: false,
      }));

      setImages((prev) => {
        const hasFeatured = prev.some((img) => img.isFeatured);
        const updated = [...prev];
        newItems.forEach((item, index) => {
          if (!hasFeatured && index === 0 && prev.length === 0) {
            item.isFeatured = true;
          }
          updated.push(item);
        });
        updateForm(updated);
        return updated;
      });

      queueUploads(newItems);
    },
    [images.length, queueUploads],
  );

  const remainingSlots = MAX_IMAGES - images.length;
  const isFull = remainingSlots <= 0;
  const uploadingCount = images.filter((img) => img.uploading).length;

  const { getRootProps, getInputProps, isDragActive, open, isDragReject } =
    useDropzone({
      onDrop,
      accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"] },
      maxFiles: remainingSlots,
      multiple: true,
      disabled: isFull,
      noClick: true,
      noKeyboard: false,
    });

  const setAsFeatured = (id: string) => {
    setImages((prev) => {
      const updated = prev
        .map((img) => ({ ...img, isFeatured: img.id === id }))
        .sort((a, b) =>
          a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1,
        );
      updateForm(updated);
      return updated;
    });
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const removed = prev.find((img) => img.id === id);
      if (removed?.file && removed.url.startsWith("blob:")) {
        URL.revokeObjectURL(removed.url);
      }

      let updated = prev.filter((img) => img.id !== id);
      const removedWasFeatured = removed?.isFeatured;

      if (removedWasFeatured && updated.length > 0) {
        updated = updated.map((img, index) => ({
          ...img,
          isFeatured: index === 0,
        }));
      }

      updateForm(updated);
      return updated;
    });
  };

  const retryUpload = (id: string) => {
    const item = images.find((img) => img.id === id);
    if (!item?.file) return;

    setImages((prev) =>
      prev.map((img) =>
        img.id === id
          ? { ...img, uploading: true, error: null, progress: 0 }
          : img,
      ),
    );

    uploadBatch([item]);
  };

  return (
    <div className="p-5 space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "rounded-xl border-2 border-dashed transition-colors outline-none",
          isFull
            ? "border-border bg-muted/30 cursor-default"
            : "cursor-pointer",
          isDragActive && !isDragReject && "border-primary bg-[#F1ECF9]/40",
          isDragReject && "border-red-400 bg-red-50",
        )}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center justify-center gap-3 px-6 py-8 text-center">
          <div
            className={cn(
              "flex size-12 items-center justify-center rounded-full",
              isFull ? "bg-muted" : "bg-[#F1ECF9]",
            )}
          >
            {isFull ? (
              <Upload className="size-5 text-muted-foreground" />
            ) : (
              <ImagePlus className="size-5 text-primary" />
            )}
          </div>

          {isFull ? (
            <>
              <p className="text-sm font-medium text-[#1A191C]">
                Maximum of {MAX_IMAGES} images reached
              </p>
              <p className="text-xs text-[#837E8E]">
                Remove an image to upload a different one
              </p>
            </>
          ) : isDragActive ? (
            <>
              <p className="text-sm font-semibold text-primary">
                Drop your images here
              </p>
              <p className="text-xs text-[#837E8E]">
                You can add up to {remainingSlots} more{" "}
                {remainingSlots === 1 ? "image" : "images"}
              </p>
            </>
          ) : (
            <>
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#1A191C] text-center">
                  Upload product images
                </p>
                <p className="text-xs text-[#837E8E] text-center">
                  Drag and drop multiple images, or choose files from your
                  device
                </p>
              </div>

              <button
                type="button"
                onClick={open}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
              >
                <Upload className="size-4" />
                Choose images
              </button>

              <p className="text-xs text-[#A990DD]">
                PNG, JPG, GIF or WebP · up to {remainingSlots} of {MAX_IMAGES}{" "}
                slots remaining
              </p>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#837E8E]">
        <span>
          {images.length} of {MAX_IMAGES} images
          {uploadingCount > 0 &&
            ` · Uploading ${uploadingCount} ${uploadingCount === 1 ? "file" : "files"}…`}
        </span>
        {images.length > 0 && (
          <span>Click ★ to set the featured image</span>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((img) => (
            <div
              key={img.id}
              className={cn(
                "group relative aspect-square overflow-hidden rounded-lg border bg-[#FAFAFA]",
                img.isFeatured && "ring-2 ring-primary ring-offset-1",
                img.error && "border-red-300",
              )}
            >
              <img
                src={img.url}
                alt="Product preview"
                className="size-full object-cover"
              />

              {img.uploading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/45">
                  <CircularProgress progress={img.progress} size={56} />
                  <span className="text-xs font-medium text-white">
                    Uploading…
                  </span>
                </div>
              )}

              {img.error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/55 p-3 text-center">
                  <p className="text-xs font-medium text-white">{img.error}</p>
                  {img.file && (
                    <button
                      type="button"
                      onClick={() => retryUpload(img.id)}
                      className="rounded-md bg-white px-3 py-1 text-xs font-medium text-[#1A191C] hover:bg-gray-100"
                    >
                      Retry
                    </button>
                  )}
                </div>
              )}

              {!img.uploading && !img.error && (
                <>
                  {img.isFeatured && (
                    <span className="absolute bottom-2 left-2 rounded-md bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                      Featured
                    </span>
                  )}

                  <div className="absolute inset-x-0 top-0 flex items-start justify-between p-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      aria-label="Remove image"
                      onClick={() => removeImage(img.id)}
                      className="rounded-md bg-black/60 p-1 text-white hover:bg-black/80"
                    >
                      <X className="size-3.5" />
                    </button>

                    <button
                      type="button"
                      aria-label="Set as featured image"
                      onClick={() => setAsFeatured(img.id)}
                      className={cn(
                        "rounded-md p-1 transition-colors",
                        img.isFeatured
                          ? "bg-primary text-white"
                          : "bg-black/60 text-white hover:bg-black/80",
                      )}
                    >
                      <Star
                        className="size-3.5"
                        fill={img.isFeatured ? "currentColor" : "none"}
                      />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}

          {!isFull && (
            <button
              type="button"
              onClick={open}
              className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#D4C7EE] bg-[#FEFEFE] text-[#837E8E] transition-colors hover:border-primary hover:bg-[#F1ECF9]/30 hover:text-primary"
            >
              <ImagePlus className="size-5" />
              <span className="px-2 text-center text-xs font-medium">
                Add more
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Uploader;
