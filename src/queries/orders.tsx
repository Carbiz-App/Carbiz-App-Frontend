import { FETCH_ORDER } from "@/api/orders";
import { useToast } from "@/hooks/Toast";
import { useLazyQuery } from "@apollo/client";

interface MerchantfetchaOneOrder {
  MerchantfetchaOneOrder: {
    success: boolean;
    message: string;
    payload: any;
  };
}
export const useFetchOrder = () => {
  const { handleError } = useToast();

  const [MerchantfetchaOneOrder, { data, loading, error }] =
    useLazyQuery<MerchantfetchaOneOrder>(FETCH_ORDER, {
      onCompleted: () => {},
      onError: (error) => {
        handleError(error, "Error fetching order");
      },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    });

  return { MerchantfetchaOneOrder, data, loading, error };
};
