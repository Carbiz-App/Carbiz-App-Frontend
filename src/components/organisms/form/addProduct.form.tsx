import InputField from "@/components/atoms/form/input";
import SelectField from "@/components/atoms/form/select";
import TextArea from "@/components/atoms/form/textarea";
import Uploader from "@/components/molecules/uploader";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import ProductSchema, { ProductSchemaType } from "@/schema/products.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";

const AddProductForm = () => {
  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(ProductSchema),
  });

  const handleSubmit = (e: any) => {
    console.log(e);
  };

  const items = [
    { label: "Item 1", value: "item1" },
    { label: "Item 2", value: "item2" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-3.5">
        <div className="flex flex-col gap-3.5  w-1/2">
          <div className=" rounded-xl  border bg-white ">
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
              <div className="grid grid-cols-2 gap-4">
                <SelectField
                  placeholder="select a category"
                  items={items}
                  label="Product Category"
                  name="productCategory"
                  control={form.control}
                />
                <SelectField
                  items={items}
                  placeholder="select a status"
                  label="Product Status"
                  name="productStatus"
                  control={form.control}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <SelectField
                  items={items}
                  placeholder="--"
                  label="Available Stock"
                  name="available"
                  control={form.control}
                />
                <SelectField
                  placeholder="enter a discount for product"
                  items={items}
                  label="Product Colour"
                  name="productColour"
                  control={form.control}
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
            <div className="grid grid-cols-2 gap-4 p-5">
              <InputField
                itemClassName="!py-0"
                name="productPrice"
                label="Product Price"
                control={form.control}
                placeholder="--"
              />
              <InputField
                itemClassName="!py-0"
                name="discount"
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
              <InputField
                itemClassName="!py-0"
                name="productWeight"
                label="Product weight"
                control={form.control}
                placeholder="enter product weight"
              />
              <div className="grid grid-cols-3 gap-4">
                <InputField
                  itemClassName="!py-0"
                  name="productLength"
                  label="Product length (cm)"
                  control={form.control}
                  placeholder="enter length"
                />
                <InputField
                  itemClassName="!py-0"
                  name="productBreadth"
                  label="Product breadth (cm)"
                  control={form.control}
                  placeholder="enter breadth"
                />
                <InputField
                  itemClassName="!py-0"
                  name="productWidth"
                  label="Product Width (cm)"
                  control={form.control}
                  placeholder="enter width"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/2 flex flex-col ">
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
            <Uploader />
          </div>
          <Button
            size="lg"
            variant="default"
            type="submit"
            className=" mt-auto place-self-end sticky bottom-3"
          >
            Add Product
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddProductForm;
