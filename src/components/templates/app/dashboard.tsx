import { columns } from "@/columns/testColumns";
import { DataTable } from "@/components/atoms/table";

export type Payment = {
  id: number;
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
    id: 1,
    product: "728ed52f",
    created: "2023-10-01",
    orderId: "1234567890",
    paymentStatus: "paid",
    deliveryStatus: "processing",
  },
  {
    id: 2,
    product: "728ed52f",
    created: "2023-10-02",
    orderId: "13332",
    paymentStatus: "cancelled",
    deliveryStatus: "awaiting",
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
