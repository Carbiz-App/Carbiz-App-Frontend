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
          name
          email
          phoneNumber
          createdAt
          customerID
        }
        total
        currentPage
        pageSize
      }
    }
  }
`;

export const FETCH_CUSTOMER_ORDER = gql`
  query MerchantfetchallMyCustomerOrderRelatedToMeAlone(
    $customerID: String!
    $paginationQuery: PaginationDto!
  ) {
    MerchantfetchallMyCustomerOrderRelatedToMeAlone(
      customerID: $customerID
      paginationQuery: $paginationQuery
    ) {
      success
      message
      errors
      payload {
        currentPage
        pageSize
        total
        data {
          customer {
            name
            email
            phoneNumber
            createdAt
          }
          items {
            product {
              productName
              createdAt
            }
          }
          orderStatus
          orderID
          paymentStatus
        }
      }
    }
  }
`;
