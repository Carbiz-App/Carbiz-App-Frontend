import { columns } from "@/columns/testColumns";
import { DataTable } from "@/components/atoms/table";

export type Payment = {
  product: string;
  created: string;
  orderId: string;
  paymentStatus: "paid" | "cancelled" | "refunded";
  deliveryStatus:
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "awaiting";
};

export const payments: Payment[] = [
  {
    product: "728ed52f",
    created: "2023-10-01",
    orderId: "1234567890",
    paymentStatus: "paid",
    deliveryStatus: "processing",
  },
];

const Dashboard = () => {
  return (
    <div>
      <DataTable columns={columns} data={payments} />
    </div>
  );
};

export default Dashboard;
