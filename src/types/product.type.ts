export enum ProductType {
  GENUINE_OEM = "Genuine_OEM",
  AFTERMARKET = "After_Market",
  PRE_OWNED_TOKUNBO = "Pre_Owned_Tokunbo",
  REFURBISHED = "Refurbished",
  BRAND_NEW = "Brand_New",
  USED = "Used",
}

export const PRODUCT_TYPE_OPTIONS: { label: string; value: ProductType }[] = [
  { label: "Genuine OEM", value: ProductType.GENUINE_OEM },
  { label: "Aftermarket", value: ProductType.AFTERMARKET },
  { label: "Pre-owned (Tokunbo)", value: ProductType.PRE_OWNED_TOKUNBO },
  { label: "Refurbished", value: ProductType.REFURBISHED },
  { label: "Brand new", value: ProductType.BRAND_NEW },
  { label: "Used", value: ProductType.USED },
];

/** Full input for createProduct */
export type CreateProductInput = {
  productName: string;
  productColor: string;
  productDescription: string;
  price: number;
  productType: ProductType | string;
  priceCurrencyType: string;
  productStock: number;
  /** Category ID for API */
  productCategory: string;
  productImages: string[];
  discountPercentage?: number;
  productWeight: number;
  productWeightType: string;
  productLength_cm: number;
  productBreadth_cm: number;
  productWidth_cm: number;
};

/** Partial patch for updateProduct — all fields optional; no productStatus */
export type UpdateProductInput = Partial<CreateProductInput>;

export type ProductMutationResponse = {
  success: boolean;
  message: string;
  status: number;
  errors: string | null;
  payload: {
    productID?: string;
    productName?: string;
    productStatus?: string;
    productStock?: number;
    price?: number;
    discountedPrice?: number;
    productType?: string;
    productImages?: string[];
    updatedAt?: string;
  } | null;
};

export const normalizeProductType = (
  type?: string,
): ProductType | undefined => {
  if (!type) return undefined;
  if (Object.values(ProductType).includes(type as ProductType)) {
    return type as ProductType;
  }
  return Object.values(ProductType).find(
    (v) => v.toLowerCase() === type.toLowerCase(),
  );
};

export const resolveProductCategoryId = (
  category?: string | ProductCategory | null,
): string => {
  if (!category) return "";
  if (typeof category === "string") return category;
  return category.productCategoryID ?? "";
};

const arraysEqual = (a: string[] = [], b: string[] = []) =>
  a.length === b.length && a.every((item, i) => item === b[i]);

/** Maps fetchOneProduct payload → react-hook-form values */
export const mapPayloadToProductFormValues = (
  payload: Partial<ProductEntity> & {
    productCategory?: ProductCategory | string | null;
  },
): CreateProductInput => ({
  productImages: payload.productImages ?? [],
  productName: payload.productName ?? "",
  productDescription: payload.productDescription ?? "",
  productCategory: resolveProductCategoryId(
    payload.productCategory as ProductCategory | string | null,
  ),
  productType:
    normalizeProductType(payload.productType as string) ??
    ProductType.GENUINE_OEM,
  priceCurrencyType: payload.priceCurrencyType ?? "NGR",
  productWeightType: payload.productWeightType ?? "Kg",
  productStock: Number(payload.productStock ?? 0),
  productColor: payload.productColor ?? "",
  price: Number(payload.price ?? 0),
  discountPercentage: payload.discountPercentage,
  productWeight: Number(payload.productWeight ?? 0),
  productLength_cm: Number(payload.productLength_cm ?? 0),
  productBreadth_cm: Number(payload.productBreadth_cm ?? 0),
  productWidth_cm: Number(payload.productWidth_cm ?? 0),
});

/** Full input for createProduct */
export const toProductCreateInput = (
  data: CreateProductInput & {
    productCategory?: string | ProductCategory | null;
  },
): CreateProductInput => ({
  productName: data.productName,
  productColor: data.productColor,
  productDescription: data.productDescription,
  price: Number(data.price),
  productType: data.productType,
  priceCurrencyType: data.priceCurrencyType,
  productStock: Number(data.productStock),
  productCategory: resolveProductCategoryId(data.productCategory),
  productImages: data.productImages,
  ...(data.discountPercentage !== undefined && {
    discountPercentage: Number(data.discountPercentage),
  }),
  productWeight: Number(data.productWeight),
  productWeightType: data.productWeightType,
  productLength_cm: Number(data.productLength_cm),
  productBreadth_cm: Number(data.productBreadth_cm),
  productWidth_cm: Number(data.productWidth_cm),
});

/** Only changed fields for updateProduct (partial patch) */
export const toProductUpdateInput = (
  current: CreateProductInput,
  original: CreateProductInput,
): UpdateProductInput => {
  const patch: UpdateProductInput = {};
  const normalizedCurrent = toProductCreateInput(current);
  const normalizedOriginal = toProductCreateInput(original);

  const assignIfChanged = <K extends keyof CreateProductInput>(key: K) => {
    const cur = normalizedCurrent[key];
    const orig = normalizedOriginal[key];

    if (key === "productImages") {
      if (!arraysEqual(cur as string[], orig as string[])) {
        patch.productImages = cur as string[];
      }
      return;
    }

    if (key === "discountPercentage") {
      if (cur !== orig) {
        patch.discountPercentage = cur as number | undefined;
      }
      return;
    }

    if (cur !== orig) {
      patch[key] = cur as CreateProductInput[K];
    }
  };

  (
    [
      "productName",
      "productColor",
      "productDescription",
      "price",
      "productType",
      "priceCurrencyType",
      "productStock",
      "productCategory",
      "productImages",
      "discountPercentage",
      "productWeight",
      "productWeightType",
      "productLength_cm",
      "productBreadth_cm",
      "productWidth_cm",
    ] as const
  ).forEach((key) => assignIfChanged(key));

  return patch;
};

interface ProductEntity {
  createdAt: Date;
  deletedAt: Date;
  discountPercentage: number;
  discountedPrice: number;
  id: number;
  isDiscountApplied: boolean;
  price: number;
  priceCurrencyType: string;
  productBreadth_cm: number;
  productCategory: ProductCategory;
  productColor: string;
  productDescription: string;
  productID: string;
  productImages: string[];
  productLength_cm: number;
  productName: string;
  productStatus: string;
  productStock: number;
  productType: ProductType | string;
  productWeight: number;
  productWeightType: string;
  productWidth_cm: number;
  restockedAt: Date;
  updatedAt: Date;
}

export default ProductEntity;

export type ProductCategory = {
  createdAt: Date;
  deletedAt: Date;
  id: number;
  productCategoryID: string;
  productCategoryName: string;
  updatedAt: Date;
};
