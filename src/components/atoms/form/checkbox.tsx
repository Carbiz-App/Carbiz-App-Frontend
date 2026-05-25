import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Control, FieldPath, FieldValues } from "react-hook-form";

type CheckboxProps<TFieldValues extends FieldValues = FieldValues> = {
  control: Control<TFieldValues>;
  id?: string;
  label?: string;
  description?: React.ReactNode;
  name: FieldPath<TFieldValues>;
};

function FormCheckbox<TFieldValues extends FieldValues = FieldValues>({
  control,
  id,
  label,
  description,
  name,
}: CheckboxProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start lg:space-x-3 space-y-0 rounded-md">
          <FormControl>
            <Checkbox
              id={id}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div
            className={`${description && label && "space-y-1"} leading-none`}
          >
            {label && <FormLabel>{label}</FormLabel>}
            {description && <FormDescription>{description}</FormDescription>}
          </div>
        </FormItem>
      )}
    />
  );
}

export default FormCheckbox;
