import { z } from "zod";

const DocumentSchema = z.object({
  businessLicense: z.string().optional(),
  validIDcard: z.string().optional(),
  CAC: z.string().optional(),
  taxID: z.string().optional(),
});

export default DocumentSchema;

export type DocumentSchemaType = z.infer<typeof DocumentSchema>;
