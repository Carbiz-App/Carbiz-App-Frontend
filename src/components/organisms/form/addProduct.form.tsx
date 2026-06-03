import CustomButton from "@/components/atoms/button/CustomButton";
import { ProductCategorySelect } from "@/components/atoms/form/customSelect";
import InputField from "@/components/atoms/form/input";
import SelectField from "@/components/atoms/form/select";
import SelectInput from "@/components/atoms/form/select-input";
import TextArea from "@/components/atoms/form/textarea";
import Loader from "@/components/atoms/loader";
import Uploader from "@/components/molecules/uploader";
import { Form } from "@/components/ui/form";
import {
  useAddProducts,
  useFetchProduct,
  useUpdateProduct,
} from "@/queries/products";
import ProductSchema, { ProductSchemaType } from "@/schema/products.schema";
import { PRODUCT_TYPE_OPTIONS } from "@/types/product.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "@phosphor-icons/react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";

const AddProductForm = () => {
  const { loading, createProduct } = useAddProducts();
  const { loading: updateLoading, updateProduct } = useUpdateProduct();
  const { pathname } = useLocation();
  const singleProduct: string = pathname.split("/")[2];
  const path = singleProduct !== "new";
  const { data: productData, loading: productLoading } = useFetchProduct(
    path ? singleProduct : "",
  );
  const payload = productData?.fetchOneProduct?.payload;

  // form
  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(ProductSchema),
    values: useMemo(() => {
      if (!path || !payload) return undefined;
      return {
        ...payload,
        productCategory: payload.productCategory?.productCategoryID,
        productType: payload.productType, // This fixes the "Status" select
        priceCurrencyType: payload.priceCurrencyType,
        productWeightType: payload.productWeightType,
      };
    }, [payload, path]),
  });

  const handleSubmit = async (data: ProductSchemaType) => {
    if (path) {
      await updateProduct({
        variables: {
          input: data,
          productID: singleProduct,
        },
      });
      return;
    } else {
      await createProduct({
        variables: {
          input: data,
        },
      });
    }
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
        <div className="flex flex-col gap-3.5 w-full ">
          <div className=" rounded-xl  border bg-white !w-full">
            <div className=" border-b p-5 ">
              <p className=" text-lg font-semibold">Product Information</p>
              <span className=" text-sm text-[#837E8E]">
                Fill the correct information of product and add images
              </span>
            </div>
            <div className="p-5  flex flex-col gap-y-6">
              <InputField
                itemClassName="!py-0"
                name="productName"
                label="Product Name"
                control={form.control}
                placeholder="enter product name"
              />

              <TextArea
                name="productDescription"
                label="Product Description"
                control={form.control}
                placeholder="enter a short description about your product"
              />
              <div className="grid lg:grid-cols-2 gap-4">
                {/* <SelectField
                  placeholder="select a category"
                  items={productCategory}
                  label="Product Category"
                  name="productCategory"
                  control={form.control}
                /> */}

                <ProductCategorySelect control={form.control} />
                <SelectField
                  items={PRODUCT_TYPE_OPTIONS}
                  placeholder="Select product status"
                  label="Product Status"
                  name="productType"
                  control={form.control}
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
                />
                <InputField
                  itemClassName="!py-0"
                  type="text"
                  name="productColor"
                  label="Product Color"
                  control={form.control}
                  placeholder="Black"
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
              />
            </div>
          </div>

          <div className=" rounded-xl  border bg-white ">
            <div className=" border-b p-5 ">
              <p className=" text-lg font-semibold">Product dimensions</p>
            </div>
            <div className="flex flex-col gap-y-6 p-5">
              <SelectInput
                inputName="productWeight"
                label="Product weight"
                selectName="productWeightType"
                control={form.control}
                placement
                placeholder="enter product weight"
              />
              <div className="grid grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InputField
                  type="number"
                  itemClassName="!py-0"
                  name="productLength_cm"
                  label="Product length (cm)"
                  control={form.control}
                  placeholder="enter length"
                />
                <InputField
                  type="number"
                  itemClassName="!py-0"
                  name="productBreadth_cm"
                  label="Product height (cm)"
                  control={form.control}
                  placeholder="enter breadth"
                />
                <InputField
                  type="number"
                  itemClassName="!py-0"
                  name="productWidth_cm"
                  label="Product Width (cm)"
                  control={form.control}
                  placeholder="enter width"
                />
              </div>
            </div>
          </div>
        </div>

        <div className=" flex flex-col w-full">
          <div className="bg-white rounded-xl  border pt-5 mb-auto w-full">
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
              initialUrls={productData?.fetchOneProduct?.payload?.productImages}
            />
          </div>
          <CustomButton
            loading={loading || updateLoading}
            size="lg"
            variant="default"
            type="submit"
            className=" mt-auto place-self-end sticky bottom-3 z-30"
          >
            {path ? "Edit Product" : "Add Product"}
          </CustomButton>
        </div>
      </form>
    </Form>
  );
};

export default AddProductForm;
