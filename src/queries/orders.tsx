import {
  FETCH_ALL_ORDERS,
  FETCH_ORDER,
  UpdateOrderForPickup,
} from "@/api/orders";
import { useToast } from "@/hooks/Toast";
import { usePaginatedQuery } from "@/hooks/usePagination";
import { useTableState } from "@/hooks/useTableState";
import { useModal } from "@/store/useModal";
import OrderEntity from "@/types/order.type";
import { useLazyQuery, useMutation } from "@apollo/client";
import React from "react";

interface UpdateForPickup {
  MerchantUpdateOrderToPackedAndReadyForPickup: {
    success: boolean;
    message: string;
    payload: boolean;
  };
}

export const useFetchAllOrders = () => {
  const { currentPage, pageSize, searchTerm, filters, setPageTotal } =
    useTableState("orders");
  const { sortOrder, startDate, endDate, orderStatus, paymentStatus } = filters;

  const paginationQuery = {
    page: currentPage,
    limit: pageSize,
    sortOrder,
    searchTerm,
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
    ...(orderStatus && { deliveryStatus: orderStatus }),
    ...(paymentStatus && { paymentStatus }),
  };

  const { data, loading, total, message } = usePaginatedQuery({
    query: FETCH_ALL_ORDERS,
    pagination: paginationQuery,
    extractData: (res) => {
      const payload = res?.MerchantfetchallMyOrders?.payload;
      return {
        data: payload?.data ?? [],
        total: payload?.total ?? 0,
        message: res?.MerchantfetchallMyOrders?.message,
      };
    },
  });

  // sync total with table store
  React.useEffect(() => {
    if (total) setPageTotal(total);
  }, [total]);

  return {
    orderData: data,
    orderLoading: loading,
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
      {
        query: FETCH_ALL_ORDERS,
        variables: {
          paginationQuery: {
            page: 1,
            limit: 10,
            sortBy: "createdAT",
            sortOrder: "DESC",
          },
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
