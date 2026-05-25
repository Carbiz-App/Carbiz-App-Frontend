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
import { Control, FieldPath, FieldValues } from "react-hook-form";

type FormOtpInputProps<TFieldValues extends FieldValues = FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  maxLength?: number;
};

function FormOtpInput<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  maxLength = 6,
}: FormOtpInputProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="text-sm md:text-base mb-2 text-primary-dark font-medium font-family-satoshi">
              {label}
            </FormLabel>
          )}
          <FormControl>
            <InputOTP
              value={field.value || ""}
              onChange={(value) => {
                field.onChange(value);
              }}
              maxLength={maxLength}
              containerClassName="focus:outline-0 focus-visible:ring-0 focus-visible:border-primary-dark placeholder:text-text-secondary"
            >
              <InputOTPGroup className="grid grid-cols-6 gap-2 sm:gap-3 md:gap-5 flex-wrap ">
                {Array.from({ length: maxLength }).map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="rounded-lg size-12 md:size-14  lg:size-20 border data-[active=true]:border-primary data-[active=]:border-border-gray !shadow-none data-[active=true]:ring-0"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormOtpInput;
