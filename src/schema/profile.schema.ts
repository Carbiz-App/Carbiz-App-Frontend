import { z } from "zod";

const ProfileSchema = z.object({
  businessName: z.string({ message: "Business name is required" }),
  email: z.string().email("Invalid email address").optional().or(z.literal("")), // Allows empty string if needed
  phoneNumber: z
    .string({ message: "Phone number is required" })
    .regex(
      /^(0\d{10}|(\+234|234)\d{10})$/,
      "Invalid phone number. Use 07012345678, +2347012345678, or 2347012345678"
    ),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
  profilePictureUrl: z.string().optional(),
});

export default ProfileSchema;

export type ProfileSchemaType = z.infer<typeof ProfileSchema>;
