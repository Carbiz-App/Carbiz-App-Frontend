import { z } from "zod";

const DocumentSchema = z.object({
  businessLicense: z.string(),
  validIDcard: z.string(),
  CAC: z.string(),
  taxID: z.string(),
});

export default DocumentSchema;

export type DocumentSchemaType = z.infer<typeof DocumentSchema>;

export const toDocumentFormValues = (
  user?: {
    businessLicense?: string | null;
    CAC?: string | null;
    validIDcard?: string | null;
    taxID?: string | null;
  } | null,
): DocumentSchemaType => ({
  businessLicense: user?.businessLicense ?? "",
  CAC: user?.CAC ?? "",
  validIDcard: user?.validIDcard ?? "",
  taxID: user?.taxID ?? "",
});
