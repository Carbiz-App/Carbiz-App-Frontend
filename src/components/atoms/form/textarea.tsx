import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control, FieldPath, FieldValues } from "react-hook-form";

type TextAreaProps<TFieldValues extends FieldValues = FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  description?: string;
  textareaClassName?: string;
};

function TextArea<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  placeholder,
  description,
  label,
  textareaClassName,
}: TextAreaProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="text-sm lg:text-base text-primary-dark font-medium">
              {label}
            </FormLabel>
          )}

          <FormControl>
            <Textarea
              placeholder={placeholder}
              className={`text-sm lg:text-base rounded-lg  focus:outline-0 focus-visible:ring-0 focus-visible:border-primary placeholder:text-text-secondary !resize-none max-h-[10px] scrollbar-hide selection:bg-primary selection:text-primary-foreground  ${textareaClassName}`}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default TextArea;
