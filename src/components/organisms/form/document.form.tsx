import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import ImagePicker from "@/components/atoms/form/imagepicker";
import InputField from "@/components/atoms/form/input";

import DocumentSchema, { DocumentSchemaType } from "@/schema/document.schema";

const DocumentForm = () => {
  const form = useForm<DocumentSchemaType>({
    resolver: zodResolver(DocumentSchema),
  });

  const onSubmit = (data: DocumentSchemaType) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex items-center gap-6 md:gap-10">
          <ImagePicker
            maxLength={1}
            control={form.control}
            label="Business License"
            name="businessLicense"
          />

          <ImagePicker
            maxLength={1}
            control={form.control}
            label="Valid Identification Card"
            name="validIDcard"
          />
        </div>

        <div className="flex gap-6 md:gap-10 w-full items-start">
          <ImagePicker
            maxLength={1}
            control={form.control}
            label="CAC"
            name="CAC"
          />

          <InputField
            control={form.control}
            name="taxID"
            label="Tax Identification Number"
            placeholder="023333398"
            inputClassName="w-full"
            itemClassName="w-full"
          />
        </div>

        <Button
          type="submit"
          className="bg-primary text-white py-7 rounded-[0.625rem] text-base w-[16%]"
        >
          Save
        </Button>
      </form>
    </Form>
  );
};

export default DocumentForm;
