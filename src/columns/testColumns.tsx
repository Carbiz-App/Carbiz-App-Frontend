import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
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

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "product",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] px-7 py-3.5  !border-none">
        Product
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal px-7 py-3.5 uppercase">
          {row.getValue("product")}
        </div>
      );
    },
  },
  {
    accessorKey: "created",
    header: () => (
      <div className=" text-base font-[500] text-black bg-[#FAFAFB] px-7 py-3.5 border-none">
        Created
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal px-7 py-3.">{row.getValue("created")}</div>
      );
    },
  },
  {
    accessorKey: "orderId",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] px-7 py-3.5">
        Order ID
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal px-7 py-3.">{row.getValue("orderId")}</div>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] px-7 py-3.5">
        Payment Status
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
        <div className={` font-normal px-7 py-3.5 `}>
          <span className={`px-3 py-1 rounded-2xl ${statusColor()} capitalize`}>
            {row.getValue("paymentStatus")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "deliveryStatus",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] px-7 py-3.5">
        Delivery Status
      </div>
    ),
    cell: ({ row }) => {
      const status: string | undefined = row.getValue("deliveryStatus");
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
        <div className={` font-normal px-7 py-3.5 `}>
          <span className={`px-3 py-1 rounded-2xl ${statusColor()} capitalize`}>
            {row.getValue("deliveryStatus")}
          </span>
        </div>
      );
    },
  },
  {
    id: "action",
    cell: ({ row }) => {
      const id = row.original;
      return (
        <div className=" font-normal px-7 py-3.">
          <Button variant={"ghost"}>
            <Eye className=" text-3xl size-5 text-[#4F4C55]" />
          </Button>
        </div>
      );
    },
  },
];
