import { Button } from "@/components/ui/button";
import { useFetchOrder } from "@/queries/orders";
import { ArrowLeft } from "@phosphor-icons/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import img from "@/assets/images/onboarding.jpeg";
import { Skeleton } from "@/components/ui/skeleton";
import { CardDetail } from "@/components/atoms/card/previewCard";

type Details = {
  title: string;
  value: string;
};

const PreviewOrder = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/")[2];
  const { MerchantfetchaOneOrder, data, loading } = useFetchOrder();
  const navigate = useNavigate();

  useEffect(() => {
    if (path) {
      MerchantfetchaOneOrder({
        variables: { orderID: path },
      });
    }
  }, [path]);

  const order = data?.MerchantfetchaOneOrder?.payload;

  const orderDetails: Details[] = order
    ? [
        { title: "Order ID", value: order.orderID ?? "" },
        {
          title: "Created",
          value: order.createdAT
            ? new Date(order.createdAT).toISOString().split("T")[0]
            : "",
        },
        { title: "Payment Status", value: order.paymentStatus ?? "" },
        { title: "Delivery Status", value: order.orderStatus ?? "" },
        { title: "Customer", value: order.customer?.name ?? "" },
        { title: "Phone", value: order.customer?.phoneNumber ?? "" },
        { title: "Email", value: order.customer?.email ?? "" },
        { title: "Payment Channel", value: "Bank Transfer" }, // Replace if dynamic
        { title: "Transaction ID", value: "83905-48484494" }, // Replace if dynamic
      ]
    : [];

  const itemDetails: Details[] = order
    ? [
        { title: "Item", value: order.items?.product?.productName ?? "" },
        { title: "Quantity", value: order.items?.quantity?.toString() ?? "" },
        { title: "Price", value: `N${order.items?.price?.toLocaleString()}` },
        { title: "Total", value: `N${order.total?.toLocaleString()}` },
      ]
    : [];

  const productImages = order?.items?.product?.productImages;
  const productImgSrc =
    Array.isArray(productImages) && productImages.length
      ? productImages[0]
      : img; // fallback image

  return (
    <div>
      <Button
        onClick={() => navigate(-1)}
        variant="ghost"
        className="text-[#696572] hover:text-primary text-base font-[500] flex items-center gap-2 mb-10"
      >
        <ArrowLeft className="size-6 font-bold" />
        Order Details
      </Button>

      <div className="flex flex-col gap-6">
        <div className="p-5 md:p-10 rounded-xl border gap-y-5 sm:gap-y-7 md:gap-y-10 lg:gap-y-14 flex flex-wrap gap-5">
          {loading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton className="w-32 h-10" key={idx} />
            ))
          ) : !order ? (
            <p className="text-sm text-muted-foreground">No order found.</p>
          ) : (
            orderDetails.map(({ title, value }, idx) => (
              <CardDetail
                key={idx}
                title={title}
                value={value}
                isLast={idx === orderDetails.length - 1}
              />
            ))
          )}
        </div>

        {order && (
          <div className="p-5 md:p-10 rounded-xl border flex flex-col gap-6">
            <h3 className="text-base font-black">Order Item</h3>
            <div className="flex gap-4 md:gap-6 items-center">
              <img
                src={productImgSrc}
                alt="product-img"
                className="place-self-start w-14 h-14 md:size-16 rounded border overflow-hidden object-cover"
              />
              <div className="flex flex-wrap gap-6">
                {itemDetails.map(({ title, value }, idx) => (
                  <CardDetail
                    key={idx}
                    title={title}
                    value={value}
                    isLast={idx === itemDetails.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewOrder;
