import { productsColumn } from "@/columns/products.column";
import { DataTable } from "@/components/atoms/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useFetchArchivedProducts,
  useFetchProducts,
} from "@/queries/products";
import { ArrowsClockwise } from "@phosphor-icons/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

type ProductTab = "active" | "archived";

const ActiveProductsTable = () => {
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
      columns={productsColumn({ variant: "active" })}
      tableKey="products"
      data={data}
      tableName="Products"
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

const ArchivedProductsTable = ({ enabled }: { enabled: boolean }) => {
  const { data, loading, message, refetch } = useFetchArchivedProducts(enabled);
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
      columns={productsColumn({ variant: "archived" })}
      tableKey="productsArchived"
      data={data}
      tableName="Archived Products"
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
          aria-label="Refresh archived products"
          title="Refresh archived products"
          className="md:size-10"
        >
          <ArrowsClockwise size={20} />
        </Button>
      </div>
    </DataTable>
  );
};

const index = () => {
  const [activeTab, setActiveTab] = useState<ProductTab>("active");

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as ProductTab)}
      className="w-full"
    >
      <TabsList className="mb-4 grid w-full max-w-md grid-cols-2 bg-muted/40">
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="archived">Archived</TabsTrigger>
      </TabsList>

      <TabsContent value="active" className="mt-0">
        <ActiveProductsTable />
      </TabsContent>

      <TabsContent value="archived" className="mt-0">
        <ArchivedProductsTable enabled={activeTab === "archived"} />
      </TabsContent>
    </Tabs>
  );
};

export default index;
