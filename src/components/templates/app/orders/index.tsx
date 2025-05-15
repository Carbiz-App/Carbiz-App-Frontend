import { FETCH_ALL_ORDERS } from "@/api/orders";
import { columns } from "@/columns/columns";
import { DataTable } from "@/components/atoms/table";
import { usePagination } from "@/hooks/usePagination";

// type Payment = {
//   id: number;
//   product: string;
//   created: string;
//   orderId: string;
//   paymentStatus: "paid" | "cancelled" | "refunded";
//   deliveryStatus:
//     | "processing"
//     | "shipped"
//     | "delivered"
//     | "cancelled"
//     | "awaiting";
// };

// const payments: Payment[] = [
//   {
//     id: 1,
//     product: "728ed52f",
//     created: "2023-10-01",
//     orderId: "1234567890",
//     paymentStatus: "paid",
//     deliveryStatus: "processing",
//   },
//   {
//     id: 2,
//     product: "728ed52f",
//     created: "2023-10-02",
//     orderId: "13332",
//     paymentStatus: "cancelled",
//     deliveryStatus: "awaiting",
//   },
// ];

const Orders = () => {
  const {
    data: orderData,
    total,
    loading: orderLoading,
    pagination,
    setPage,
    message,
  } = usePagination({
    query: FETCH_ALL_ORDERS,
    extractData: (res) => ({
      data: res?.MerchantfetchallMyOrders?.payload?.data || [],
      total: res?.MerchantfetchallMyOrders?.payload?.total || 0,
      message: res?.MerchantfetchallMyOrders?.message,
    }),
  });

  return (
    <div>
      <DataTable
        tableName="Orders"
        columns={columns}
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
