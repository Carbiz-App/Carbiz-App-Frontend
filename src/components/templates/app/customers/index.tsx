import { DataTable } from "@/components/atoms/table";
import CustomerColumns from "@/columns/customers.column";
// import { customers } from "@/assets/data/index.json";

import { FETCH_ALL_CUSTOMERS } from "@/api/customers";
import { usePagination } from "@/hooks/usePagination";

const Customers = () => {
  const { data, total, loading, pagination, setPage, message } = usePagination({
    query: FETCH_ALL_CUSTOMERS,
    paginationDefaults: {
      page: 1,
      limit: 10,
      sortOrder: "DESC",
      sortBy: "createdAt",
    },
    extractData: (res) => ({
      data: res?.fetchallMerchantCustomers?.payload?.data || [],
      total: res?.fetchallMerchantCustomers?.payload?.total || 0,
      message: res?.fetchallMerchantCustomers?.message,
    }),
  });

  // console.log(data);
  return (
    <>
      <DataTable
        tableName="Customers"
        // isClickable
        columns={CustomerColumns}
        data={data}
        total={total}
        loading={loading}
        pageIndex={pagination.page - 1}
        pageSize={pagination.limit}
        onPageChange={(index) => setPage(index + 1)}
        message={message}
      />
    </>
  );
};

export default Customers;
