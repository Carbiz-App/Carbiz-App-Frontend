import { Button } from "@/components/ui/button";
import { ArrowLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router";

type details = {
  title: string;
  value: string;
};

const orderDetails: details[] = [
  {
    title: "Order ID",
    value: "23RT56789",
  },
  {
    title: "Created",
    value: "2023-10-01",
  },
  {
    title: "Payment Status",
    value: "Paid",
  },
  {
    title: "Delivery Status",
    value: "Processing",
  },
  {
    title: "Customer",
    value: "Elizabeth Ali",
  },
  {
    title: "Phone",
    value: "+23479895045",
  },
  {
    title: "Email",
    value: "elizabethali@gmail.com",
  },
  {
    title: "Payment Channel",
    value: "Bank Transfer",
  },
  {
    title: "Transaction ID",
    value: "83905-48484494",
  },
];

const itemDetails: details[] = [
  { title: "Item", value: "Engine Oil" },
  { title: "Quantity", value: "2" },
  { title: "Price", value: "N20,000" },
  { title: "Total", value: "N40,000" },
];

const PreviewOrder = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        onClick={() => navigate(-1)}
        variant={"ghost"}
        className=" text-[#696572] hover:text-primary text-base font-[500]flex items-center gap-2 mb-10"
      >
        {" "}
        <ArrowLeft className=" size-6 font-bold" />
        Order Details
      </Button>
      <div className="flex flex-col gap-6">
        <div className=" p-10 rounded-xl  border gap-y-14  flex flex-wrap gap-5">
          {orderDetails.map(({ title, value }, idx) => (
            <CardDetail
              key={idx}
              title={title}
              value={value}
              isLast={idx === orderDetails.length - 1}
            />
          ))}
        </div>
        <div className=" p-10 rounded-xl  border flex flex-col gap-6">
          <h3 className="text-base font-black">Order Item</h3>
          <div className="flex gap-6 items-center">
            <div className="size-16 rounded-xl bg-primary">
              <img src="" alt="" className=" object-cover " />
            </div>
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
      </div>
    </div>
  );
};

export default PreviewOrder;

type CardDetailProps = details & { isLast?: boolean };

const CardDetail = ({ title, value, isLast }: CardDetailProps) => {
  return (
    <div
      className={` w-max min-w-42 flex flex-col gap-1 pr-14  ${
        isLast ? "" : "border-r "
      } border-[#E6E5E8]`}
    >
      <p className=" text-[#837E8E] text-sm">{title}</p>
      <p className=" text-base font-black">{value}</p>
    </div>
  );
};
