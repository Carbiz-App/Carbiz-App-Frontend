import { gql } from "@apollo/client";

export const PROFILE_MERCHANT = gql`
  query {
    profileMerchant {
      error
      message
      payload {
        businessName
        email
        onboardingActions
        role
        status
        onboardingPercentage
      }
    }
  }
`;
