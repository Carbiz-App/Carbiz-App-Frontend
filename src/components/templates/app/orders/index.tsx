import { ordersColumns } from "@/columns/columns";
import { DataTable } from "@/components/atoms/table";
import { useFetchAllOrders } from "@/queries/orders";

const Orders = () => {
  const { orderData, orderLoading, message } = useFetchAllOrders();

  return (
    <div>
      <DataTable
        tableKey="orders"
        columns={ordersColumns}
        data={orderData}
        loading={orderLoading}
        message={message}
      />
    </div>
  );
};

export default Orders;
