import { ordersColumns } from "@/columns/columns";
import { DataTable } from "@/components/atoms/table";
import { useFetchAllOrders } from "@/queries/orders";

const Orders = () => {
  const { orderData, total, orderLoading, pagination, setPage, message } =
    useFetchAllOrders();

  return (
    <div>
      <DataTable
        tableName="Orders"
        columns={ordersColumns}
        data={orderData}
        total={total}
        loading={orderLoading}
        pageIndex={pagination.page - 1}
        pageSize={pagination.limit}
        onPageChange={(index) => setPage(index + 1)}
        message={message}
      />
    </div>
  );
};

export default Orders;
