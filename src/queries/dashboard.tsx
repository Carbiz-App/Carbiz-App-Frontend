import {
  PRODUCT_SOLD,
  PROFILE_MERCHANT,
  REVENUE,
  TOTAL_CUSTOMER,
} from "@/api/dashboard";
import { useToast } from "@/hooks/Toast";
import { useQuery } from "@apollo/client";

export interface MerchantProfileResponseType {
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

interface MerchantsProductsoldCount {
  MerchantsProductsoldCount: {
    errors: boolean;
    message: string;
    payload: any;
  };
}

interface MerchantsTotalCustomerCount {
  MerchantsTotalCustomerCount: {
    errors: boolean;
    message: string;
    payload: any;
  };
}

interface MerchantsTotalRevenueWithDeliveryFee {
  MerchantsTotalRevenueWithDeliveryFee: {
    errors: boolean;
    message: string;
    payload: any;
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
      nextFetchPolicy: "cache-first",
    }
  );

  const productCount = useQuery<MerchantsProductsoldCount>(PRODUCT_SOLD, {
    onCompleted: () => {},
    onError: (error) => {
      handleError(error, "Error fetching  product count");
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  const customerCount = useQuery<MerchantsTotalCustomerCount>(TOTAL_CUSTOMER, {
    onCompleted: () => {},
    onError: (error) => {
      handleError(error, "Error fetching  customer count");
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });
  const revenue = useQuery<MerchantsTotalRevenueWithDeliveryFee>(REVENUE, {
    onCompleted: () => {},
    onError: (error) => {
      handleError(error, "Error fetching  revenue");
    },
    fetchPolicy: "cache-and-network",
  });

  return {
    loading,
    error,
    data: data?.profileMerchant?.payload,
    productCount,
    customerCount,
    revenue,
  };
};
