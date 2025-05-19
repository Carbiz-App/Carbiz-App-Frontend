import { gql } from "@apollo/client";

export const UPDATE_PROFILE = gql`
  mutation updateMerchant($input: updateMerchantDto!) {
    updateMerchant(input: $input) {
      success
      message
      payload {
        address
        businessName
        city
        country
        email
        phoneNumber
        postalCode
      }
    }
  }
`;

export const UPLOAD_KYC = gql`
  mutation uploadKYCDocumentMerchant($input: uploadDocumentDto!) {
    uploadKYCDocumentMerchant(kyc: $input) {
      success
      message
      payload {
        businessLicense
        CAC
        validIDcard
        taxID
      }
    }
  }
`;


