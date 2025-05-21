import {
  ADD_BANK_DETAILS,
  DELETE_BANK,
  FETCH_ALL_BANK_DETAILS,
  FETCH_ONE_BANK_DETAIL,
  UPDATE_BANK_DETAILS,
} from "@/api/payments";
import { useToast } from "@/hooks/Toast";
import { PaymentSchemaType } from "@/schema/payment.schema";
import { useModal } from "@/store/useModal";
import { useLazyQuery, useMutation } from "@apollo/client";

interface MerchantAddBankDetails {
  MerchantAddBankDetails: {
    success: boolean;
    message: string;
    payload: {
      bankName: string;
    };
  };
}
export const useAddBankDetail = () => {
  const { handleError, handleInfo, handleSuccess } = useToast();
  const { closeModal } = useModal();
  const [createBankDetail, { loading }] = useMutation<
    MerchantAddBankDetails,
    { bankDetails: PaymentSchemaType }
  >(ADD_BANK_DETAILS, {
    refetchQueries: [
      {
        query: FETCH_ALL_BANK_DETAILS,
        variables: {
          paginationQuery: {
            limit: 15,
            page: 1,
            sortBy: "createdAT",
            sortOrder: "DESC",
          },
        },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      const result = data?.MerchantAddBankDetails;
      if (!result) {
        handleError(
          new Error("No response received"),
          "Add Bank Details Failed"
        );
        return;
      }
      if (!result.success) {
        handleInfo(
          "Add Bank",
          result.message || "Adding Bank Details unsuccessful"
        );
        return;
      }
      handleSuccess("Bank Detail Added Successfully", result.message);
      closeModal();
    },
    onError: (error) => {
      handleError(error, "Adding Bank Detail Failed");
      console.log("Mutation Error:", error);
    },
  });
  return { createBankDetail, loading };
};

interface MerchantUpdateBankDetails {
  MerchantUpdateBankDetails: {
    success: boolean;
    message: string;
    payload: {
      bankName: string;
    };
  };
}

export const useUpdateBankDetails = () => {
  const { handleError, handleInfo, handleSuccess } = useToast();
  const { closeModal } = useModal();
  const [updateBankDetail, { loading }] = useMutation<
    MerchantUpdateBankDetails,
    { bankDetails: PaymentSchemaType; bankID: string }
  >(UPDATE_BANK_DETAILS, {
    refetchQueries: [
      {
        query: FETCH_ALL_BANK_DETAILS,
        variables: {
          paginationQuery: {
            limit: 15,
            page: 1,
            sortBy: "createdAT",
            sortOrder: "DESC",
          },
        },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      const result = data?.MerchantUpdateBankDetails;
      if (!result) {
        handleError(
          new Error("No response received"),
          "Update Bank Detail Failed"
        );
        return;
      }

      if (!result.success) {
        handleInfo(
          "Edit Bank Detail",
          result.message || "Update Bank Detail unsuccessful"
        );
        return;
      }
      handleSuccess("Bank Detail Successfully Updated", result.message);
      closeModal();
    },

    onError: (error) => {
      handleError(error, "Updating Bank Detail");
      console.log("Mutation Error:", error);
    },
  });

  return { updateBankDetail, loading };
};

interface MerchantDeleteBankDetails {
  MerchantDeleteBankDetails: {
    success: boolean;
    message: string;
    payload: boolean;
  };
}
export const useDeleteBank = () => {
  const { handleError, handleInfo, handleSuccess } = useToast();
  const [deleteBank, { loading }] = useMutation<
    MerchantDeleteBankDetails,
    { bankID: string }
  >(DELETE_BANK, {
    refetchQueries: [
      {
        query: FETCH_ALL_BANK_DETAILS,
        variables: {
          paginationQuery: {
            limit: 15,
            page: 1,
            sortBy: "createdAT",
            sortOrder: "DESC",
          },
        },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      const result = data?.MerchantDeleteBankDetails;

      if (!result) {
        handleError(
          new Error("No response received"),
          "Delete Bank Detail Failed"
        );
        return;
      }

      if (!result.success) {
        handleInfo(
          "Add Product",
          result.message || "Delete Bank Detail unsuccessful"
        );
        return;
      }
      handleSuccess("Bank Detail Deleted Successfully", result.message);
    },

    onError: (error) => {
      handleError(error, "Deleting Bank Detail Failed");
      console.log("Mutation Error:", error);
    },
  });

  return { deleteBank, loading };
};

interface MerchantFetchOneBankDetails {
  MerchantFetchOneBankDetails: {
    success: boolean;
    message: string;
    payload: any;
  };
}
export const useFetchBankDetail = () => {
  const { handleError } = useToast();
  const [fetchOneBankDetail, { data, loading, error }] =
    useLazyQuery<MerchantFetchOneBankDetails>(FETCH_ONE_BANK_DETAIL, {
      onCompleted: () => {},
      onError: (error) => {
        handleError(error, "Error fetching Bank Detail");
      },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    });

  return { fetchOneBankDetail, data, loading, error };
};
