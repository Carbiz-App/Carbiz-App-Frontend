import { PayoutsColumn } from "@/columns/payouts.columns";
import { DataTable } from "@/components/atoms/table";
import { useFetchPayouts } from "@/queries/payout";
const Payouts = () => {
  const { data, loading, message } = useFetchPayouts();

  return (
    <DataTable
      tableName="Payouts"
      tableKey="payouts"
      // isClickable
      columns={PayoutsColumn}
      data={data ?? []}
      loading={loading}
      message={data?.length === 0 ? "No Payouts found" : message}
    />
  );
};

export default Payouts;
