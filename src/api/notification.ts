import { gql } from "@apollo/client";

export const APP_NOTIFICATIONS = gql`
  query allNotificationsMerchant(
    $paginationQuery: PaginationParamsForNotification!
  ) {
    allNotificationsMerchant(paginationQuery: $paginationQuery) {
      errors
      success
      message
      payload {
        count
        currentPage
        totalPages
        unreadCount
        data {
          account
          date
          id
          isRead
          message
          notificationID
          readAt
          subject
        }
      }
    }
  }
`;

export const MARK_MULTIPLE_NOTIFICATION_READ = gql`
  mutation markMultipleAsNotificationAsReadMerchant(
    $input: markMultipleNotificationsAsReadDto!
  ) {
    markMultipleAsNotificationAsReadMerchant(input: $input) {
      success
      errors
      message
      payload
    }
  }
`;

export const MARK_SINGLE_NOTIFICATION_READ = gql`
  mutation markNotificationAsReadMerchant($input: String!) {
    markNotificationAsReadMerchant(input: $input) {
      success
      message
      payload {
        account
        date
        id
        isRead
        message
        notificationID
        readAt
        subject
      }
    }
  }
`;

export const MARK_ALL_NOTIFICATION_READ = gql`
  mutation markAllsNotificationAsReadMerchant {
    markAllsNotificationAsReadMerchant {
      success
      errors
      message
      payload
    }
  }
`;
