export enum ProductType {
  GENUINE_OEM = "Genuine_OEM",
  AFTERMARKET = "Aftermarket",
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
