import { ProductType } from "@/types/product.type";
import { z } from "zod";

const ProductSchema = z.object({
  productImages: z
    .array(z.string())
    .min(1, "At least one image is required")
    .max(5),
  productName: z.string({ message: "Product name is required" }),
  productDescription: z.string({ message: "Product description is required" }),
  productCategory: z.string({ message: "Product category is required" }),
  productType: z.nativeEnum(ProductType, {
    message: "Product type is required",
  }),
  priceCurrencyType: z.string({ message: "currency type is required" }),
  productWeightType: z.string({ message: "weight type is required" }),
  productStock: z.coerce.number({ message: "Provide available stock" }),
  productColor: z.string({ message: "Product color is required" }),
  price: z.coerce.number({ message: "Product price is required" }),
  discountPercentage: z.coerce.number().optional(),
  productWeight: z.coerce.number().min(0),
  productLength_cm: z.coerce.number().min(0),
  productBreadth_cm: z.coerce.number().min(0),
  productWidth_cm: z.coerce.number().min(0),
});

export default ProductSchema;

export type ProductSchemaType = z.infer<typeof ProductSchema>;
