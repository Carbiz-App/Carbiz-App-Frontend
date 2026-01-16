
import { ColumnDef } from "@tanstack/react-table";

export type customerOrder = {
  items: { product: { productName: string; createdAt: string } };
  orderID: string;
  paymentStatus: string;
  orderStatus: string;
};

export const customerOrder: ColumnDef<customerOrder>[] = [
  {
    id: "index",
    header: () => (
      <div className="text-base font-[500] text-black bg-[#FAFAFB] py-3 pl-3">
        #
      </div>
    ),
    cell: ({ row }) => <div className="pl-3 font-normal">{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "items",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] p-2  sm:px-3 md:py-3.5  !border-none">
        Product
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal p-2  md:py-2.5 uppercase">
          {row.getValue("productName")}
        </div>
      );
    },
  },
  {
    accessorKey: "items",
    header: () => (
      <div className=" text-base font-[500] text-black bg-[#FAFAFB] p-2  sm:px-3 md:py-3.5 border-none">
        Created
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal p-2  md:py-2.5">
          {row.getValue("createdAt")}
        </div>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] p-2  sm:px-3 md:py-3.5">
        Status
      </div>
    ),
    cell: ({ row }) => {
      const status: string | undefined = row.getValue("paymentStatus");
      const statusColor = () => {
        switch (status?.toLocaleLowerCase()) {
          case "paid":
            return "bg-[#D1FADF] text-[#027A48]";
          case "cancelled":
            return "bg-[#FEE4E2] text-[#B42318]";
          case "refunded":
            return "text-[#DC6803] bg-[#FFF7E1]";
          default:
            return null;
        }
      };
      return (
        <div className={` font-normal p-2  md:py-2.5 `}>
          <span className={`px-3 py-1 rounded-2xl ${statusColor()} capitalize`}>
            {row.getValue("paymentStatus")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "orderID",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] p-2  sm:px-3 md:py-3.5">
        Order ID
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal p-2  md:py-2.5">
          {row.getValue("orderID")}
        </div>
      );
    },
  },
  {
    accessorKey: "orderStatus",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] p-2  sm:px-3 md:py-3.5">
        Delivery Status
      </div>
    ),
    cell: ({ row }) => {
      const status: string | undefined = row.getValue("orderStatus");
      const statusColor = () => {
        switch (status?.toLocaleLowerCase()) {
          case "processing":
            return "bg-[#E2DAF4] text-[#7046C6]";
          case "shipped":
            return "bg-[#FFF7E1] text-[#DC6803]";
          case "canceled":
            return "text-[#B42318] bg-[#FEE4E2]";
          case "delivered":
            return "text-[#027A48] bg-[#D1FADF]";
          case "awaiting":
            return "text-[#343239] bg-[#E6E5E8]";
          default:
            return null;
        }
      };
      return (
        <div className={` font-normal p-2  md:py-2.5 `}>
          <span className={`px-3 py-1 rounded-2xl ${statusColor()} capitalize`}>
            {row.getValue("orderStatus")}
          </span>
        </div>
      );
    },
  },
];
