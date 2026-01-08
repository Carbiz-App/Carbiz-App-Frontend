import { productsColumn } from "@/columns/products.column";
import { DataTable } from "@/components/atoms/table";
import { Button } from "@/components/ui/button";
import { useFetchProducts } from "@/queries/products";
import { Plus } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

const index = () => {
  const { data, loading, message } = useFetchProducts();
  const { pathname } = useLocation();
  const router = useNavigate();

  return (
    <DataTable
      columns={productsColumn()}
      tableKey="products"
      data={data}
      tableName="Proucts"
      // isClickable
      message={data.length === 0 ? "No product has been added" : message}
      loading={loading}
      actions
    >
      <div className="flex items-center gap-4 lg:ml-auto">
        <Button
          onClick={() => router(`${pathname}/new`)} // Navigate to the new product page
          variant="default"
          className="md:py-6  border-0 shadow text-sm sm:text-sm md:text-[14px] font-bold"
        >
          <Plus className="size-4 md:size-7" />
          New Product
        </Button>
      </div>
    </DataTable>
  );
};

export default index;
