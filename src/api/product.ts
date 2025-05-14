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

export const FETCH_PRODUCT_CATEGORIES = gql`
  query {
    fetchallProductCategories(
      paginationQuery: {
        limit: 15
        page: 1
        sortBy: "createdAt"
        sortOrder: "DESC"
      }
    ) {
      errors
      message
      payload {
        productCategoryID
        productCategoryName
      }
    }
  }
`;
