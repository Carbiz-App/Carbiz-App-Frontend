import { z } from "zod";

const VerifyOtpSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email("Invalid email address"),
  code: z
    .string({ required_error: "Code is required" })
    .max(4, { message: "Must be 4 characters long" }),
});

export default VerifyOtpSchema;

export type VerifyOtpSchemaType = z.infer<typeof VerifyOtpSchema>;
