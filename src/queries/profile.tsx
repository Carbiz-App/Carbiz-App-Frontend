import { PROFILE_MERCHANT } from "@/api/dashboard";
import { UPDATE_PROFILE, UPLOAD_KYC } from "@/api/merchant.profile";
import { useToast } from "@/hooks/Toast";
import { DocumentSchemaType } from "@/schema/document.schema";
import { ProfileSchemaType } from "@/schema/profile.schema";
import { useAuthStore, UserType } from "@/store/auth.store";
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
      email?: string;
      phoneNumber: string;
      postalCode: string;
      businessPics: string;
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

      if (result.success) {
        handleSuccess("Profile updated");

        console.log(result.payload);

        setUser({ ...result.payload });
      }
    },
    onError: (error) => {
      handleError(error, "Updating failed");
    },
  });

  return { updateMerchant, loading, error };
};

export default useMerchantProfile;

interface MerchantKYCResponse {
  uploadKYCDocumentMerchant: {
    success: boolean;
    message: string;
    error: string;
    payload: any;
  };
}

export const useUploadKyc = () => {
  const { handleError, handleSuccess } = useToast();
  const { setUser } = useAuthStore();

  const [uploadKYCDocmentMerchant, { loading }] = useMutation<
    MerchantKYCResponse,
    { input: DocumentSchemaType }
  >(UPLOAD_KYC, {
    refetchQueries: [PROFILE_MERCHANT],
    onCompleted: (data) => {
      const result = data?.uploadKYCDocumentMerchant;

      if (!result?.success) {
        handleError(result?.message || "Upload failed");
        return;
      }
      handleSuccess("Profile updated", result?.message);
      const { _typename, ...stripped } = result?.payload;
      setUser(stripped as UserType);
    },
    onError: (error) => {
      handleError(error, "Updating failed");
      return;
    },
  });

  return { uploadKYCDocmentMerchant, loading };
};
