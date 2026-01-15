import { FETCH_ALL_PAYOUTS } from "@/api/payouts";
import { usePaginatedQuery } from "@/hooks/usePagination";
import { useTableState } from "@/hooks/useTableState";
// import { PayoutOutput } from "@/types/payoutOutput";
import React from "react";

// interface merchantFetchOnePayout {
//   MerchantetchallPayouts: {
//     success: boolean;
//     message: string;
//     payload: PayoutOutput;
//   };
// }

export type paginationQuery = {
  limit: number;
  page: number;
  sortBy: string;
  sortOrder: string;
  searchTerm?: string;
  endDate?: Date | string | undefined;
  startDate?: Date | string | undefined;
};

export const useFetchPayouts = () => {
  const { currentPage, pageSize, searchTerm, filters, setPageTotal } =
    useTableState("payouts");
  const { sortOrder, startDate, endDate } = filters;

  const paginationQuery = {
    page: currentPage,
    limit: pageSize,
    sortOrder,
    searchTerm,
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
  };

  const { data, loading, total, message } = usePaginatedQuery({
    query: FETCH_ALL_PAYOUTS,
    pagination: paginationQuery,
    extractData: (res) => {
      const payload = res?.MerchantfetchallPayouts?.payload;
      return {
        data: payload?.data ?? [],
        total: payload?.total ?? 0,
        message: res?.MerchantfetchallPayouts?.message,
      };
    },
  });

  // sync total with table store
  React.useEffect(() => {
    if (total) setPageTotal(total);
  }, [total]);

  return {
    data,
    message,
    loading,
  };
};
