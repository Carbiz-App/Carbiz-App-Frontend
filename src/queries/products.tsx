import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  FETCH_ALL_PRODUCTS,
  FETCH_PRODUCT,
  UPDATE_PRODUCT,
} from "@/api/product";
import { useToast } from "@/hooks/Toast";
import { ProductSchemaType } from "@/schema/products.schema";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router";

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
    { input: ProductSchemaType }
  >(ADD_PRODUCT, {
    onCompleted: (data) => {
      const result = data?.createProduct;

      if (!result) {
        handleError(new Error("No response received"), "Add Product Failed");
        return;
      }

      if (!result.success) {
        handleInfo(
          "Add Product",
          result.message || "Adding Product unsuccessful"
        );
        return;
      }

      // If success
      handleSuccess("Prodct Added Successfully", result.message);
      navigate("..");
    },

    onError: (error) => {
      handleError(error, "Adding Product Failed");
      console.log("Mutation Error:", error);
    },
  });

  return { createProduct, loading };
};

interface updateProduct {
  updateProduct: {
    success: boolean;
    message: string;
    payload: {
      productName: string;
      productStatus: string;
    };
  };
}

export const useUpdateProduct = (onSuccess?: () => void) => {
  const { handleError, handleInfo, handleSuccess } = useToast();
  const navigate = useNavigate();
  const [updateProduct, { loading }] = useMutation<
    updateProduct,
    { input: ProductSchemaType; productID: string }
  >(UPDATE_PRODUCT, {
    refetchQueries: [{ query: FETCH_ALL_PRODUCTS }],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      const result = data?.updateProduct;

      if (!result) {
        handleError(new Error("No response received"), "Update Product Failed");
        return;
      }

      if (!result.success) {
        handleInfo(
          "Add Product",
          result.message || "Update Product unsuccessful"
        );
        return;
      }

      // If success
      handleSuccess("Prodct Updated Successfully", result.message);
      onSuccess?.();
      navigate("..");
    },

    onError: (error) => {
      handleError(error, "Adding Product Failed");
      console.log("Mutation Error:", error);
    },
  });

  return { updateProduct, loading };
};

interface deleteProduct {
  deleteProduct: {
    success: boolean;
    message: string;
    payload: boolean;
  };
}
export const useDeleteProducts = (onSuccess?: () => void) => {
  const { handleError, handleInfo, handleSuccess } = useToast();
  const [deleteProduct, { loading }] = useMutation<
    deleteProduct,
    { productID: string }
  >(DELETE_PRODUCT, {
    onCompleted: (data) => {
      const result = data?.deleteProduct;

      if (!result) {
        handleError(new Error("No response received"), "Delete Product Failed");
        return;
      }

      if (!result.success) {
        handleInfo(
          "Add Product",
          result.message || "Delete Product unsuccessful"
        );
        return;
      }

      // If success
      handleSuccess("Prodct Deleted Successfully", result.message);
      onSuccess?.();
    },

    onError: (error) => {
      handleError(error, "Deleting Product Failed");
      console.log("Mutation Error:", error);
    },
  });

  return { deleteProduct, loading };
};

interface fetchOneProduct {
  fetchOneProduct: {
    success: boolean;
    message: string;
    payload: any;
  };
}
export const useFetchProduct = () => {
  const { handleError } = useToast();

  const [fetchOneProduct, { data, loading, error }] =
    useLazyQuery<fetchOneProduct>(FETCH_PRODUCT, {
      onCompleted: () => {},
      onError: (error) => {
        handleError(error, "Error fetching product");
      },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    });

  return { fetchOneProduct, data, loading, error };
};
