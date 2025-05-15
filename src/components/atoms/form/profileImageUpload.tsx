import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Control } from "react-hook-form";
import React from "react";
import { ImagePlus } from "lucide-react";
import axios from "axios";

interface ProfileImageUploadProps {
  control: Control<any>;
  name: string;
  label?: string;
  description?: string;
  uploadUrl?: string; // Your upload endpoint
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  control,
  name,
  label = "Profile Image",
  description,
  uploadUrl = "https://carbiz-backend-euek.onrender.com/graphql/api/carbiz/v1/files/upload/profile-picture",
}) => {
  const [preview, setPreview] = React.useState<string | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);

  const handleUpload = async (file: File, onChange: (url: string) => void) => {
    const formData = new FormData();
    formData.append("profilePicture", file);

    setUploading(true);
    setProgress(0);
    setError(null);

    // try {
    //   const response = await axios.post(uploadUrl, formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       // "x-apollo-operation-name": "profilePicture",
    //     },
    //     onUploadProgress: (event) => {
    //       const percent = Math.round((event.loaded * 100) / (event.total || 1));
    //       setProgress(percent);
    //     },
    //   });

    //   const imageUrl = response.data?.url;

    //   if (imageUrl) {
    //     setPreview(imageUrl);
    //     onChange(imageUrl);
    //   } else {
    //     setError("Upload succeeded but no image URL returned.");
    //   }
    // } catch (error) {
    //   console.error("Upload failed", error);
    //   setError("Image upload failed. Please try again.");
    // } finally {
    //   setUploading(false);
    // }

    return axios
      .post(uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e: any) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent);
        },
      })
      .then((res) => {
        const imageUrl = res.data.payload;
        if (imageUrl) {
          setPreview(imageUrl);
          onChange(imageUrl);
        } else {
          setError("Upload succeeded but no image URL returned.");
        }
      })
      .catch((error) => {
        console.error("Upload failed", error);
        setError("Image upload failed. Please try again.");
      })
      .finally(() => setUploading(false));
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        React.useEffect(() => {
          if (field.value) {
            setPreview(field.value);
          }
        }, [field.value]);

        return (
          <FormItem className="space-y-2">
            {label && <FormLabel>{label}</FormLabel>}

            <FormControl>
              <div className="flex flex-col gap-3">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                    <ImagePlus className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}

                <Input
                  type="file"
                  accept="image/*"
                  title="Upload profile picture"
                  aria-label="Upload profile picture"
                  disabled={uploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleUpload(file, field.onChange);
                    }
                  }}
                />

                {uploading && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <p>Uploading...</p>
                    <span>{progress}%</span>
                  </div>
                )}

                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
            </FormControl>

            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default ProfileImageUpload;
