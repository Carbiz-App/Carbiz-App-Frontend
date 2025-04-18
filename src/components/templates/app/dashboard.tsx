import { CheckCircle } from "@phosphor-icons/react";
import { Progress } from "@/components/ui/progress";
import Analytics from "@/components/atoms/analytics";
import { columns } from "@/columns/columns";
import { DataTable } from "@/components/atoms/table";

import { newUserChecklist, dashboardAnalytics } from "@/assets/data/index.json";
import { MoneySend, ArrowSwapHorizontal, People } from "iconsax-reactjs";

const analyticIcon = {
  product: ArrowSwapHorizontal,
  revenue: MoneySend,
  customer: People,
};

export type Payment = {
  id: number;
  product: string;
  created: string;
  orderId: string;
  paymentStatus: "paid" | "cancelled" | "refunded";
  deliveryStatus:
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "awaiting";
};

export const payments: Payment[] = [
  {
    id: 1,
    product: "728ed52f",
    created: "2023-10-01",
    orderId: "1234567890",
    paymentStatus: "paid",
    deliveryStatus: "processing",
  },
  {
    id: 2,
    product: "728ed52f",
    created: "2023-10-02",
    orderId: "13332",
    paymentStatus: "cancelled",
    deliveryStatus: "awaiting",
  },
];

const Dashboard = () => {
  return (
    <div className="font-satoshi">
      {/* User breadcrumb */}
      <div className="mb-8">
        <h4 className="text-sm sm:text-base font-satoshi text-[#837E8E]">
          Hello,
        </h4>
        <h3 className="font-bold text-xl ">Golden Engine Store</h3>
      </div>
      {/* New user card */}
      <div className="bg-white rounded-xl p-10  w-full grid sm:grid-cols-2">
        <div className="inline-flex flex-col gap-6">
          <h2 className="text-2xl font-bold">Get ready for your first sale</h2>
          <ul className="list-none">
            {newUserChecklist?.map(
              (item: { title: string; current: boolean }) => (
                <li key={item.title} className="block py-2">
                  <div className="inline-flex gap-2.5">
                    <CheckCircle
                      className={`${
                        item?.current && "bg-[#F1ECF9] rounded-full"
                      }`}
                      size={24}
                      color={`${item?.current ? "#7046C6" : "#837E8E"}`}
                    />
                    <span className="text-[#1A191C] text-lg font-medium">
                      {item?.title}
                    </span>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>

        <div className="flex justify-end items-center">
          <div className="inline-flex flex-col items-end space-y-4 w-full">
            <h3 className="text-primary text-5xl font-semibold">25%</h3>
            <Progress value={24} className="w-[20%] h-1" />
          </div>
        </div>
      </div>
      {/* summary card */}
      <div className="py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardAnalytics.map(({ title, value, name, color }) => (
            <Analytics
              key={name}
              title={title}
              value={value}
              iconColor={color}
              icon={analyticIcon[name]}
              isCurrency={name == "revenue"}
            />
          ))}
        </div>
      </div>

      {/* Recent order logs */}
      <DataTable columns={columns} data={payments} />
    </div>
  );
};

export default Dashboard;
