import { gql } from "@apollo/client";

export const FETCH_ALL_ORDERS = gql`
  query MerchantfetchallMyOrders($paginationQuery: PaginationDto!) {
    MerchantfetchallMyOrders(paginationQuery: $paginationQuery) {
      success
      message
      status
      payload {
        data {
          orderID
          deliveryFee
          deliveryType
          items {
            quantity
            orderItemID

            orderItemID
            price
            product {
              price
              productID
              productName
              productType
              productColor
              productStock
              productImages
              productStatus
            }
          }
          orderStatus
          createdAT
          merchants {
            merchantID
            businessName
          }
        }
        total
        currentPage
        pageSize
      }
      errors
    }
  }
`;
