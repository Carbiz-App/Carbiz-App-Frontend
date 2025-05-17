// import { FETCH_ALL_ORDERS } from "@/api/orders";
// import { columns } from "@/columns/columns";
// import { DataTable } from "@/components/atoms/table";
// import { usePagination } from "@/hooks/usePagination";

const Orders = () => {
  // const {
  //   data: orderData,
  //   total,
  //   loading: orderLoading,
  //   pagination,
  //   setPage,
  //   message,
  // } = usePagination({
  //   query: FETCH_ALL_ORDERS,
  //   extractData: (res) => ({
  //     data: res?.MerchantfetchallMyOrders?.payload?.data || [],
  //     total: res?.MerchantfetchallMyOrders?.payload?.total || 0,
  //     message: res?.MerchantfetchallMyOrders?.message,
  //   }),
  // });

  return (
    <div>
      orders coming
      {/* <DataTable
        tableName="Orders"
        columns={columns}
        data={orderData}
        total={total}
        loading={orderLoading}
        pageIndex={pagination.page - 1}
        pageSize={pagination.limit}
        onPageChange={(index) => setPage(index + 1)}
        message={message}
      /> */}
    </div>
  );
};

export default Orders;
