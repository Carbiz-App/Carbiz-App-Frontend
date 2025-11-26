import { CheckCircle } from "@phosphor-icons/react";
import { Progress } from "@/components/ui/progress";
import { ordersColumns } from "@/columns/columns";
import { DataTable } from "@/components/atoms/table";
import { useAuthStore } from "@/store/auth.store";
import { useMerchantProfile } from "@/queries/dashboard";
import DashboardCards from "@/components/molecules/DashboardCards";
import { Link } from "react-router";
import { useFetchAllOrders } from "@/queries/orders";
import { Spinner } from "@/components/ui/spinner";

const Dashboard = () => {
  const { user } = useAuthStore();
  const { loading, data } = useMerchantProfile();
  const docState =
    !!user?.businessLicense && !!user?.CAC && !!user?.validIDcard;

  const { orderData, total, orderLoading, pagination, setPage, message } =
    useFetchAllOrders();

  const onBoarding = [
    {
      title: "Create account",
      current: data?.onboardingStatus?.create_Account,
      link: "",
    },
    {
      title: "Upload your documents",
      current: docState,
      link: "/settings/document",
    },
    {
      title: "Set up your payment",
      current: data?.onboardingStatus?.setup_Payment,
      link: "/settings/payment",
    },
    {
      title: "Add your products",
      current: data?.onboardingStatus?.add_Products,
      link: "",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full ">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="font-satoshi my-3 flex flex-col gap-y-2.5 md:gap-y-5">
      {/* User breadcrumb */}
      <div className="">
        <h4 className="text-sm sm:text-base font-satoshi text-[#837E8E]">
          Hello,
        </h4>
        <h3 className="font-bold text-2xl md:text-xl ">{user?.businessName}</h3>
      </div>
      {/* New user card */}

      {data?.onboardingPercentage !== 100 ? (
        <div className="bg-white rounded-xl p-5 md:p-10  w-full grid sm:grid-cols-2 border border-border-gray">
          <div className="inline-flex flex-col gap-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
              Get ready for your first sale
            </h2>
            <ul className="list-none">
              {onBoarding?.map((item) => (
                <li key={item.title} className="block py-1 md:py-2">
                  <Link to={item.link}>
                    <div className="inline-flex gap-1.5 md:gap-2.5 items-center">
                      <CheckCircle
                        className={`${
                          item?.current && "bg-[#F1ECF9] rounded-full"
                        }`}
                        size={24}
                        color={`${item?.current ? "#7046C6" : "#837E8E"}`}
                      />
                      <span className="text-[#1A191C] text-base md:text-lg font-medium">
                        {item?.title}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end items-center">
            <div className="inline-flex flex-col items-end space-y-4 w-full">
              <h3 className="text-primary text-5xl font-semibold">
                {data?.onboardingPercentage}%
              </h3>
              <Progress
                value={data?.onboardingPercentage}
                className="w-[25%] md:w-[20%] h-2"
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* summary card */}
      <div className="">
        <DashboardCards />
      </div>

      {/* Recent order logs */}
      <DataTable
        columns={ordersColumns}
        data={orderData}
        total={total}
        loading={orderLoading}
        pageIndex={pagination.page - 1}
        pageSize={pagination.limit}
        onPageChange={(index) => setPage(index + 1)}
        message={message}
      />
    </div>
  );
};

export default Dashboard;
