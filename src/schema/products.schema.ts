import { z } from "zod";

const ProductSchema = z.object({
  productName: z.string({ message: "Product name is required" }),
  //   productDescription: z.string({ message: "Product description is required" }),
  //   productCategory: z.string({ message: "Product category is required" }),
  //   productStatus: z.string({ message: "Product status is required" }),
  //   availableStock: z.number({ message: "Provide avalable stock" }),
  //   productColor: z.string({ message: "Product color is required" }),
  //   productPrice: z.number({ message: "Product price is required" }),
  //   discount: z.number({ message: "Discount is required" }),
  //   productWeight: z.number({ message: "Product weight is required" }),
  //   productLength: z.number({ message: "Product Length is required" }),
  //   productBreadth: z.number({ message: "Product Breadth is required" }),
  //   productWidth: z.number({ message: "Product Width is required" }),
});

export default ProductSchema;

export type ProductSchemaType = z.infer<typeof ProductSchema>;
