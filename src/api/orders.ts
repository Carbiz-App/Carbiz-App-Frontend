import { gql } from "@apollo/client";

export const FETCH_ALL_ORDERS = gql`
  query MerchantfetchallMyOrders($paginationQuery: PaginatedOrderFiltersDto!) {
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
        merchants {
          businessName
          address
          phoneNumber
        }
        RidersRide {
          at_dropoff_locationAT
          dropped_off_parcelAT
          enroute_to_dropoff_locationAT
          picked_up_parcelAT
          milestone
          rider {
            firstName
            lastName
            phoneNumber
          }
        }
        items {
          order {
            subTotal
            total
            optimizedRoute {
              lat
              lng
            }
          }
          product {
            priceCurrencyType
            discountedPrice
            discountPercentage
            productColor
            isDiscountApplied
            productName
            productImages
            price
          }
          quantity
          price
        }
        total
        pooledSavings
        subTotal
        total
        deliveryFee
        updatedAT
      }
    }
  }
`;

export const UpdateOrderForPickup = gql`
  mutation MerchantUpdateOrderToPackedAndReadyForPickup($orderID: String!) {
    MerchantUpdateOrderToPackedAndReadyForPickup(orderID: $orderID) {
      success
      message
      payload
    }
  }
`;
