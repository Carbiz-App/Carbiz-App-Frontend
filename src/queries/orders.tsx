import {
  FETCH_ALL_ORDERS,
  FETCH_ORDER,
  UpdateOrderForPickup,
} from "@/api/orders";
import { useToast } from "@/hooks/Toast";
import { usePagination } from "@/hooks/usePagination";
import { useModal } from "@/store/useModal";
import OrderEntity from "@/types/order.type";
import { useLazyQuery, useMutation } from "@apollo/client";

// interface MerchantfetchaOneOrder {
//   MerchantfetchaOneOrder: {
//     success: boolean;
//     message: string;
//     payload: any;
//   };
// }

interface UpdateForPickup {
  MerchantUpdateOrderToPackedAndReadyForPickup: {
    success: boolean;
    message: string;
    payload: boolean;
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
  type FetchOrderResult = {
    MerchantfetchaOneOrder?: {
      success?: boolean;
      message?: string;
      payload?: OrderEntity;
    };
  };

  const [MerchantfetchaOneOrder, { data, loading, error }] =
    useLazyQuery<FetchOrderResult>(FETCH_ORDER, {
      onCompleted: () => {},
      onError: (error) => {
        handleError(error, "Error fetching order");
      },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    });

  return {
    MerchantfetchaOneOrder,
    data: data?.MerchantfetchaOneOrder?.payload,
    loading,
    error,
  };
};

export const updateOrderForPickup = (orderID: string) => {
  const { handleError, handleInfo, handleSuccess } = useToast();
  const { closeModal } = useModal();
  const [makeOrderReady, { loading }] = useMutation<
    UpdateForPickup,
    { orderID: string }
  >(UpdateOrderForPickup, {
    refetchQueries: [
      {
        query: FETCH_ORDER,
        variables: {
          orderID: orderID,
        },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      const result = data?.MerchantUpdateOrderToPackedAndReadyForPickup;
      if (!result) {
        handleError(
          new Error("No response received"),
          "Updating Order Status Failed"
        );
        return;
      }

      if (!result.success) {
        handleInfo(
          "Order Status",
          result.message || "Updating Order Status Unsuccessful"
        );
        return;
      }
      handleSuccess("Order Status", result.message);
      closeModal();
    },

    onError: (error) => {
      handleError(error, "Updating Bank Detail");
      console.log("Mutation Error:", error);
    },
  });

  return { makeOrderReady, loading };
};
