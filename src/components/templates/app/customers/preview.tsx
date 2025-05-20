import { Link, useLocation } from "react-router";
import { ArrowLeft } from "iconsax-reactjs";
import { CardDetail } from "@/components/atoms/card/previewCard";
import { usePagination } from "@/hooks/usePagination";
import { FETCH_CUSTOMER_ORDER } from "@/api/customers";
import { DataTable } from "@/components/atoms/table";
import { ordersColumns } from "@/columns/columns";
import { Skeleton } from "@/components/ui/skeleton";

type details = {
  title: string;
  value: string;
};

const PreviewCustomer = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/")[2];
  const { data, total, loading, pagination, setPage, message } = usePagination({
    query: FETCH_CUSTOMER_ORDER,
    initialVariables: { customerID: path },
    paginationDefaults: {
      page: 1,
      limit: 10,
      sortOrder: "DESC",
      sortBy: "createdAT",
    },
    extractData: (res) => ({
      data:
        res?.MerchantfetchallMyCustomerOrderRelatedToMeAlone?.payload?.data ||
        [],
      total:
        res?.MerchantfetchallMyCustomerOrderRelatedToMeAlone?.payload?.total ||
        0,
      message: res?.MerchantfetchallMyCustomerOrderRelatedToMeAlone?.message,
    }),
  });

  const customer = data?.[0]?.customer;

  const itemDetails: details[] = customer
    ? [
        { title: "Name", value: customer?.name ?? "" },
        { title: "Email", value: customer?.email ?? "" },
        { title: "Phone", value: customer?.phoneNumber ?? "" },
        { title: "Added on", value: customer?.createdAt ?? "" },
      ]
    : [];

  return (
    <div className="space-y-10">
      <Link to={".."} className="inline-flex items-center gap-2.5">
        <ArrowLeft size={20} color="#696572" />
        <h4 className="font-family-satoshi text-text-secondary text-base font-medium">
          Customer Details
        </h4>
      </Link>

      <div className="bg-white rounded-xl p-10 border border-[#F5F5F6] flex font-family-satoshi gap-6 flex-wrap sm:flex-nowrap">
        {loading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton className="w-32 h-10" key={idx} />
          ))
        ) : !customer ? (
          <p className="text-sm text-muted-foreground">{message}</p>
        ) : (
          itemDetails.map(
            ({ title, value }: { title: string; value: string }) => (
              <CardDetail
                key={title}
                title={title}
                value={value}
                isLast={title === itemDetails[itemDetails.length - 1].title}
              />
            )
          )
        )}
      </div>

      <DataTable
        tableName="Orders"
        // isClickable
        columns={ordersColumns}
        data={data}
        total={total}
        loading={loading}
        pageIndex={pagination.page - 1}
        pageSize={pagination.limit}
        onPageChange={(index) => setPage(index + 1)}
        message={message}
      />
    </div>
  );
};

export default PreviewCustomer;
