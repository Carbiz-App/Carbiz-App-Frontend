// import React from "react";
// import { Control } from "react-hook-form";

// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// type CurrencyOption = {
//   label: string;
//   value: string;
// };

// interface ProductPriceInputProps {
//   control: Control<any>;
//   inputName: string;
//   selectName: string;
//   label?: string;
//   currencyOptions?: CurrencyOption[];
//   placement?: boolean;
//   placeholder?: string;
// }

// const SelectInput: React.FC<ProductPriceInputProps> = ({
//   control,
//   placeholder,
//   placement = false,
//   inputName,
//   selectName,
//   label = "Product price",
//   currencyOptions = inputName === "price"
//     ? [
//         { label: "NGR", value: "NGR" },
//         { label: "USD", value: "USD" },
//         { label: "GBP", value: "GBP" },
//         { label: "CAD", value: "CAD" },
//         { label: "RMB", value: "RMB" },
//       ]
//     : [
//         { label: "KG", value: "Kg" },
//         { label: "Pounds", value: "Pounds" },
//         { label: "Ton", value: "Ton" },
//         { label: "Ounce", value: "Ounce" },
//         { label: "Gram", value: "Gram" },
//         { label: "Milligram", value: "Milligram" },
//       ],
// }) => {
//   return (
//     <FormItem>
//       {label && (
//         <FormLabel className="text-sm lg:text-base text-primary-dark font-medium">
//           {label}
//         </FormLabel>
//       )}
//       <div
//         className={`flex items-center border-1 border-input shadow-xs rounded-lg px-2 py-1.5 max-h-max focus-within:ring-0 focus-within:border-primary  ${
//           placement ? "flex-row-reverse" : ""
//         }`}
//       >
//         {/* Currency Select */}
//         <FormField
//           control={control}
//           name={selectName}
//           render={({ field, fieldState }) => (
//             <FormControl>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <SelectTrigger
//                   className={` border-none shadow-none px-0 focus:ring-0 focus:ring-offset-0 text-muted-foreground focus:border-0  border-0 outline-0 ring-0 ${
//                     fieldState.error
//                       ? "border-red-500 ring-red-500"
//                       : "border-border"
//                   }`}
//                 >
//                   <SelectValue
//                     placeholder={inputName === "price" ? "NGR" : "KG"}
//                   />
//                 </SelectTrigger>
//                 <SelectContent className=" !max-w-2">
//                   {currencyOptions.map((option) => (
//                     <SelectItem
//                       key={option.value}
//                       value={option.value}
//                       defaultValue={inputName === "price" ? "NGR" : "KG"}
//                     >
//                       {option.label}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </FormControl>
//           )}
//         />
//         {/* Price Input */}
//         <FormField
//           control={control}
//           name={inputName}
//           render={({ field }) => (
//             <FormControl>
//               <Input
//                 {...field}
//                 type="number"
//                 placeholder={placeholder ?? "0.00"}
//                 className="text-sm lg:text-base border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-0 w-full pl-2 border shadow-none"
//               />
//             </FormControl>
//           )}
//         />
//       </div>
//       <FormMessage />
//     </FormItem>
//   );
// };

// export default SelectInput;

// const SelectInput: React.FC<ProductPriceInputProps> = ({
//   control,
//   placeholder,
//   placement = false,
//   inputName,
//   selectName,
//   label = "Product price",
//   currencyOptions = inputName === "price"
//     ? [
//         { label: "NGR", value: "NGR" },
//         { label: "USD", value: "USD" },
//         { label: "GBP", value: "GBP" },
//         { label: "CAD", value: "CAD" },
//         { label: "RMB", value: "RMB" },
//       ]
//     : [
//         { label: "KG", value: "Kg" },
//         { label: "Pounds", value: "Pounds" },
//         { label: "Ton", value: "Ton" },
//         { label: "Ounce", value: "Ounce" },
//         { label: "Gram", value: "Gram" },
//         { label: "Milligram", value: "Milligram" },
//       ],
// }) => {
//   return (
//     <div className="flex flex-col gap-2">
//       {label && (
//         <FormLabel className="text-sm lg:text-base text-primary-dark font-medium">
//           {label}
//         </FormLabel>
//       )}

//       <div
//         className={`flex items-center border rounded-lg px-2 py-1.5 max-h-max shadow-xs ${
//           placement ? "flex-row-reverse" : ""
//         } gap-2`}
//       >
//         {/* Select Field */}
//         <FormField
//           control={control}
//           name={selectName}
//           render={({ field, fieldState }) => (
//             <FormItem className="w-1/3">
//               <FormControl>
//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   <SelectTrigger
//                     className={`text-muted-foreground px-0 focus:ring-0 border-0 outline-none shadow-none ${
//                       fieldState.error ? "border border-red-500" : ""
//                     }`}
//                   >
//                     <SelectValue
//                       placeholder={inputName === "price" ? "NGR" : "KG"}
//                     />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {currencyOptions.map((option) => (
//                       <SelectItem key={option.value} value={option.value}>
//                         {option.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Input Field */}
//         <FormField
//           control={control}
//           name={inputName}
//           render={({ field, fieldState }) => (
//             <FormItem className="w-2/3">
//               <FormControl>
//                 <Input
//                   {...field}
//                   type="number"
//                   placeholder={placeholder ?? "0.00"}
//                   className={`w-full border-none focus-visible:ring-0 focus-visible:ring-offset-0 ${
//                     fieldState.error ? "border border-red-500" : ""
//                   }`}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>
//     </div>
//   );
// };

// export default SelectInput;

import React from "react";
import { Control, useFormState } from "react-hook-form";

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

interface ProductPriceInputProps {
  control: Control<any>;
  inputName: string;
  selectName: string;
  label?: string;
  currencyOptions?: CurrencyOption[];
  placement?: boolean;
  placeholder?: string;
}

const SelectInput: React.FC<ProductPriceInputProps> = ({
  control,
  placeholder,
  placement = false,
  inputName,
  selectName,
  label = "Product price",
  currencyOptions = inputName === "price"
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
}) => {
  // Get form state and access field errors
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
        {/* Currency Select */}
        <FormField
          control={control}
          name={selectName}
          render={({ field }) => (
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="text-muted-foreground border-none px-0 shadow-none focus:ring-0 focus:ring-offset-0 outline-none">
                  <SelectValue
                    placeholder={inputName === "price" ? "NGR" : "KG"}
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

        {/* Price Input */}
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

      {/* Shared error message below the div */}
      {hasError && typeof errorMessage === "string" && (
        <FormMessage>{errorMessage}</FormMessage>
      )}
    </FormItem>
  );
};

export default SelectInput;
