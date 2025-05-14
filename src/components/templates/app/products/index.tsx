import { productsColumn, productsType } from "@/columns/products.column";
import { DataTable } from "@/components/atoms/table";

const index = () => {
  const productsData: productsType[] = [
    {
      product: "Engine oil",
      price: "$20.00",
      quantity: 3,
      status: "Available",
    },
  ];
  return (
    <>
      <DataTable
        tableName="Products"
        isClickable={false}
        columns={productsColumn}
        data={productsData}
      />
    </>
  );
};

export default index;
