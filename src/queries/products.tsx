import { ADD_PRODUCT } from "@/api/product";
import { useToast } from "@/hooks/Toast";
import { ProductSchemaType } from "@/schema/products.schema";
import { useMutation } from "@apollo/client";
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
