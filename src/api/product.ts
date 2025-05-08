import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation createProduct($input: createProductDto!) {
    createProduct(input: $input) {
      success
      message
      payload {
        productName
        productStatus
      }
    }
  }
`;
