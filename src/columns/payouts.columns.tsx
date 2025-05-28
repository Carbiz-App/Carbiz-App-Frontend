import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export type payoutType = {
  customer: { name: string };
  createdAT: string;
  amount: string;
  status: string;
};

export const PayoutsColumn: ColumnDef<payoutType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className=" pl-1 sm:pl-3 md:pl-7">
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
      <div className=" pl-1 sm:pl-3 md:pl-7">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "customer",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] p-2  sm:px-3 md:py-3.5  !border-none">
        Recepient
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal p-2  md:py-2.5 uppercase">
          {row.getValue("name")}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAT",
    header: () => (
      <div className=" text-base font-[500] text-black bg-[#FAFAFB] p-2  sm:px-3 md:py-3.5 border-none">
        Date
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal p-2  md:py-2.5">
          {row.getValue("createdAT")}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] p-2  sm:px-3 md:py-3.5">
        Amount
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal p-2  md:py-2.5">
          {row.getValue("amount")}
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] p-2  sm:px-3 md:py-3.5">
        Payment Status
      </div>
    ),
    cell: ({ row }) => {
      const status: string | undefined = row.getValue("status");
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
          <span className={`px-3 py-1 rounded-2xl capitalize ${statusColor()}`}>
            {row.getValue("status")}
          </span>
        </div>
      );
    },
  },
];
