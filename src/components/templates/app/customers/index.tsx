import React from "react";
import { DataTable } from "@/components/atoms/table";
import CustomerColumns from "@/columns/customers.column";
import { customers } from "@/assets/data/index.json";

const Customers = () => {
  return (
    <DataTable
      tableName="Customers"
      isClickable
      columns={CustomerColumns}
      data={customers}
    />
  );
};

export default Customers;
