import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useLocation } from "react-router";

type PaginationInput = {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
};

type UsePaginatedQueryProps<TVariables> = {
  query: any;
  initialVariables?: TVariables;
  paginationDefaults?: PaginationInput;
  extractData: (response: any) => {
    data: any[];
    total: number;
    message?: string;
  };
};

export function usePagination<TVariables = any>({
  query,
  initialVariables,
  paginationDefaults = {
    page: 1,
    limit: 10,
    sortBy: "createdAT",
    sortOrder: "DESC",
  },
  extractData,
}: UsePaginatedQueryProps<TVariables>) {
  const [pagination, setPagination] =
    useState<PaginationInput>(paginationDefaults);

  // const { pathname } = useLocation();
  // const path = pathname.includes("products");

  const variables = {
    ...initialVariables,
    paginationQuery: {
      page: pagination.page,
      limit: pagination.limit,
      sortBy: pagination.sortBy || "CreatedAt",
      sortOrder: pagination.sortOrder,
    },
  };

  const { data, loading, error, refetch } = useQuery(query, {
    variables,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  const {
    data: tableData = [],
    total = 0,
    message = "",
  } = extractData(data || {});

  const setPage = (newPage: number) =>
    setPagination((prev) => ({ ...prev, page: newPage }));

  const setLimit = (newLimit: number) =>
    setPagination((prev) => ({ ...prev, limit: newLimit, page: 1 }));

  const setSort = (sortBy: string, sortOrder: "ASC" | "DESC") =>
    setPagination((prev) => ({ ...prev, sortBy, sortOrder }));

  return {
    loading,
    error,
    data: tableData,
    total,
    pagination,
    setPage,
    setLimit,
    setSort,
    refetch,
    message,
  };
}
