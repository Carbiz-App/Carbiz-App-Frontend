import { gql } from "@apollo/client";

export const FETCH_ALL_CUSTOMERS = gql`
  query fetchallMerchantCustomers($paginationQuery: PaginationDto!) {
    fetchallMerchantCustomers(paginationQuery: $paginationQuery) {
      success
      message
      status
      errors
      payload {
        data {
          id
          customerID
          name
          createdAt
        }
        total
        currentPage
        pageSize
      }
    }
  }
`;
