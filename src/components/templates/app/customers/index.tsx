import { DataTable } from "@/components/atoms/table";
import CustomerColumns from "@/columns/customers.column";
// import { customers } from "@/assets/data/index.json";

import { FETCH_ALL_CUSTOMERS } from "@/api/customers";
import { usePaginatedQuery } from "@/hooks/usePagination";

const Customers = () => {
  const { data, loading, message } = usePaginatedQuery({
    query: FETCH_ALL_CUSTOMERS,
    pagination: {
      page: 1,
      limit: 10,
      sortOrder: "DESC",
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
        tableKey="customers"
        // isClickable
        columns={CustomerColumns}
        data={data}
        loading={loading}
        message={message}
      />
    </>
  );
};

export default Customers;
