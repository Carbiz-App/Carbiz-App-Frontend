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
            rider {
              firstName
              lastName
              phoneNumber
            }
            id
          }
          createdAT
          customer {
            addresses {
              fullAddress
            }
            email
            phoneNumber
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

export const FETCH_ORDER = gql`
  query MerchantfetchaOneOrder($orderID: String!) {
    MerchantfetchaOneOrder(orderID: $orderID) {
      success
      message
      status
      errors
      payload {
        orderID
        createdAT
        paymentStatus
        orderStatus
        customer {
          name
          phoneNumber
          email
        }
        items {
          order {
            subTotal
            total
            optimizedRoute
          }
          product {
            productColor
            isDiscountApplied
            productName
            productImages
          }
          quantity
          price
        }
        total
      }
    }
  }
`;
