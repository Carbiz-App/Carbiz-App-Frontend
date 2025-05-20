import { FETCH_TRANSACTION } from "@/api/payouts";
import { useToast } from "@/hooks/Toast";
import { useLazyQuery } from "@apollo/client";

interface MerchantfetchaOneTransaction {
  MerchantfetchaOneTransaction: {
    success: boolean;
    message: string;
    payload: any;
  };
}
export const useFetchTransaction = () => {
  const { handleError } = useToast();

  const [MerchantfetchaOneTransaction, { data, loading, error }] =
    useLazyQuery<MerchantfetchaOneTransaction>(FETCH_TRANSACTION, {
      onCompleted: () => {},
      onError: (error) => {
        handleError(error, "Error fetching transaction");
      },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    });

  return { MerchantfetchaOneTransaction, data, loading, error };
};
