import CustomButton from "@/components/atoms/button";
import DetailsSection, {
  // CustomerDetails,
  DetailRow,
  // MerchantDetails,
  RiderDetails,
} from "@/components/molecules/order/DetailsSection";
import OrderProductItemCard from "@/components/molecules/order/OrderProductItemCard";
import OrderTimelineItem from "@/components/molecules/order/OrderTimelineItem";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { formatAmount } from "@/lib/functions";
import Status from "@/lib/statusClass";
import { updateOrderForPickup, useFetchOrder } from "@/queries/orders";
import { MerchantEntity } from "@/types/merchants.type";
import { OrderItem, OrderSummaryItem, TimelineStep } from "@/types/order.type";
import { ArrowLeft } from "@phosphor-icons/react";
import moment from "moment";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

// const products: OrderItem[] = [
//   {
//     id: 1,
//     title: "Dual Outlet Stainless Steel Tailpipe for Automobiles",
//     price: 55000,
//     originalPrice: 65000,
//     color: "Curved Beleved Mouth - Silvery Black",
//     image:
//       "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&crop=center",
//     // badge: "73 x 73 Fill",
//     // badgeColor: "purple",
//   },
//   {
//     id: 2,
//     title: "2D Flat, 2D Flat Acrylic Car Interior Decor",
//     price: 3272,
//     originalPrice: 8148,
//     color: "black",
//     image:
//       "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=200&fit=crop&crop=center",
//   },
//   {
//     id: 3,
//     title: "MARVEL Cartoon Deadpool Car Rearview Mirror Hanging Ornament",
//     price: 2265,
//     color: "Sitting on a black wood chip and reading a book",
//     image:
//       "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
//   },
// ];

// const summaryItems: OrderSummaryItem[] = [
//   { label: "Products Subtotal:", amount: 108210 },
//   { label: "Delivery Subtotal:", amount: 11000 },
//   { label: "Promo Discount:", amount: -6000, isDiscount: true },
//   { label: "Saved:", amount: -21345, isSaved: true },
// ];

const riderDetails: RiderDetails = {
  name: "-",
  phoneNumber: "-",
};

const PreviewOrder = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname.split("/")[2];

  const { MerchantfetchaOneOrder, data, loading } = useFetchOrder();
  const { makeOrderReady, loading: makeOrderReadyLoading } =
    updateOrderForPickup(path);

  useEffect(() => {
    if (path) {
      MerchantfetchaOneOrder({
        variables: { orderID: path },
      });
    }
  }, [path]);

  const products: OrderItem[] = (data?.items ?? []).map((item, idx) => ({
    id: idx + 1,
    title: item?.product.productName,
    originalPrice: item?.price ? parseFloat(item.price) : 0,
    color: item?.product?.productColor || "N/A",
    image: item?.product?.productImages?.[0] || "",
    price:
      item?.product?.discountedPrice != null
        ? Number(item.product.discountedPrice)
        : item?.price
        ? parseFloat(item.price)
        : 0,
  }));

  const summaryItems: OrderSummaryItem[] = [
    {
      label: "Products Subtotal:",
      amount: Number(data?.subTotal),
    },
    {
      label: "Delivery Subtotal:",
      amount: Number(data?.deliveryFee),
    },
  ];

  const timelineSteps: TimelineStep[] = [
    {
      id: 1,
      title: "Order Received",
      description: "Waiting for merchant to confirm order.",
      time: moment(data?.createdAT).format("DD MMM, YYYY hh:mm A") ?? "-",
      isCompleted: true,
    },
    {
      id: 2,
      title: "Order Processed",
      description: "Order has been packaged and assembled.",
      time: data?.updatedAT
        ? moment(data?.updatedAT).format("DD MMM, YYYY hh:mm A")
        : "-",
      isCompleted: data?.orderStatus === "Packed_And_Ready_For_Pickup",
    },
    {
      id: 3,
      title: "Courier Pick-up",
      description: "Courier collected package from Merchant.",
      time: "-",
      isCompleted: false,
    },
    {
      id: 4,
      title: "In-Transit",
      description: "Package is on the way to you.",
      time: "-",
      isCompleted: false,
    },
    {
      id: 5,
      title: "Order Arrived",
      description: "Courier arrived at delivery address.",
      time: "-",
      isCompleted: false,
    },
    {
      id: 6,
      title: "Order Delivered",
      description: "Package handed to customer.",
      time: "-",
      isCompleted: false,
    },
  ];

  if (data?.pooledSavings) {
    summaryItems.push({
      label: "Promo Discount:",
      amount: -data?.pooledSavings || 0,
      isDiscount: true,
    });
  }
  const expectedTotal = (data?.subTotal || 0) + (data?.deliveryFee || 0);
  const saved = expectedTotal - (data?.total || 0);
  if (saved !== 0) {
    summaryItems.push({
      label: "Saved:",
      amount: -saved,
      isSaved: true,
    });
  }

  const merchantsArray: MerchantEntity[] = Array.isArray(data?.merchants)
    ? data.merchants
    : data?.merchants
    ? [data.merchants]
    : [];

  const merchantDetails = merchantsArray.map((i: MerchantEntity) => ({
    "Business Name": i?.businessName,
    "Phone Number": i?.phoneNumber,
    Address: i?.address,
  }));

  const customerDetails = data?.customer;

  return (
    <div className="space-y-2.5 md:space-y-5 flex flex-col flex-1 h-full">
      <div className=" flex justify-between gap-y-1.5 items-center flex-wrap">
        <div className="flex items-center space-x-2 flex-wrap">
          <Button
            onClick={() => navigate(-1)}
            variant={"ghost"}
            className="flex items-center gap-3  flex-wrap p-0"
          >
            <div className="inline-flex space-x-1.5">
              <ArrowLeft className="size-6 font-bold text-gray-800" />
              <h3 className="font-medium text-gray-800 text-base"> Order Id</h3>
            </div>{" "}
            -<h5 className="font-medium text-gray-800 text-base">{path}</h5>
          </Button>

          <p
            className={`inline rounded px-3 py-1 font-medium font-family-satoshi text-sm capitalize ${
              Status[
                (data?.orderStatus?.toLowerCase() ??
                  "default") as keyof typeof Status
              ]
            }`}
          >
            {data?.orderStatus ? data.orderStatus.replaceAll("_", " ") : "-"}
          </p>
        </div>
        {data?.orderStatus?.toLowerCase() === "processing" && (
          <CustomButton
            loading={makeOrderReadyLoading}
            onClick={() => makeOrderReady({ variables: { orderID: path } })}
          >
            Prepare Order for Pickup
          </CustomButton>
        )}
      </div>

      <div className="flex-1">
        {loading ? (
          <div className="flex items-center justify-center h-full w-full min-h-60vh">
            {" "}
            <Spinner className="size-8 text-primary" />
          </div>
        ) : (
          <div className="flex items-start gap-4  flex-col md:flex-row">
            <div className="w-full max-w-7xl col-span-3 space-y-4">
              <div className="bg-white border border-gray-200 rounded-[0.75rem] space-y-5">
                <div className="p-4 border-b ">
                  <h3 className="text-base font-bold ">Order Items</h3>
                </div>

                <div className="px-6 pb-6 border-b last:border-0 mb-2">
                  {products?.map((product) => (
                    <OrderProductItemCard
                      key={product.id}
                      orderItem={product}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-[0.75rem] space-y-5">
                <div className="p-4 border-b ">
                  <h3 className="text-base font-bold ">Order Summary</h3>
                </div>
                <div className="space-y-3 px-6 pb-6">
                  {summaryItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <h3 className="text-gray-700 text-sm font-semibold">
                        {item.label}
                      </h3>
                      <span
                        className={`text-sm font-semibold ${
                          item.isDiscount
                            ? "text-blue-600"
                            : item.isSaved
                            ? "text-red-600"
                            : "text-gray-900"
                        }`}
                      >
                        {item.isDiscount || item.isSaved ? "-" : ""}
                        {formatAmount(item.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-[0.75rem] space-y-5">
                <div className="p-4 border-b ">
                  <h3 className="text-base font-bold ">Order Timeline</h3>
                </div>
                <div className="space-y-3 px-6 pb-6">
                  {timelineSteps.map((step, index) => (
                    <OrderTimelineItem
                      step={step}
                      index={index}
                      total={timelineSteps.length}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full max-w-xl col-span-2 bg-white border rounded-[0.75rem] space-y-5 px-4 pt-4">
              {/* Merchant Details */}
              <DetailsSection
                title="Merchant Details"
                viewText="View Merchant"
                // onViewClick={handleViewMerchant}
              >
                {merchantDetails?.map((merchant, i) =>
                  Object.entries(merchant).map(([key, value], j) => (
                    <DetailRow
                      key={`${i}-${j}`}
                      label={key}
                      value={String(value ?? "")}
                    />
                  ))
                )}
              </DetailsSection>

              {/* Customer Details */}
              <DetailsSection
                title="Customer Details"
                viewText="View Customer"
                // onViewClick={handleViewCustomer}
              >
                <DetailRow
                  label="Customer Name"
                  value={customerDetails?.name}
                />
                {/* <DetailRow
                label="Customer Address"
                value={customerDetails?.address}
                isMultiline={true}
              /> */}
                <DetailRow
                  label="Customer Email Address"
                  value={customerDetails?.email}
                />
                <DetailRow
                  label="Customer Phone Number"
                  value={customerDetails?.phoneNumber ?? "-"}
                />
              </DetailsSection>

              {/* Rider Details */}
              <DetailsSection
                title="Rider Details"
                viewText="View Rider"
                // onViewClick={handleViewRider}
              >
                <DetailRow label="Rider Name" value={riderDetails.name} />
                <DetailRow
                  label="Rider Phone Number"
                  value={riderDetails.phoneNumber}
                />
              </DetailsSection>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewOrder;
