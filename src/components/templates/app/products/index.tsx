import { FETCH_ALL_PRODUCTS } from "@/api/product";
import { productsColumn } from "@/columns/products.column";
import { DataTable } from "@/components/atoms/table";
import { usePagination } from "@/hooks/usePagination";

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

  return (
    <>
      <DataTable
        columns={productsColumn({ refetch })}
        data={data}
        tableName="Proucts"
        // isClickable
        loading={loading}
        total={total}
        pageIndex={pagination.page - 1}
        pageSize={pagination.limit}
        onPageChange={(index) => setPage(index + 1)}
      />
    </>
  );
};

export default index;
