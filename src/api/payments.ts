import { gql } from "@apollo/client";

export const FETCH_ALL_BANK_DETAILS = gql`
  query MerchantFetchAllBankDetails($paginationQuery: PaginationDto!) {
    MerchantFetchAllBankDetails(paginationQuery: $paginationQuery) {
      success
      message
      status
      errors
      payload {
        data {
          bankID
          accountName
          accountNumber
          bankName
          createdAT
        }
        total
        currentPage
        pageSize
      }
    }
  }
`;

export const ADD_BANK_DETAILS = gql`
  mutation MerchantAddBankDetails($bankDetails: BankDto!) {
    MerchantAddBankDetails(bankDetails: $bankDetails) {
      success
      message
      errors
      payload {
        bankName
      }
    }
  }
`;

export const UPDATE_BANK_DETAILS = gql`
  mutation MerchantUpdateBankDetails($bankDetails: BankDto!, $bankID: String!) {
    MerchantUpdateBankDetails(bankDetails: $bankDetails, bankID: $bankID) {
      success
      message
      errors
      payload {
        bankName
      }
    }
  }
`;

export const FETCH_ONE_BANK_DETAIL = gql`
  query MerchantFetchOneBankDetails($bankID: String!) {
    MerchantFetchOneBankDetails(bankID: $bankID) {
      success
      message
      status
      errors
      payload {
        bankID
        accountName
        accountNumber
        bankName
        createdAT
      }
    }
  }
`;

export const DELETE_BANK = gql`
  mutation MerchantDeleteBankDetails($bankID: String!) {
    MerchantDeleteBankDetails(bankID: $bankID) {
      success
      message
      payload
    }
  }
`;
