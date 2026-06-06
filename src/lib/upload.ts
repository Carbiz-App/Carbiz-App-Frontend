/** Cloudinary free-tier limit (10 MB) */
export const MAX_UPLOAD_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const getFileSizeError = (
  file: File,
  maxBytes = MAX_UPLOAD_FILE_SIZE_BYTES,
): string | null => {
  if (file.size <= maxBytes) return null;
  return `This file is ${formatFileSize(file.size)}. Maximum allowed size is ${formatFileSize(maxBytes)}. Please choose a smaller image.`;
};
