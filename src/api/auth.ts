import { gql } from "@apollo/client";

export const REGISTER_MERCHANT = gql`
  mutation signUpMerchant($input: SignupMerchantDto!) {
    signUpMerchant(input: $input) {
      success
      message
      payload {
        businessName
        email
      }
    }
  }
`;

export const VERIFY_OTP = gql`
  mutation verifyOtpMerchant($input: VerifyOtp!) {
    verifyOtpMerchant(input: $input) {
      success
      message
      payload {
        businessName
        email
        isVerified
      }
    }
  }
`;
export const VERIFY_RESET_OTP = gql`
  mutation verifyResetPasswordOtpMerchant($input: VerifyOtp!) {
    verifyResetPasswordOtpMerchant(input: $input) {
      success
      message
      payload
    }
  }
`;

export const RESEND_OTP = gql`
  mutation resendOtpMerchant($input: ResendExpiredOtp!) {
    resendOtpMerchant(input: $input) {
      success
      message
      payload
    }
  }
`;
export const LOGIN = gql`
  mutation loginMerchant($input: LoginDto!) {
    loginMerchant(input: $input) {
      success
      message
      payload {
        token
        user {
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
          validIDcard
          taxID
        }
      }
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPasswordMerchant($input: ResetPasswordDto!) {
    resetPasswordMerchant(input: $input) {
      success
      message
      payload
    }
  }
`;
