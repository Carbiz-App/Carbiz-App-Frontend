import {
  PRODUCT_SOLD,
  PROFILE_MERCHANT,
  REVENUE,
  TOTAL_CUSTOMER,
} from "@/api/dashboard";
import { useToast } from "@/hooks/Toast";
import { useAuthStore, UserType } from "@/store/auth.store";
import { useQuery } from "@apollo/client";

interface MerchantPayload extends UserType {
  onboardingActions: string;
  onboardingPercentage: number;
  onboardingStatus: {
    add_Products: boolean;
    create_Account: boolean;
    setup_Payment: boolean;
  };
  role: string;
  status: string;
}

export interface MerchantProfileResponseType {
  profileMerchant: {
    success: boolean;
    message: string;
    payload: MerchantPayload;
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
  const { setUser } = useAuthStore();

  const { loading, error, data, refetch } = useQuery<MerchantProfileResponseType>(
    PROFILE_MERCHANT,
    {
      onCompleted: (e) => {
        const payload = e?.profileMerchant?.payload;
        if (payload) {
          const {
            onboardingActions,
            onboardingPercentage,
            onboardingStatus,
            ...userData
          } = payload;
          setUser(userData as UserType);
        }
      },
      onError: (error) => {
        handleError(error, "Error fetching merchant profile");
      },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    },
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

  const refetchAll = () =>
    Promise.all([
      refetch(),
      productCount.refetch(),
      customerCount.refetch(),
      revenue.refetch(),
    ]);

  return {
    loading,
    error,
    data: data?.profileMerchant?.payload,
    refetchAll,
    productCount,
    customerCount,
    revenue,
  };
};
