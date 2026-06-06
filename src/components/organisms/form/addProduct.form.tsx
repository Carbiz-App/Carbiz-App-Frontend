import CustomButton from "@/components/atoms/button/CustomButton";
import { ProductCategorySelect } from "@/components/atoms/form/customSelect";
import InputField from "@/components/atoms/form/input";
import SelectField from "@/components/atoms/form/select";
import SelectInput from "@/components/atoms/form/select-input";
import RichTextEditorField from "@/components/atoms/form/richTextEditor";
import Loader from "@/components/atoms/loader";
import Uploader from "@/components/molecules/uploader";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/Toast";
import {
  useAddProducts,
  useFetchProduct,
  useUpdateProduct,
} from "@/queries/products";
import ProductSchema, { ProductSchemaType } from "@/schema/products.schema";
import {
  CreateProductInput,
  mapPayloadToProductFormValues,
  PRODUCT_TYPE_OPTIONS,
  toProductCreateInput,
  toProductUpdateInput,
} from "@/types/product.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "@phosphor-icons/react";
import { ArchiveRestore } from "lucide-react";
import { useMemo } from "react";
import { Resolver, useForm } from "react-hook-form";
import { useLocation } from "react-router";

const DIMENSION_FIELDS = [
  "productWeight",
  "productLength_cm",
  "productBreadth_cm",
  "productWidth_cm",
] as const;

const normalizeDimensionValues = (
  values: Record<string, unknown>,
): Record<string, unknown> => {
  const normalized = { ...values };
  for (const key of DIMENSION_FIELDS) {
    const val = normalized[key];
    if (val === "" || val === null || val === undefined) {
      normalized[key] = 0;
    }
  }
  return normalized;
};

const productResolver: Resolver<ProductSchemaType> = (values, context, options) =>
  zodResolver(ProductSchema)(
    normalizeDimensionValues(
      values as Record<string, unknown>,
    ) as ProductSchemaType,
    context,
    options,
  );

type AddProductFormProps = {
  isArchived?: boolean;
  onUnarchive?: () => void;
  unarchiveLoading?: boolean;
};

const AddProductForm = ({
  isArchived = false,
  onUnarchive,
  unarchiveLoading = false,
}: AddProductFormProps) => {
  const { pathname } = useLocation();
  const singleProduct: string = pathname.split("/")[2];
  const path = singleProduct !== "new";
  const { handleInfo } = useToast();
  const { loading, createProduct } = useAddProducts();
  const { loading: updateLoading, updateProduct } = useUpdateProduct(
    path ? singleProduct : undefined,
  );
  const { data: productData, loading: productLoading } = useFetchProduct(
    path ? singleProduct : "",
  );
  const payload = productData?.fetchOneProduct?.payload;

  const originalProduct = useMemo((): CreateProductInput | undefined => {
    if (!path || !payload) return undefined;
    return mapPayloadToProductFormValues(payload);
  }, [payload, path]);

  const form = useForm<ProductSchemaType>({
    resolver: productResolver,
    defaultValues: {
      priceCurrencyType: "NGR",
      productWeightType: "Kg",
      productWeight: 0,
      productLength_cm: 0,
      productBreadth_cm: 0,
      productWidth_cm: 0,
      discountPercentage: 0,
    },
    values: useMemo((): ProductSchemaType | undefined => {
      if (!originalProduct) return undefined;
      return originalProduct as ProductSchemaType;
    }, [originalProduct]),
  });

  const handleSubmit = async (data: ProductSchemaType) => {
    if (isArchived) return;

    if (path) {
      if (!originalProduct) return;

      const input = toProductUpdateInput(
        toProductCreateInput(data),
        originalProduct,
      );

      if (Object.keys(input).length === 0) {
        handleInfo("Update Product", "No changes to save.");
        return;
      }

      await updateProduct({
        variables: {
          input,
          productID: singleProduct,
        },
      });
      return;
    }

    await createProduct({
      variables: {
        input: toProductCreateInput(data),
      },
    });
  };

  if (productLoading) {
    return <Loader />;
  }

  return (
    <Form {...form}>
      <form
        key={payload?.productID || "new"}
        noValidate={false}
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid md:grid-cols-2 gap-3.5"
      >
        <fieldset
          disabled={isArchived}
          className="contents md:contents disabled:opacity-70"
        >
          <div className="flex flex-col gap-3.5 w-full ">
            <div className=" rounded-xl  border bg-white !w-full">
              <div className=" border-b p-5 ">
                <p className=" text-lg font-semibold">Product Information</p>
                <span className=" text-sm text-[#837E8E]">
                  {isArchived
                    ? "This product is archived and cannot be edited."
                    : "Fill the correct information of product and add images"}
                </span>
              </div>
              <div className="p-5  flex flex-col gap-y-6">
                <InputField
                  itemClassName="!py-0"
                  name="productName"
                  label="Product Name"
                  control={form.control}
                  placeholder="enter product name"
                  disabled={isArchived}
                />

                <RichTextEditorField
                  name="productDescription"
                  label="Product Description"
                  control={form.control}
                  placeholder="Describe your product — features, compatibility, condition..."
                  disabled={isArchived}
                />
                <div className="grid lg:grid-cols-2 gap-4">
                  <ProductCategorySelect control={form.control} />
                  <SelectField
                    items={PRODUCT_TYPE_OPTIONS}
                    placeholder="Select product type"
                    label="Product Type"
                    name="productType"
                    control={form.control}
                    disabled={isArchived}
                  />
                </div>
                <div className="grid lg:grid-cols-2 gap-4">
                  <InputField
                    type="number"
                    itemClassName="!py-0"
                    name="productStock"
                    label="Available Stock"
                    control={form.control}
                    placeholder="--"
                    disabled={isArchived}
                    description={
                      path
                        ? "Listing status updates automatically from stock (e.g. 0 → out of stock)."
                        : undefined
                    }
                  />
                  <InputField
                    itemClassName="!py-0"
                    type="text"
                    name="productColor"
                    label="Product Color"
                    control={form.control}
                    placeholder="Black"
                    disabled={isArchived}
                  />
                </div>
              </div>
            </div>

            <div className=" rounded-xl  border bg-white ">
              <div className=" border-b p-5 ">
                <p className=" text-lg font-semibold">
                  Product pricing & discount
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-5">
                <SelectInput
                  inputName="price"
                  selectName="priceCurrencyType"
                  control={form.control}
                />
                <InputField
                  type="number"
                  itemClassName="!py-0"
                  name="discountPercentage"
                  label="Discount (in percentage)"
                  control={form.control}
                  placeholder="enter a discount for product"
                  disabled={isArchived}
                />
              </div>
            </div>

            <div className=" rounded-xl  border bg-white ">
              <div className=" border-b p-5 ">
                <p className=" text-lg font-semibold">Product dimensions</p>
                <span className="text-sm text-[#837E8E]">
                  Optional — leave as 0 if not applicable
                </span>
              </div>
              <div className="flex flex-col gap-y-6 p-5">
                <SelectInput
                  inputName="productWeight"
                  label="Product weight (optional)"
                  selectName="productWeightType"
                  control={form.control}
                  placement
                  placeholder="0"
                />
                <div className="grid grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <InputField
                    type="number"
                    itemClassName="!py-0"
                    name="productLength_cm"
                    label="Product length (cm)"
                    control={form.control}
                    placeholder="0"
                    disabled={isArchived}
                  />
                  <InputField
                    type="number"
                    itemClassName="!py-0"
                    name="productBreadth_cm"
                    label="Product height (cm)"
                    control={form.control}
                    placeholder="0"
                    disabled={isArchived}
                  />
                  <InputField
                    type="number"
                    itemClassName="!py-0"
                    name="productWidth_cm"
                    label="Product Width (cm)"
                    control={form.control}
                    placeholder="0"
                    disabled={isArchived}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className=" flex flex-col w-full">
            <div
              className={`bg-white rounded-xl border pt-5 mb-auto w-full ${isArchived ? "pointer-events-none" : ""}`}
            >
              <div className="border-b pb-4">
                <h3 className="text-base font-semibold flex items-center gap-1.5 px-4">
                  Product Images
                  <Info weight="fill" size={15} fill="#68655F" />
                </h3>
                <p className="text-sm text-[#8E8B87] px-5">
                  Add up to 5 images. The featured image appears first in your
                  product listing.
                </p>
              </div>
              <Uploader
                setValue={form.setValue}
                value={form.watch("productImages")}
                error={form.formState.errors.productImages?.message}
                initialUrls={
                  productData?.fetchOneProduct?.payload?.productImages as
                    | string[]
                    | undefined
                }
              />
            </div>

            {isArchived ? (
              <CustomButton
                loading={unarchiveLoading}
                size="lg"
                variant="default"
                type="button"
                onClick={onUnarchive}
                className="mt-auto place-self-end sticky bottom-3 z-30 gap-2"
              >
                <ArchiveRestore className="size-4" />
                Unarchive product
              </CustomButton>
            ) : (
              <CustomButton
                loading={loading || updateLoading}
                size="lg"
                variant="default"
                type="submit"
                className=" mt-auto place-self-end sticky bottom-3 z-30"
              >
                {path ? "Edit Product" : "Add Product"}
              </CustomButton>
            )}
          </div>
        </fieldset>
      </form>
    </Form>
  );
};

export default AddProductForm;
