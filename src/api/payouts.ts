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

export const FETCH_TRANSACTION = gql`
  query MerchantfetchaOneTransaction($transactionID: String!) {
    MerchantfetchaOneTransaction(transactionID: $transactionID) {
      success
      message
      status
      errors
      payload {
        customer {
          name
        }
        amount
        createdAT
        status
        transactionID
      }
    }
  }
`;
