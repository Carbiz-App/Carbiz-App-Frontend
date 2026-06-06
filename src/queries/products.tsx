import {
  ADD_PRODUCT,
  ARCHIVE_PRODUCT,
  DELETE_PRODUCT,
  FETCH_ALL_PRODUCTS,
  FETCH_ALL_PRODUCTS_QUERY_NAME,
  FETCH_ARCHIVED_PRODUCTS,
  FETCH_ARCHIVED_PRODUCTS_QUERY_NAME,
  FETCH_PRODUCT,
  UNARCHIVE_PRODUCT,
  UPDATE_PRODUCT,
} from "@/api/product";
import { useToast } from "@/hooks/Toast";
import { usePaginatedQuery } from "@/hooks/usePagination";
import { useTableState } from "@/hooks/useTableState";
import {
  CreateProductInput,
  ProductMutationResponse,
  UpdateProductInput,
} from "@/types/product.type";
import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { useNavigate } from "react-router";

export type PaginationQuery = {
  limit: number;
  page: number;
  sortBy?: string;
  sortOrder: "ASC" | "DESC";
  searchTerm?: string;
  endDate?: Date | string | undefined;
  startDate?: Date | string | undefined;
  isArchived?: boolean;
  status?: string;
};

const ARCHIVE_REFETCH_QUERIES = [
  FETCH_ALL_PRODUCTS_QUERY_NAME,
  FETCH_ARCHIVED_PRODUCTS_QUERY_NAME,
];

const IDEMPOTENT_ARCHIVE_MESSAGES = [
  "Product is already archived",
  "Product is not archived",
];

const isIdempotentArchiveMessage = (message?: string) =>
  !!message &&
  IDEMPOTENT_ARCHIVE_MESSAGES.some((text) => message.includes(text));

const buildPaginationQuery = (
  currentPage: number,
  pageSize: number,
  filters: {
    sortOrder: "ASC" | "DESC";
    startDate?: string;
    endDate?: string;
    productStatus?: ("New_Arrival" | "Available" | "Out_Of_Stock")[];
  },
  searchTerm?: string,
  options?: { isArchived?: boolean; sortBy?: string },
): PaginationQuery => {
  const status = filters.productStatus?.[0];

  return {
    page: currentPage,
    limit: pageSize,
    sortBy: options?.sortBy ?? "createdAt",
    sortOrder: filters.sortOrder,
    searchTerm,
    isArchived: options?.isArchived,
    ...(filters.startDate && { startDate: filters.startDate }),
    ...(filters.endDate && { endDate: filters.endDate }),
    ...(status && { status }),
  };
};

export const useFetchProducts = () => {
  const { currentPage, pageSize, searchTerm, filters, setPageTotal } =
    useTableState("products");
  const { sortOrder, startDate, endDate, productStatus } = filters;

  const paginationQuery = buildPaginationQuery(
    currentPage,
    pageSize,
    { sortOrder, startDate, endDate, productStatus },
    searchTerm,
    { isArchived: false, sortBy: "createdAt" },
  );

  const { data, loading, total, message, refetch } = usePaginatedQuery({
    query: FETCH_ALL_PRODUCTS,
    pagination: paginationQuery,
    extractData: (res) => {
      const payload = res?.fetchallProductRelatedToMerchant?.payload;
      return {
        data: payload?.data ?? [],
        total: payload?.total ?? 0,
        message: res?.fetchallProductRelatedToMerchant?.message,
      };
    },
  });

  React.useEffect(() => {
    if (total) setPageTotal(total);
  }, [total, setPageTotal]);

  return {
    data,
    refetch,
    message,
    loading,
  };
};

export const useFetchArchivedProducts = (enabled = true) => {
  const { currentPage, pageSize, searchTerm, filters, setPageTotal } =
    useTableState("productsArchived");
  const { sortOrder, startDate, endDate, productStatus } = filters;

  const paginationQuery = buildPaginationQuery(
    currentPage,
    pageSize,
    { sortOrder, startDate, endDate, productStatus },
    searchTerm,
    { sortBy: "archivedAt" },
  );

  const { data, loading, total, message, refetch } = usePaginatedQuery({
    query: FETCH_ARCHIVED_PRODUCTS,
    pagination: paginationQuery,
    skip: !enabled,
    extractData: (res) => {
      const payload = res?.fetchArchivedProducts?.payload;
      return {
        data: payload?.data ?? [],
        total: payload?.total ?? 0,
        message: res?.fetchArchivedProducts?.message,
      };
    },
  });

  React.useEffect(() => {
    if (enabled && total) setPageTotal(total);
  }, [enabled, total, setPageTotal]);

  return {
    data: enabled ? data : [],
    refetch,
    message,
    loading: enabled ? loading : false,
  };
};

interface BooleanMutationResponse {
  success: boolean;
  message: string;
  status: number;
  payload: boolean | null;
  errors: string | null;
}

export const useArchiveProduct = (onSuccess?: () => void) => {
  const { handleError, handleInfo, handleSuccess } = useToast();

  const [archiveProduct, { loading }] = useMutation<
    { archiveProduct: BooleanMutationResponse },
    { productID: string }
  >(ARCHIVE_PRODUCT, {
    refetchQueries: ARCHIVE_REFETCH_QUERIES,
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      const result = data?.archiveProduct;

      if (!result) {
        handleError(new Error("No response received"), "Archive Product Failed");
        return;
      }

      if (!result.success) {
        if (isIdempotentArchiveMessage(result.message)) {
          handleSuccess("Product Archived", result.message);
          onSuccess?.();
          return;
        }

        const detail = result.errors
          ? `${result.message} — ${result.errors}`
          : result.message || "Archive product unsuccessful";
        handleInfo("Archive Product", detail);
        return;
      }

      handleSuccess("Product Archived", result.message);
      onSuccess?.();
    },
    onError: (error) => {
      handleError(error, "Archive Product Failed");
    },
  });

  return { archiveProduct, loading };
};

export const useUnarchiveProduct = (onSuccess?: () => void) => {
  const { handleError, handleInfo, handleSuccess } = useToast();

  const [unarchiveProduct, { loading }] = useMutation<
    { unarchiveProduct: BooleanMutationResponse },
    { productID: string }
  >(UNARCHIVE_PRODUCT, {
    refetchQueries: ARCHIVE_REFETCH_QUERIES,
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      const result = data?.unarchiveProduct;

      if (!result) {
        handleError(
          new Error("No response received"),
          "Unarchive Product Failed",
        );
        return;
      }

      if (!result.success) {
        if (isIdempotentArchiveMessage(result.message)) {
          handleSuccess("Product Unarchived", result.message);
          onSuccess?.();
          return;
        }

        const detail = result.errors
          ? `${result.message} — ${result.errors}`
          : result.message || "Unarchive product unsuccessful";
        handleInfo("Unarchive Product", detail);
        return;
      }

      handleSuccess("Product Unarchived", result.message);
      onSuccess?.();
    },
    onError: (error) => {
      handleError(error, "Unarchive Product Failed");
    },
  });

  return { unarchiveProduct, loading };
};

interface createProduct {
  createProduct: {
    success: boolean;
    message: string;
    payload: {
      productName: string;
      productStatus: string;
    };
  };
}

export const useAddProducts = () => {
  const { handleError, handleInfo, handleSuccess } = useToast();
  const navigate = useNavigate();

  const [createProduct, { loading }] = useMutation<
    createProduct,
    { input: CreateProductInput }
  >(ADD_PRODUCT, {
    refetchQueries: [FETCH_ALL_PRODUCTS_QUERY_NAME],
    onCompleted: (data) => {
      const result = data?.createProduct;

      if (!result) {
        handleError(new Error("No response received"), "Add Product Failed");
        return;
      }

      if (!result.success) {
        handleInfo(
          "Add Product",
          result.message || "Adding Product unsuccessful",
        );
        return;
      }

      handleSuccess("Prodct Added Successfully", result.message);
      navigate("..");
    },

    onError: (error) => {
      handleError(error, "Adding Product Failed");
    },
  });

  return { createProduct, loading };
};

interface UpdateProductMutation {
  updateProduct: ProductMutationResponse;
}

export const useUpdateProduct = (
  productID?: string,
  onSuccess?: () => void,
) => {
  const { handleError, handleInfo, handleSuccess } = useToast();
  const navigate = useNavigate();
  const [updateProduct, { loading }] = useMutation<
    UpdateProductMutation,
    { input: UpdateProductInput; productID: string }
  >(UPDATE_PRODUCT, {
    refetchQueries: [
      FETCH_ALL_PRODUCTS_QUERY_NAME,
      ...(productID
        ? [{ query: FETCH_PRODUCT, variables: { productID } }]
        : []),
    ],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      const result = data?.updateProduct;

      if (!result) {
        handleError(new Error("No response received"), "Update Product Failed");
        return;
      }

      if (!result.success) {
        const detail = result.errors
          ? `${result.message} — ${result.errors}`
          : result.message || "Update product unsuccessful";
        handleInfo("Update Product", detail);
        return;
      }

      handleSuccess("Product Updated", result.message);
      onSuccess?.();
      navigate("..");
    },

    onError: (error) => {
      handleError(error, "Updating Product Failed");
    },
  });

  return { updateProduct, loading };
};

interface deleteProduct {
  deleteProduct: {
    success: boolean;
    message: string;
    status: number;
    payload: boolean | null;
    errors: string | null;
  };
}
export const useDeleteProducts = (onSuccess?: () => void) => {
  const { handleError, handleInfo, handleSuccess } = useToast();
  const [deleteProduct, { loading }] = useMutation<
    deleteProduct,
    { productID: string }
  >(DELETE_PRODUCT, {
    refetchQueries: ARCHIVE_REFETCH_QUERIES,
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      const result = data?.deleteProduct;

      if (!result) {
        handleError(new Error("No response received"), "Delete Product Failed");
        return;
      }

      if (!result.success) {
        const detail = result.errors
          ? `${result.message} — ${result.errors}`
          : result.message || "Delete product unsuccessful";
        handleInfo("Delete Product", detail);
        return;
      }

      handleSuccess("Product Deleted", result.message);
      onSuccess?.();
    },

    onError: (error) => {
      handleError(error, "Deleting Product Failed");
    },
  });

  return { deleteProduct, loading };
};

interface fetchOneProduct {
  fetchOneProduct: {
    success: boolean;
    message: string;
    payload: {
      productID?: string;
      isArchived?: boolean;
      archivedAt?: string | null;
      [key: string]: unknown;
    };
  };
}
export const useFetchProduct = (productID: string) => {
  const { handleError } = useToast();

  const { data, loading, error, refetch } = useQuery<fetchOneProduct>(
    FETCH_PRODUCT,
    {
      variables: { productID },
      onError: (error) => {
        handleError(error, "Error fetching product");
      },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
      skip: !productID,
    },
  );

  return { data, loading, error, refetch };
};
