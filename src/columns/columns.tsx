import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router";

export type Order = {
  items: { product: { productName: string } };
  createdAT: string;
  orderID: string;
  paymentStatus: string;
  orderStatus: string;
};

export const ordersColumns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className=" pl-3 md:pl-7">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className=""
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className=" pl-3 md:pl-7">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "items",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Product
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal py-3.5 uppercase">
          {row.getValue("items")}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAT",
    header: () => (
      <div className=" text-base font-[500] text-black bg-[#FAFAFB] px-7 py-3.5 border-none">
        Created
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal px-7 py-3.">
          {row.getValue("createdAT")}
        </div>
      );
    },
  },
  {
    accessorKey: "orderID",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] px-7 py-3.5">
        Order ID
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal px-7 py-3.">{row.getValue("orderID")}</div>
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
    accessorKey: "orderStatus",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] px-7 py-3.5">
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
        <div className={` font-normal px-7 py-3.5 `}>
          <span className={`px-3 py-1 rounded-2xl ${statusColor()} capitalize`}>
            {row.getValue("orderStatus")}
          </span>
        </div>
      );
    },
  },
  {
    id: "action",
    cell: ({ row }) => {
      const id = row.original;
      const navigate = useNavigate();
      return (
        <div className=" font-normal px-7 py-3.">
          <Button
            variant={"ghost"}
            onClick={() => navigate(`/orders/${id.orderID}`)}
          >
            <Eye className=" text-3xl size-5 text-[#4F4C55]" />
          </Button>
        </div>
      );
    },
  },
];
