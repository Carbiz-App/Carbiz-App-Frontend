import { UPDATE_PROFILE, UPLOAD_KYC } from "@/api/merchant.profile";
import { useToast } from "@/hooks/Toast";
import { DocumentSchemaType } from "@/schema/document.schema";
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
        handleError(result.message);
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

interface MerchantKYCResponse {
  uploadKYCDocmentMerchant: {
    success: boolean;
    message: string;
    error: string;
    payload: {
      businessLicense: string;
      CAC: string;
      taxID: string;
      validIDcard: string;
    };
  };
}

export const useUploadKyc = () => {
  const { handleError, handleSuccess } = useToast();
  //   const { setUser } = useAuthStore();

  const [uploadKYCDocmentMerchant, { loading }] = useMutation<
    MerchantKYCResponse,
    { input: DocumentSchemaType }
  >(UPLOAD_KYC, {
    onCompleted: (data) => {
      const result = data.uploadKYCDocmentMerchant;

      if (!result.success) {
        handleError(result.message);
      }

      handleSuccess("Profile updated");

      //   setUser({ ...result.payload });
    },
    onError: (error) => {
      handleError(error, "Updating failed");
    },
  });

  return { uploadKYCDocmentMerchant, loading };
};
