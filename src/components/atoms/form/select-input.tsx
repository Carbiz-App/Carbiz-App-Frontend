import { Control, FieldPath, FieldValues, useFormState } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CurrencyOption = {
  label: string;
  value: string;
};

type ProductPriceInputProps<TFieldValues extends FieldValues = FieldValues> = {
  control: Control<TFieldValues>;
  inputName: FieldPath<TFieldValues>;
  selectName: FieldPath<TFieldValues>;
  label?: string;
  currencyOptions?: CurrencyOption[];
  placement?: boolean;
  placeholder?: string;
};

function SelectInput<TFieldValues extends FieldValues = FieldValues>({
  control,
  placeholder,
  placement = false,
  inputName,
  selectName,
  label = "Product price",
  currencyOptions = String(inputName) === "price"
    ? [
        { label: "NGR", value: "NGR" },
        { label: "USD", value: "USD" },
        { label: "GBP", value: "GBP" },
        { label: "CAD", value: "CAD" },
        { label: "RMB", value: "RMB" },
      ]
    : [
        { label: "KG", value: "Kg" },
        { label: "Pounds", value: "Pounds" },
        { label: "Ton", value: "Ton" },
        { label: "Ounce", value: "Ounce" },
        { label: "Gram", value: "Gram" },
        { label: "Milligram", value: "Milligram" },
      ],
}: ProductPriceInputProps<TFieldValues>) {
  const { errors } = useFormState({ control });

  const inputError = errors?.[inputName];
  const selectError = errors?.[selectName];
  const hasError = !!inputError || !!selectError;
  const errorMessage = inputError?.message || selectError?.message;

  return (
    <FormItem>
      {label && (
        <FormLabel
          className={`text-sm lg:text-base text-primary-dark font-medium ${
            errorMessage ? "text-red-500" : ""
          }`}
        >
          {label}
        </FormLabel>
      )}

      <div
        className={`flex items-center rounded-lg px-2 py-1.5 gap-2 max-h-max border shadow-xs ${
          placement ? "flex-row-reverse" : ""
        } ${hasError ? "border-red-500" : "border-input"}`}
      >
        <FormField
          control={control}
          name={selectName}
          render={({ field }) => (
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="text-muted-foreground border-none px-0 shadow-none focus:ring-0 focus:ring-offset-0 outline-none">
                  <SelectValue
                    placeholder={String(inputName) === "price" ? "NGR" : "KG"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {currencyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          )}
        />

        <FormField
          control={control}
          name={inputName}
          render={({ field }) => (
            <FormControl>
              <Input
                {...field}
                type="number"
                placeholder={placeholder ?? "0.00"}
                className="w-full text-sm lg:text-base border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
              />
            </FormControl>
          )}
        />
      </div>

      {hasError && typeof errorMessage === "string" && (
        <FormMessage>{errorMessage}</FormMessage>
      )}
    </FormItem>
  );
}

export default SelectInput;
