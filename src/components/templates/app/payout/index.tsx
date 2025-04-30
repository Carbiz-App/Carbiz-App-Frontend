import { PayoutsColumn, payoutType } from "@/columns/payouts.columns";
import { DataTable } from "@/components/atoms/table";

const newData: payoutType[] = [
  {
    recepient: "John Doe",
    date: "2023-10-01",
    amount: "$100.00",
    paymentStatus: "Completed",
  },
  {
    recepient: "Jane Smith",
    date: "2023-10-02",
    amount: "$200.00",
    paymentStatus: "Pending",
  },
  {
    recepient: "Alice Johnson",
    date: "2023-10-03",
    amount: "$150.00",
    paymentStatus: "Failed",
  },
];

const Payouts = () => {
  return (
    <DataTable
      tableName="Payouts"
      isClickable
      columns={PayoutsColumn}
      data={newData}
    />
  );
};

export default Payouts;
