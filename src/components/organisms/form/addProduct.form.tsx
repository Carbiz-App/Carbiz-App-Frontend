import { FETCH_PRODUCT_CATEGORIES } from "@/api/product";
import InputField from "@/components/atoms/form/input";
import SelectField from "@/components/atoms/form/select";
import SelectInput from "@/components/atoms/form/select-input";
import TextArea from "@/components/atoms/form/textarea";
import Loader from "@/components/atoms/loader";
import Uploader from "@/components/molecules/uploader";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { usePagination } from "@/hooks/usePagination";
import {
  useAddProducts,
  useFetchProduct,
  useUpdateProduct,
} from "@/queries/products";
import ProductSchema, { ProductSchemaType } from "@/schema/products.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "@phosphor-icons/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";

const AddProductForm = () => {
  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(ProductSchema),
  });
  const { loading, createProduct } = useAddProducts();
  const { loading: updateLoading, updateProduct } = useUpdateProduct();
  const { pathname } = useLocation();
  const singleProduct: string = pathname.split("/")[2];
  const path = singleProduct !== "new";
  const {
    fetchOneProduct,
    data: productData,
    loading: productLoading,
  } = useFetchProduct();

  useEffect(() => {
    if (path) {
      fetchOneProduct({
        variables: { productID: singleProduct },
      });
    }
  }, [singleProduct]);

  useEffect(() => {
    const payload = productData?.fetchOneProduct?.payload;
    if (payload) {
      const mappedPayload: ProductSchemaType = {
        ...payload,
        productCategory: payload?.productCategory?.productCategoryID,
      };
      form.reset(mappedPayload);
    }
  }, [productData, form]);

  const {
    data,
    // total,
    // loading: categoriesLoading,
    // pagination,
    // setPage,
  } = usePagination({
    query: FETCH_PRODUCT_CATEGORIES,
    paginationDefaults: {
      page: 1,
      limit: 10,
      sortOrder: "DESC",
      sortBy: "createdAt",
    },
    extractData: (res) => ({
      data: res?.fetchallProductCategoriesMerchant?.payload?.data || [],
      total: res?.fetchallProductCategoriesMerchant?.payload?.total || 0,
    }),
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

  const productCategory = data?.map((i) => ({
    label: i?.productCategoryName,
    value: i?.productCategoryID,
  }));
  const status = [
    { label: "Brand New", value: "Brand_New" },
    { label: "Used", value: "Used" },
  ];

  if (productLoading) {
    return <Loader />;
  }

  return (
    <Form {...form}>
      <form
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
                <SelectField
                  placeholder="select a category"
                  items={productCategory}
                  label="Product Category"
                  name="productCategory"
                  control={form.control}
                />
                <SelectField
                  items={status}
                  placeholder="select a status"
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
                  // type="color"
                  itemClassName="!py-0"
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
                  label="Product breadth (cm)"
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
              <h3 className=" text-base font-semibold flex items-center gap-1.5 px-4">
                Upload Product Image{" "}
                <Info weight="fill" size={15} fill="#68655F" />
              </h3>
              <p className="text-sm text-[#8E8B87] px-5">
                Click the star icon (★) on any uploaded image to set it as the
                featured image.
              </p>
            </div>
            {/* <Uploader onUploadedUrlsChange={setImageUrl} /> */}
            <Uploader
              setValue={form.setValue}
              value={form.watch("productImages")}
              error={form.formState.errors.productImages?.message}
              initialUrls={productData?.fetchOneProduct?.payload?.productImages}
            />
          </div>
          <Button
            disabled={loading || updateLoading}
            size="lg"
            variant="default"
            type="submit"
            className=" mt-auto place-self-end sticky bottom-3 z-30"
          >
            {loading || updateLoading
              ? "Loading..."
              : path
              ? "Edit Product"
              : "Add Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddProductForm;
