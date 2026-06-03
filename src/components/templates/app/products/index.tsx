import { productsColumn } from "@/columns/products.column";
import { DataTable } from "@/components/atoms/table";
import { Button } from "@/components/ui/button";
import { useFetchProducts } from "@/queries/products";
import { ArrowsClockwise } from "@phosphor-icons/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

const index = () => {
  const { data, loading, message, refetch } = useFetchProducts();
  const { pathname } = useLocation();
  const router = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <DataTable
      columns={productsColumn()}
      tableKey="products"
      data={data}
      tableName="Proucts"
      // isClickable
      message={message}
      loading={loading}
      actions
    >
      <div className="flex items-center gap-3 lg:ml-auto">
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          loading={isRefreshing}
          aria-label="Refresh products"
          title="Refresh products"
          className="md:size-10"
        >
          <ArrowsClockwise size={20} />
        </Button>
        <Button
          onClick={() => router(`${pathname}/new`)}
          variant="default"
          className="md:py-6 border-0 shadow text-sm sm:text-sm md:text-[14px] font-bold"
        >
          <Plus className="size-4 md:size-7" />
          New Product
        </Button>
      </div>
    </DataTable>
  );
};

export default index;
