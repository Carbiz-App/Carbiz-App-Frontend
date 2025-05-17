import { PayoutsColumn } from "@/columns/payouts.columns";

import { FETCH_ALL_TRANSACTIONS } from "@/api/payouts";
import { usePagination } from "@/hooks/usePagination";
import { DataTable } from "@/components/atoms/table";
const Payouts = () => {
  const { data, total, loading, pagination, setPage, message } = usePagination({
    query: FETCH_ALL_TRANSACTIONS,
    paginationDefaults: {
      page: 1,
      limit: 10,
      sortOrder: "DESC",
      sortBy: "createdAT",
    },
    extractData: (res) => ({
      data: res?.MerchantfetchallMyTransactions?.payload?.data || [],
      total: res?.MerchantfetchallMyTransactions?.payload?.total || 0,
      message: res?.MerchantfetchallMyTransactions?.message,
    }),
  });
  return (
    <DataTable
      tableName="Payouts"
      // isClickable
      columns={PayoutsColumn}
      data={data}
      total={total}
      loading={loading}
      pageIndex={pagination.page - 1}
      pageSize={pagination.limit}
      onPageChange={(index) => setPage(index + 1)}
      message={message}
    />
  );
};

export default Payouts;
