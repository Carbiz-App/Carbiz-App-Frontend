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
export const UPDATE_PRODUCT = gql`
  mutation updateProduct($input: updateProductDto!, $productID: String!) {
    updateProduct(input: $input, productID: $productID) {
      success
      message
      status
      errors
      payload {
        productID
        productName
        productStatus
        productStock
        price
        discountedPrice
        productType
        productImages
        updatedAt
      }
    }
  }
`;

export const FETCH_PRODUCT_CATEGORIES = gql`
  query fetchallProductCategoriesMerchant($paginationQuery: PaginationDto!) {
    fetchallProductCategoriesMerchant(paginationQuery: $paginationQuery) {
      errors
      message
      payload {
        currentPage
        pageSize
        total
        data {
          productCategoryID
          productCategoryName
        }
      }
    }
  }
`;

/** Use with refetchQueries to refetch active list queries with their cached variables */
export const FETCH_ALL_PRODUCTS_QUERY_NAME = "fetchallProductRelatedToMerchant";
export const FETCH_ARCHIVED_PRODUCTS_QUERY_NAME = "fetchArchivedProducts";

export const FETCH_ALL_PRODUCTS = gql`
  query fetchallProductRelatedToMerchant(
    $paginationQuery: PaginatedProductFiltersDto!
  ) {
    fetchallProductRelatedToMerchant(paginationQuery: $paginationQuery) {
      success
      message
      status
      errors
      payload {
        data {
          createdAt
          updatedAt
          productID
          productName
          productImages
          price
          discountedPrice
          isDiscountApplied
          productStock
          productStatus
          productType
          isArchived
          archivedAt
          priceCurrencyType
          productCategory {
            productCategoryID
            productCategoryName
          }
          discountPercentage
        }
        total
        currentPage
        pageSize
      }
    }
  }
`;

export const FETCH_ARCHIVED_PRODUCTS = gql`
  query fetchArchivedProducts($paginationQuery: PaginatedProductFiltersDto!) {
    fetchArchivedProducts(paginationQuery: $paginationQuery) {
      success
      message
      status
      errors
      payload {
        data {
          createdAt
          productID
          productName
          productImages
          price
          productStock
          productStatus
          isArchived
          archivedAt
          priceCurrencyType
          productCategory {
            productCategoryID
            productCategoryName
          }
          discountPercentage
        }
        total
        currentPage
        pageSize
      }
    }
  }
`;

export const FETCH_PRODUCT = gql`
  query fetchOneProduct($productID: String!) {
    fetchOneProduct(productID: $productID) {
      success
      message
      status
      errors
      payload {
        productID
        productImages
        productName
        productDescription
        productCategory {
          productCategoryName
          productCategoryID
        }
        discountPercentage
        productType
        priceCurrencyType
        productWeightType
        productStock
        productColor
        price
        productWeight
        productLength_cm
        productBreadth_cm
        productWidth_cm
        isArchived
        archivedAt
      }
    }
  }
`;

export const ARCHIVE_PRODUCT = gql`
  mutation ArchiveProduct($productID: String!) {
    archiveProduct(productID: $productID) {
      success
      status
      message
      payload
      errors
    }
  }
`;

export const UNARCHIVE_PRODUCT = gql`
  mutation UnarchiveProduct($productID: String!) {
    unarchiveProduct(productID: $productID) {
      success
      status
      message
      payload
      errors
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($productID: String!) {
    deleteProduct(productID: $productID) {
      success
      message
      status
      payload
      errors
    }
  }
`;
