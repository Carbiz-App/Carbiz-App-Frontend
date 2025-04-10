import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";

interface FormOtpInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  maxLength?: number;
  control: Control<any>;
  name?: string;
  label?: string;
}

const FormOtpInput: React.FC<FormOtpInputProps> = ({
  control,
  maxLength = 4,
  name = "",
  label,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm md:text-base mb-2 text-primary-dark font-medium font-family-satoshi">
            {label}
          </FormLabel>
          <FormControl>
            <InputOTP maxLength={maxLength} {...field} containerClassName="focus:outline-0 focus-visible:ring-0 focus-visible:border-primary-dark placeholder:text-text-secondary">
              <InputOTPGroup className="gap-5">
                {Array.from({ length: maxLength }).map((_, index) => (
                  <InputOTPSlot className="rounded-lg h-16 w-20 data-[active=true]:border-primary data-[active=]:border-border-gray !shadow-none data-[active=true]:ring-0" index={index} key={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
          {/* <FormDescription>
            Please enter the one-time password sent to your phone.
          </FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormOtpInput;
