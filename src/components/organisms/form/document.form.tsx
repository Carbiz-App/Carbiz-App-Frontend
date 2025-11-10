import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import ImagePicker from "@/components/atoms/form/imagepicker";
import InputField from "@/components/atoms/form/input";

import DocumentSchema, { DocumentSchemaType } from "@/schema/document.schema";
import { useUploadKyc } from "@/queries/profile";
import { useAuthStore } from "@/store/auth.store";

const DocumentForm = () => {
  const { user } = useAuthStore();
  const form = useForm<DocumentSchemaType>({
    resolver: zodResolver(DocumentSchema),
    defaultValues: {
      businessLicense: user?.businessLicense,
      CAC: user?.CAC,
      validIDcard: user?.validIDcard,
      taxID: user?.taxID,
    },
  });

  console.log("profile", user);

  const { uploadKYCDocmentMerchant, loading } = useUploadKyc();

  const onSubmit = (data: DocumentSchemaType) => {
    console.log(data);
    uploadKYCDocmentMerchant({ variables: { input: data } });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex flex-col sm:flex-row  items-center gap-6 md:gap-10">
          <ImagePicker
            control={form.control}
            label="Business License"
            name="businessLicense"
            defaultValue={user?.businessLicense}
            onChange={(image: string) =>
              form.setValue("businessLicense", image)
            }
          />

          <ImagePicker
            // maxLength={1}
            control={form.control}
            label="Valid Identification Card"
            name="validIDcard"
            onChange={(image: string) => form.setValue("validIDcard", image)}
            defaultValue={user?.validIDcard}
          />
        </div>

        <div className="flex gap-6 flex-col sm:flex-row md:gap-10 w-full items-start">
          <ImagePicker
            // maxLength={1}
            control={form.control}
            label="CAC"
            name="CAC"
            onChange={(image: string) => form.setValue("CAC", image)}
            defaultValue={user?.CAC}
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
          disabled={loading}
          type="submit"
          className="bg-primary text-white px-7 md:py-7 rounded-[0.625rem] text-base w-full sm:w-[16%]"
        >
          {loading ? "Processing..." : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default DocumentForm;
