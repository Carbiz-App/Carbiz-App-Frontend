import { gql } from "@apollo/client";

export const FETCH_ALL_TRANSACTIONS = gql`
  query MerchantfetchallMyTransactions($paginationQuery: PaginationDto!) {
    MerchantfetchallMyTransactions(paginationQuery: $paginationQuery) {
      success
      message
      status
      errors
      payload {
        data {
          createdAT
          amount
          customer {
            name
          }
          status
        }
        total
        currentPage
        pageSize
      }
    }
  }
`;
