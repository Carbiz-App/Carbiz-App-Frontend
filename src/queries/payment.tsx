import { PROFILE_MERCHANT } from "@/api/dashboard";
import {
  ADD_BANK_DETAILS,
  DELETE_BANK,
  FETCH_ALL_BANK_DETAILS,
  FETCH_ONE_BANK_DETAIL,
  LIST_SUPPORTED_BANKS,
  RESOLVE_ACCOUNT,
  UPDATE_BANK_DETAILS,
} from "@/api/payments";
import { useToast } from "@/hooks/Toast";
import { PaymentSchemaType } from "@/schema/payment.schema";
import { useModal } from "@/store/useModal";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

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
      PROFILE_MERCHANT,
      {
        query: FETCH_ALL_BANK_DETAILS,
        variables: {
          paginationQuery: {
            limit: 15,
            page: 1,
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
          "Add Bank Details Failed",
        );
        return;
      }
      if (!result.success) {
        handleInfo(
          "Add Bank",
          result.message || "Adding Bank Details unsuccessful",
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
          "Update Bank Detail Failed",
        );
        return;
      }

      if (!result.success) {
        handleInfo(
          "Edit Bank Detail",
          result.message || "Update Bank Detail unsuccessful",
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
          "Delete Bank Detail Failed",
        );
        return;
      }

      if (!result.success) {
        handleInfo(
          "Add Product",
          result.message || "Delete Bank Detail unsuccessful",
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
      fetchPolicy: "cache-first",
      nextFetchPolicy: "cache-first",
    });

  return { fetchOneBankDetail, data, loading, error };
};

export const listSupportedBanks = () => {
  interface listBankType {
    ListSupportedBanks: {
      success: boolean;
      message: string;
      payload: any;
    };
  }
  const { handleError } = useToast();
  const { data, loading, error } = useQuery<listBankType>(
    LIST_SUPPORTED_BANKS,
    {
      onCompleted: () => {},
      onError: (error) => {
        handleError(error, "Error fetching banks");
      },
      fetchPolicy: "cache-first",
      nextFetchPolicy: "cache-first",
    },
  );
  return { data: data?.ListSupportedBanks?.payload, loading, error };
};

export const useResolveAccountNumber = () => {
  type ResolveAccountNumber = {
    ResolveAccountNumber: {
      // Note: Data is usually nested under the query name
      success: boolean;
      message: string;
      payload: any;
    };
  };

  const { handleError } = useToast();

  const [triggerResolve, { data, loading }] =
    useLazyQuery<ResolveAccountNumber>(RESOLVE_ACCOUNT, {
      onCompleted: (res) => {
        const result = res?.ResolveAccountNumber;
        if (result && !result.success) {
          handleError(
            "Resolution Failed",
            result.message || "Could not verify account details",
          );
        }
      },
      onError: (error) => {
        handleError(error, "Error resolving account");
      },
      fetchPolicy: "cache-first",
      nextFetchPolicy: "cache-first",
    });
  return { triggerResolve, resolveData: data, resolveLoading: loading };
};
