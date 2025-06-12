import { FETCH_ALL_PRODUCTS } from "@/api/product";
import { productsColumn } from "@/columns/products.column";
import { DataTable } from "@/components/atoms/table";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { usePagination } from "@/hooks/usePagination";
import { useDeleteProducts } from "@/queries/products";
import { useModal } from "@/store/useModal";
import { Info } from "@phosphor-icons/react";
import { PopoverClose } from "@radix-ui/react-popover";

const index = () => {
  const { data, total, loading, pagination, setPage, refetch } = usePagination({
    query: FETCH_ALL_PRODUCTS,
    paginationDefaults: {
      limit: 15,
      page: 1,
      sortBy: "createdAt",
      sortOrder: "DESC",
    },
    extractData: (res) => ({
      data: res?.fetchallProductRelatedToMerchant?.payload?.data || [],
      total: res?.fetchallProductRelatedToMerchant?.payload?.total || 0,
    }),
  });

  const { modal, closeModal } = useModal();
  const { deleteProduct, loading: deleteLoading } = useDeleteProducts(refetch);

  const handleDelete = async () => {
    try {
      if (modal?.data)
        await deleteProduct({
          variables: { productID: modal?.data },
        });
    } catch (err) {
      console.log(err);
    } finally {
      closeModal();
    }
  };

  return (
    <Popover
      open={modal.open}
      onOpenChange={(open) => {
        if (!open) closeModal();
      }}
    >
      <DataTable
        columns={productsColumn()}
        data={data}
        tableName="Proucts"
        // isClickable
        loading={loading}
        total={total}
        pageIndex={pagination.page - 1}
        pageSize={pagination.limit}
        onPageChange={(index) => setPage(index + 1)}
      />
      <PopoverContent className=" min-w-max flex flex-col gap-3">
        <div className="flex items-center gap-1">
          <Info className=" size-6 text-primary" />
          <h3 className=" text-primary font-bold md:text-lg">
            Are you sure you want to Delete?
          </h3>
        </div>
        <div className="flex justify-end gap-2">
          <PopoverClose aria-label="close">
            <Button variant={"outline"}>No</Button>
          </PopoverClose>
          <Button
            disabled={deleteLoading}
            variant={"destructive"}
            onClick={handleDelete}
          >
            {deleteLoading ? "Loading..." : "Yes"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default index;
