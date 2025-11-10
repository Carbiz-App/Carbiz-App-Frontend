import { FETCH_ALL_ORDERS, FETCH_ORDER } from "@/api/orders";
import { useToast } from "@/hooks/Toast";
import { usePagination } from "@/hooks/usePagination";
import { useLazyQuery } from "@apollo/client";

interface MerchantfetchaOneOrder {
  MerchantfetchaOneOrder: {
    success: boolean;
    message: string;
    payload: any;
  };
}

export const useFetchAllOrders = () => {
  const {
    data: orderData,
    total,
    loading: orderLoading,
    pagination,
    setPage,
    message,
  } = usePagination({
    query: FETCH_ALL_ORDERS,
    extractData: (res) => {
      const api = res?.MerchantfetchallMyOrders;

      if (!api?.payload) {
        console.log("GraphQL returned null payload:", api);
        return {
          data: [],
          total: 0,
          message: api?.message || "Something went wrong on the server.",
        };
      }
      return {
        data: res?.MerchantfetchallMyOrders?.payload?.data || [],
        total: res?.MerchantfetchallMyOrders?.payload?.total || 0,
        message: res?.MerchantfetchallMyOrders?.message,
      };
    },
  });

  return {
    orderData,
    total,
    orderLoading,
    pagination,
    setPage,
    message,
  };
};

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
