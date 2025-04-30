import React from "react";
import { Control } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = {
  label: string;
  value: string;
  className: string;
};

interface SelectFieldProps {
  control: Control<any>;
  name?: string;
  label?: string;
  placeholder?: string;
  description?: string;
  items?: Option[];
}

const SelectField: React.FC<SelectFieldProps> = ({
  control,
  description,
  placeholder,
  name,
  label,
  items,
}) => {
  return (
    <FormField
      control={control}
      name={name ? name?.toString() : ""}
      render={({ field }) => (
        <FormItem >
          {label && (
            <FormLabel className="text-sm lg:text-base text-primary-dark font-medium mb-1">
              {label}
            </FormLabel>
          )}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-full py-5.5">
                <SelectValue placeholder={placeholder}  className="text-text-primary text-base"/>
              </SelectTrigger>
            </FormControl>
            <SelectContent className="w-full">
              {items?.map(({ value, label, className }, index) => (
                <SelectItem key={index} value={value} className={className}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectField;
