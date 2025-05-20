import { CardDetail } from "@/components/atoms/card/previewCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchTransaction } from "@/queries/payout";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router";

type details = {
  title: string;
  value: string;
};

const PreviewPayout = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/")[2];
  const { MerchantfetchaOneTransaction, data, loading } = useFetchTransaction();
  const message = data?.MerchantfetchaOneTransaction?.message;
  const transaction = data?.MerchantfetchaOneTransaction?.payload;

  useEffect(() => {
    if (path) {
      MerchantfetchaOneTransaction({
        variables: { transactionID: path },
      });
    }
  }, [path]);

  const itemDetails: details[] = transaction
    ? [
        { title: "Recipient", value: transaction?.customer?.name ?? "" },
        { title: "Amount", value: transaction?.amount ?? "" },
        { title: "Date", value: transaction?.createdAT ?? "" },
        { title: "Payment Status", value: transaction?.status ?? "" },
        { title: "Transaction ID", value: transaction?.transactionID ?? "" },
      ]
    : [];

  return (
    <div className="space-y-10">
      <Link to={".."} className="inline-flex items-center gap-2.5">
        <ArrowLeft size={20} color="#696572" />
        <h4 className="font-family-satoshi text-text-secondary text-base font-medium">
          Payout Details
        </h4>
      </Link>

      <div className="bg-white rounded-xl p-10 border border-[#F5F5F6] flex font-family-satoshi gap-6 flex-wrap sm:flex-nowrap">
        {loading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton className="w-32 h-10" key={idx} />
          ))
        ) : !transaction ? (
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
    </div>
  );
};

export default PreviewPayout;
