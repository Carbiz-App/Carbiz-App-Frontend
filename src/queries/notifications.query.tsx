import {
  APP_NOTIFICATIONS,
  MARK_ALL_NOTIFICATION_READ,
  MARK_MULTIPLE_NOTIFICATION_READ,
  MARK_SINGLE_NOTIFICATION_READ,
} from "@/api/notification";
import { useToast } from "@/hooks/Toast";
import { AppNotificationOutput } from "@/types/app-notifications.type";
import { useMutation, useQuery } from "@apollo/client";
import useTableStore from "./table-store";

export const useAppNotificationQuery = () => {
  const { setCurrentPage, pageSize } = useTableStore();

  const { data, loading, fetchMore, refetch } = useQuery(APP_NOTIFICATIONS, {
    variables: { paginationQuery: { page: 1, limit: pageSize } },
    notifyOnNetworkStatusChange: true,
    pollInterval: 20000,
  });

  const loadMore = async () => {
    if (!data) return;

    const payload = data.allNotificationsMerchant.payload;
    const nextPage = payload.currentPage + 1;

    if (nextPage > payload.totalPages) return;

    await fetchMore({
      variables: { paginationQuery: { page: nextPage, limit: pageSize } },

      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        const prevPayload = prev.allNotificationsMerchant.payload;
        const newPayload = fetchMoreResult.allNotificationsMerchant.payload;

        return {
          allNotificationsMerchant: {
            ...prev.allNotificationsMerchant,
            payload: {
              ...prevPayload,
              currentPage: newPayload.currentPage,
              data: [...prevPayload.data, ...newPayload.data],
              totalPages: newPayload.totalPages,
              unreadCount: newPayload.unreadCount,
            },
          },
        };
      },
    });

    setCurrentPage(nextPage);
  };

  return {
    items: data?.allNotificationsMerchant?.payload?.data ?? [],
    loading,
    loadMore,
    unreadCount: data?.allNotificationsMerchant?.payload?.unreadCount,
    page: data?.allNotificationsMerchant?.payload?.currentPage,
    all: data?.allNotificationsMerchant?.payload?.count,
    totalPages: data?.allNotificationsMerchant?.payload?.totalPages,
    refetch,
  };
};

export const MarkNotificationsAsRead = () => {
  interface MarkMultipleType {
    markMultipleAsNotificationAsReadMerchant: {
      success: boolean;
      message: string;
      payload: boolean;
      error?: string;
    };
  }

  const { handleError, handleInfo, handleSuccess } = useToast();
  const { currentPage, pageSize } = useTableStore();

  const [markNotificationsAsRead, { loading }] = useMutation<
    MarkMultipleType,
    { input: { notificationIds: string[] } }
  >(MARK_MULTIPLE_NOTIFICATION_READ, {
    refetchQueries: [
      {
        query: APP_NOTIFICATIONS,
        variables: {
          paginationQuery: {
            limit: pageSize,
            page: currentPage,
          },
        },
      },
    ],
    awaitRefetchQueries: true,

    onCompleted: (data) => {
      const result = data?.markMultipleAsNotificationAsReadMerchant;

      if (!result?.success) {
        handleInfo("Error", result?.message ?? "Failed marking notifications");
        return;
      }

      handleSuccess("Notifications Read", result.message);
    },

    onError: (error) => {
      handleError(error, "Reading Notification Failed");
      console.log("Mutation Error:", error);
    },
  });

  return { markNotificationsAsRead, notifcationsReadLoading: loading };
};

export const markSingleNotificationasRead = () => {
  interface markMultipleAsNotificationAsReadMerchantType {
    markNotificationAsReadMerchant: {
      success: boolean;
      message: string;
      payload: AppNotificationOutput;
    };
  }
  const { handleError, handleInfo, handleSuccess } = useToast();
  const { currentPage, pageSize } = useTableStore();
  const [markSingleNotification, { loading }] = useMutation<
    markMultipleAsNotificationAsReadMerchantType,
    { input: string }
  >(MARK_SINGLE_NOTIFICATION_READ, {
    refetchQueries: [
      {
        query: APP_NOTIFICATIONS,
        variables: {
          paginationQuery: {
            limit: pageSize,
            page: currentPage,
          },
        },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      const result = data?.markNotificationAsReadMerchant;

      if (!result) {
        handleError(
          new Error("No response received"),
          "Error TReading Notification"
        );
        return;
      }

      if (!result.success) {
        handleInfo(
          "Error",
          result.message || "Error Marking Notification as Read"
        );
        return;
      }
      handleSuccess("Notification Read", result.message);
    },

    onError: (error) => {
      handleError(error, "Reading Notification Failed");
      console.log("Mutation Error:", error);
    },
  });

  return { markSingleNotification, singleNotificationLoading: loading };
};

export const useMarkAllNotificationAsRead = () => {
  interface markAllsNotificationAsReadMerchant {
    markAllsNotificationAsReadMerchant: {
      success: boolean;
      message: string;
      payload: AppNotificationOutput;
    };
  }
  const { handleError, handleInfo, handleSuccess } = useToast();
  const { currentPage, pageSize } = useTableStore();
  const [markAllNotificationAsRead, { loading }] =
    useMutation<markAllsNotificationAsReadMerchant>(
      MARK_ALL_NOTIFICATION_READ,
      {
        refetchQueries: [
          {
            query: APP_NOTIFICATIONS,
            variables: {
              paginationQuery: {
                limit: pageSize,
                page: currentPage,
              },
            },
          },
        ],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
          const result = data?.markAllsNotificationAsReadMerchant;

          if (!result) {
            handleError(
              new Error("No response received"),
              "Error TReading Notification"
            );
            return;
          }

          if (!result.success) {
            handleInfo(
              "Error",
              result.message || "Error Marking Notification as Read"
            );
            return;
          }
          handleSuccess("Notification Read", result.message);
        },

        onError: (error) => {
          handleError(error, "Reading Notification Failed");
          console.log("Mutation Error:", error);
        },
      }
    );

  return {
    markAllNotificationAsRead,
    markALlNotificationasReadLoading: loading,
  };
};
