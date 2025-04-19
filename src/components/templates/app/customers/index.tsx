import { DataTable } from "@/components/atoms/table";
import CustomerColumns from "@/columns/customers.column";
import { customers } from "@/assets/data/index.json";

type customerType = {
  name: string;
  email: string;
  createdAt: string;
  phone: string;
};

const Customers = () => {
  const newData: customerType[] = [...customers];
  return (
    <DataTable
      tableName="Customers"
      isClickable
      columns={CustomerColumns}
      data={newData}
    />
  );
};

export default Customers;
