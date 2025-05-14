import { gql } from "@apollo/client";

export const PROFILE_MERCHANT = gql`
  query {
    profileMerchant {
      errors
      message
      payload {
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

export const PRODUCT_SOLD = gql``;
