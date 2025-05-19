import { gql } from "@apollo/client";

export const FETCH_ALL_ORDERS = gql`
  query MerchantfetchallMyOrders($paginationQuery: PaginationDto!) {
    MerchantfetchallMyOrders(paginationQuery: $paginationQuery) {
      success
      message
      status
      payload {
        data
        total
        currentPage
        pageSize
      }
      errors
    }
  }
`;
