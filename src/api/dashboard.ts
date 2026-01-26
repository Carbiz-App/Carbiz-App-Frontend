import { gql } from "@apollo/client";

export const PROFILE_MERCHANT = gql`
  query {
    profileMerchant {
      errors
      message
      payload {
        isVerified
        isApproved
        businessName
        email
        address
        businessName
        city
        country
        email
        phoneNumber
        postalCode
        businessLicense
        CAC
        taxID
        validIDcard
        businessPics
        onboardingActions
        onboardingPercentage
        onboardingStatus {
          add_Products
          create_Account
          setup_Payment
        }
        role
        status
      }
    }
  }
`;

export const PRODUCT_SOLD = gql`
  query {
    MerchantsProductsoldCount {
      errors
      message
      payload
    }
  }
`;

export const TOTAL_CUSTOMER = gql`
  query {
    MerchantsTotalCustomerCount {
      errors
      message
      payload
    }
  }
`;
export const REVENUE = gql`
  query {
    MerchantsTotalRevenueWithDeliveryFee {
      errors
      message
      payload
    }
  }
`;
