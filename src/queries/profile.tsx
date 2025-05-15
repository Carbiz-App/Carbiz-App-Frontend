import { UPDATE_PROFILE } from "@/api/merchant.profile";
import { useToast } from "@/hooks/Toast";
import { ProfileSchemaType } from "@/schema/profile.schema";
import { useAuthStore } from "@/store/auth.store";
import { useMutation } from "@apollo/client";

interface MerchantProfileResponse {
  updateMerchant: {
    success: boolean;
    message: string;
    error: string;
    payload: {
      businessName: string;
      address: string;
      city: string;
      country: string;
      email: string;
      phoneNumber: string;
      postalCode: string;
    };
  };
}

const useMerchantProfile = () => {
  const { handleError, handleSuccess } = useToast();
  const { setUser } = useAuthStore();

  const [updateMerchant, { loading, error }] = useMutation<
    MerchantProfileResponse,
    { input: ProfileSchemaType }
  >(UPDATE_PROFILE, {
    onCompleted: (data) => {
      const result = data.updateMerchant;

      if (!result.success) {
        throw new Error(result.message);
        return;
      }

      handleSuccess("Profile updated");

      setUser({ ...result.payload });
    },
    onError: (error) => {
      handleError(error, "Updating failed");
    },
  });

  return { updateMerchant, loading, error };
};

export default useMerchantProfile;
