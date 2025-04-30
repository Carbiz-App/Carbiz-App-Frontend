import { Gallery } from "iconsax-reactjs";
import React from "react";
import { Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ImagePickerProp {
  name?: string;
  control: Control<any>;
  label?: string;
}

const ImagePicker: React.FC<ImagePickerProp> = ({ name, control, label }) => {
  return (
    <FormField
      control={control}
      name={name ? name?.toString() : ""}
      render={({ field }) => (
        <FormItem className="w-full max-w-[50%]">
          {label && (
            <FormLabel className="text-sm lg:text-base text-primary-dark font-medium mb-1">
              {label}
            </FormLabel>
          )}

          <FormControl>
            <div
              className="bg-[#FEFEFE] py-10 px-5 flex flex-col justify-center items-center border border-[#F3F2F4] rounded-xl font-family-satoshi text-sm space-y-4"
              {...field}
            >
              <Gallery size="32" color="#1A191C" />
              <p>
                <span className="font-bold ">Upload a file</span> or drag and
                drop
              </p>
              <p>PNG, JPEG, PDF. Up to 5mb</p>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ImagePicker;
