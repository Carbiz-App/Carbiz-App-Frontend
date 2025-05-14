import { ArrowSwapHorizontal, MoneySend, People } from "iconsax-reactjs";
import Analytics from "../atoms/analytics";
import { useMerchantProfile } from "@/queries/dashboard";
import { Skeleton } from "../ui/skeleton";

const analyticIcon = {
  product: ArrowSwapHorizontal,
  revenue: MoneySend,
  customer: People,
};

type analyticKey = keyof typeof analyticIcon;
const DashboardCards = () => {
  const { productCount, customerCount, revenue } = useMerchantProfile();
  const { loading, data } = productCount;
  console.log(customerCount.data);

  const dashboardAnalytics = [
    {
      title: "Revenue",
      value: revenue?.data?.MerchantsTotalRevenueWithDeliveryFee?.payload,
      name: "revenue",
      color: "#DC6803",
    },
    {
      title: "Product Sold",
      value: data?.MerchantsProductsoldCount?.payload,
      name: "product",
      color: "#027A48",
    },
    {
      title: "Customer",
      value: customerCount?.data?.MerchantsTotalCustomerCount?.payload,
      name: "customer",
      color: "#7046C6",
    },
  ];
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
      {loading && revenue?.loading && customerCount?.loading
        ? Array(3)
            .fill(0)
            .map((_, idx) => (
              <Skeleton
                key={idx}
                className=" rounded-lg h-24 sm:h-32 md:h-36 lg:h-44"
              />
            ))
        : dashboardAnalytics.map(({ title, value, name, color }) => (
            <Analytics
              key={name}
              title={title}
              value={value}
              iconColor={color}
              icon={analyticIcon[name as analyticKey]}
              isCurrency={name == "revenue"}
            />
          ))}
    </div>
  );
};

export default DashboardCards;
