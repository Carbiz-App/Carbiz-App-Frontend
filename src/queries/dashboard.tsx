import { PROFILE_MERCHANT } from "@/api/dashboard";
import { useToast } from "@/hooks/Toast";
import { useQuery } from "@apollo/client";

interface MerchantProfileResponseType {
  profileMerchant: {
    success: boolean;
    message: string;
    payload: {
      onboardingActions: string;
      onboardingPercentage: number; // fixed
      onboardingStatus: {
        add_Products: boolean;
        create_Account: boolean;
        setup_Payment: boolean;
      };
      role: string;
      status: string;
    };
  };
}

export const useMerchantProfile = () => {
  const { handleError } = useToast();

  const { loading, error, data } = useQuery<MerchantProfileResponseType>(
    PROFILE_MERCHANT,
    {
      onCompleted: () => {
        // console.log("Profile Data:", data);
      },
      onError: (error) => {
        handleError(error, "Error fetching merchant profile");
      },
      fetchPolicy: "cache-and-network",
    }
  );

  return { loading, error, data: data?.profileMerchant?.payload };
};
