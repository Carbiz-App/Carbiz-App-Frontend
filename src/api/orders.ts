import { gql } from "@apollo/client";

export const FETCH_ALL_ORDERS = gql`
  query MerchantfetchallMyOrders($paginationQuery: PaginationDto!) {
    MerchantfetchallMyOrders(paginationQuery: $paginationQuery) {
      errors
      message
      payload {
        currentPage
        pageSize
        total
        data {
          RidersRide {
            id
          }
          createdAT
          customer {
            name
          }
          deliveryFee
          deliveryType
          distance_ms
          estimatedTimeOfTravel
          id
          isPooled
          items {
            price
            product {
              productName
            }
          }
          merchants {
            businessName
          }
          orderID
          orderStatus
          paymentStatus
          subTotal
          total
          trackingID
          updatedAT
          vehicleType
        }
      }
    }
  }
`;
