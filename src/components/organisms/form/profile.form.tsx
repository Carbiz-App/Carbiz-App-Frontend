import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import InputField from "@/components/atoms/form/input";

import ProfileSchema, { ProfileSchemaType } from "@/schema/profile.schema";
import SelectField from "@/components/atoms/form/select";
import { useAuthStore } from "@/store/auth.store";
import { getCities, getCountries } from "../../../lib/utils";
import useMerchantProfile from "@/queries/profile";
import ImagePicker from "@/components/atoms/form/imagepicker";
import CustomButton from "@/components/atoms/button";

const ProfileForm = () => {
  const { user } = useAuthStore();
  const [countries, setCountries] = React.useState();
  const [cities, setCities] = React.useState();

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
    defaultValues: {
      ...user,
    },
  });

  const selectedCountry = form.watch("country");

  React.useEffect(() => {
    const fetchCities = async () => {
      if (selectedCountry) {
        const res = await getCities(selectedCountry);
        setCities(res);
      }
    };

    fetchCities();
  }, [selectedCountry]);

  const onSubmit = async (data: ProfileSchemaType) => {
    await updateMerchant({
      variables: {
        input: {
          businessName: data?.businessName,
          phoneNumber: data?.phoneNumber,
          address: data?.address,
          // city: data?.city,
          country: data?.country,
          postalCode: data?.postalCode,
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
          />
          <SelectField
            control={form.control}
            label="Country"
            name="country"
            placeholder="Select coountry"
            items={countries}
          />

          <InputField
            control={form.control}
            name="email"
            type="email"
            label="Email"
            placeholder="john.doe@example.com"
            disabled
          />

          {/* <SelectField
            control={form.control}
            label="City"
            name="city"
            placeholder="Choose"
            items={cities}
          /> */}
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
          />
          <InputField
            control={form.control}
            name="address"
            type="text"
            label="Address"
            placeholder="Address"
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
