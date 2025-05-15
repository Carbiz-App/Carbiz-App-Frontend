import { FETCH_PRODUCT_CATEGORIES } from "@/api/product";
import { productsColumn } from "@/columns/products.column";
import { DataTable } from "@/components/atoms/table";
import { usePagination } from "@/hooks/usePagination";

const index = () => {
  // const productsData: productsType[] = [
  //   {
  //     product: "Engine oil",
  //     price: "$20.00",
  //     quantity: 3,
  //     status: "Available",
  //   },
  // ];

  const { data, total, loading, pagination, setPage } = usePagination({
    query: FETCH_PRODUCT_CATEGORIES,
    extractData: (res) => ({
      data: res?.fetchallProductCategoriesMerchant?.payload?.data || [],
      total: res?.fetchallProductCategoriesMerchant?.payload?.total || 0,
    }),
  });

  return (
    <>
      <DataTable
        columns={productsColumn}
        data={data}
        tableName="Proucts"
        isClickable
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
