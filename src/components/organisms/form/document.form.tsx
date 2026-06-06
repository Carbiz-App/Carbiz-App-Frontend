import CustomButton from "@/components/atoms/button/CustomButton";
import ImagePicker from "@/components/atoms/form/imagepicker";
import InputField from "@/components/atoms/form/input";
import { Form } from "@/components/ui/form";
import { formatFileSize, MAX_UPLOAD_FILE_SIZE_BYTES } from "@/lib/upload";
import { useUploadKyc } from "@/queries/profile";
import DocumentSchema, {
  DocumentSchemaType,
  toDocumentFormValues,
} from "@/schema/document.schema";
import { useAuthStore } from "@/store/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText } from "@phosphor-icons/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const documentFields = [
  {
    name: "businessLicense" as const,
    label: "Business License",
    description:
      "Upload a clear photo or scan of your registered business license.",
  },
  {
    name: "validIDcard" as const,
    label: "Valid ID Card",
    description:
      "Upload a government-issued ID such as a national ID, passport, or driver's license.",
  },
  {
    name: "CAC" as const,
    label: "CAC Certificate",
    description:
      "Upload your Corporate Affairs Commission (CAC) registration document.",
  },
] as const;

type DocumentFormProps = {
  documentsLocked?: boolean;
};

const DocumentForm = ({ documentsLocked = false }: DocumentFormProps) => {
  const { user } = useAuthStore();
  const form = useForm<DocumentSchemaType>({
    resolver: zodResolver(DocumentSchema),
    defaultValues: toDocumentFormValues(user),
  });

  useEffect(() => {
    form.reset(toDocumentFormValues(user));
  }, [user, form]);

  const { uploadKYCDocmentMerchant, loading } = useUploadKyc();

  const onSubmit = (data: DocumentSchemaType) => {
    uploadKYCDocmentMerchant({ variables: { input: data } });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-xl border border-border-gray bg-white p-5 md:p-6">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F1ECF9]">
              <FileText className="size-5 text-primary" weight="fill" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-semibold text-[#1A191C]">
                Verification documents
              </h2>
              <p className="text-sm text-[#837E8E]">
                {documentsLocked
                  ? "Your documents have been approved. You can view uploaded files, but new uploads are blocked."
                  : `Choose each document below to preview it. Files upload automatically once selected (max ${formatFileSize(MAX_UPLOAD_FILE_SIZE_BYTES)} each). Click Save when you are done to submit everything.`}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {documentFields.map(({ name, label, description }) => (
            <div
              key={name}
              className="rounded-xl border border-border-gray bg-white p-4 md:p-5"
            >
              <ImagePicker
                control={form.control}
                label={label}
                description={description}
                name={name}
                defaultValue={user?.[name]}
                readOnly={documentsLocked}
                uploadDisabled={documentsLocked}
              />
            </div>
          ))}

          <div className="rounded-xl border border-border-gray bg-white p-4 md:p-5 md:col-span-2">
            <InputField
              control={form.control}
              name="taxID"
              label="Tax Identification Number"
              description="Enter your tax ID if you have one. This field is optional."
              placeholder="e.g. 023333398"
              inputClassName="w-full"
              itemClassName="w-full !py-0"
            />
          </div>
        </div>

        <CustomButton
          type="submit"
          loading={loading}
          className="bg-primary text-white px-7 md:py-7 rounded-[0.625rem] text-base w-full sm:w-auto sm:min-w-[140px]"
        >
          Save documents
        </CustomButton>
      </form>
    </Form>
  );
};

export default DocumentForm;
