import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

import { Form } from "@/components/ui/form";

import InputField from "@/components/atoms/form/input";

import ProfileSchema, { ProfileSchemaType } from "@/schema/profile.schema";
import SelectField from "@/components/atoms/form/select";
import { useAuthStore } from "@/store/auth.store";
import { getCountries } from "../../../lib/utils";
import useMerchantProfile from "@/queries/profile";
import ImagePicker from "@/components/atoms/form/imagepicker";
import CustomButton from "@/components/atoms/button/CustomButton";

const DEFAULT_COUNTRY = "Nigeria";

const hasValue = (value?: string | null) => !!value?.trim();

const toProfileFormValues = (
  user?: {
    businessName?: string | null;
    email?: string | null;
    phoneNumber?: string | null;
    address?: string | null;
    country?: string | null;
    postalCode?: string | null;
    businessPics?: string | null;
  } | null,
): ProfileSchemaType => ({
  businessName: user?.businessName ?? "",
  email: user?.email ?? "",
  phoneNumber: user?.phoneNumber ?? "",
  address: user?.address ?? "",
  country: user?.country?.trim() || DEFAULT_COUNTRY,
  postalCode: user?.postalCode ?? "",
  businessPictureUrl: user?.businessPics ?? "",
});

const ProfileForm = () => {
  const { user } = useAuthStore();
  const [countries, setCountries] = React.useState<
    { label: string; value: string }[]
  >();

  const { updateMerchant, loading } = useMerchantProfile();

  React.useEffect(() => {
    const fetchCountries = async () => {
      const res = await getCountries();
      setCountries(res);
    };
    fetchCountries();
  }, []);

  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: toProfileFormValues(user),
  });

  React.useEffect(() => {
    form.reset(toProfileFormValues(user));
  }, [user, form]);

  const isBusinessNameLocked = hasValue(user?.businessName);
  const isAddressLocked = hasValue(user?.address);
  const isPostalCodeLocked = hasValue(user?.postalCode);

  const onSubmit = async (data: ProfileSchemaType) => {
    await updateMerchant({
      variables: {
        input: {
          businessName: isBusinessNameLocked
            ? (user?.businessName ?? data.businessName)
            : data.businessName,
          phoneNumber: data.phoneNumber,
          address: isAddressLocked ? user?.address : data.address,
          country: user?.country?.trim() || DEFAULT_COUNTRY,
          postalCode: isPostalCodeLocked ? user?.postalCode : data.postalCode,
          businessPictureUrl: data.businessPictureUrl,
        },
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-w-md">
          <ImagePicker
            name="businessPictureUrl"
            defaultValue={user?.businessPics}
            control={form.control}
            label="Profile Picture"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:mb-5">
          <InputField
            control={form.control}
            name="businessName"
            label="Business Name"
            placeholder="John Doe"
            disabled={isBusinessNameLocked}
          />
          <SelectField
            control={form.control}
            label="Country"
            name="country"
            placeholder="Select country"
            items={countries}
            disabled
          />

          <InputField
            control={form.control}
            name="email"
            type="email"
            label="Email"
            placeholder="john.doe@example.com"
            disabled
          />

          <InputField
            control={form.control}
            name="phoneNumber"
            type="tel"
            label="Phone Number"
            placeholder="+234"
          />
          <InputField
            control={form.control}
            name="postalCode"
            type="text"
            label="Postal Code"
            placeholder="Code"
            disabled={isPostalCodeLocked}
          />
          <InputField
            control={form.control}
            name="address"
            type="text"
            label="Address"
            placeholder="Address"
            disabled={isAddressLocked}
          />
        </div>

        <CustomButton
          loading={loading}
          type="submit"
          className="bg-primary text-white px-7 md:py-7 rounded-[0.625rem] text-base "
        >
          Save
        </CustomButton>
      </form>
    </Form>
  );
};

export default ProfileForm;
