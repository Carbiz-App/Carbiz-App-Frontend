import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, PenLine, Trash2Icon } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type productsType = {
  product: string;
  price: string;
  quantity: number;
  status: string;
};

export const productsColumn: ColumnDef<productsType>[] = [
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
    enableHiding: true,
  },
  {
    accessorKey: "product",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Product
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal py-3.5 capitalize">
          {row.getValue("product")}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => (
      <div className=" text-base font-[500] text-black bg-[#FAFAFB] px-7 py-3.5 border-none">
        Price
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal px-7 py-3.">{row.getValue("price")}</div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] px-7 py-3.5">
        Quantity
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal px-7 py-3.">
          {row.getValue("quantity")}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] px-7 py-3.5">
        Status
      </div>
    ),
    cell: ({ row }) => {
      const status: string | undefined = row.getValue("status");
      const statusColor = () => {
        switch (status?.toLocaleLowerCase()) {
          case "available":
            return "bg-[#D1FADF] text-[#027A48]";
          case "out of stock":
            return "bg-[#FEE4E2] text-[#B42318]";
          default:
            return null;
        }
      };
      return (
        <div className={` font-normal px-7 py-3.5 `}>
          <span className={`px-3 py-1 rounded-2xl ${statusColor()} capitalize`}>
            {row.getValue("status")}
          </span>
        </div>
      );
    },
  },
  {
    id: "action",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] px-7 py-3.5">
        Action
      </div>
    ),
    cell: ({ row }) => {
      const id = row.original;
      console.log(id);
      return (
        <div className=" font-normal px-7 py-3.">
          <Button variant={"ghost"} className=" p-4 border-r rounded-none">
            <Eye className=" text-3xl size-5 text-[#4F4C55]" />
          </Button>

          <Button variant={"ghost"} className=" p-4 border-r rounded-none">
            <PenLine className=" text-3xl size-5 text-[#4F4C55]" />
          </Button>
          <Button variant={"ghost"} className=" p-4 rounded-none">
            <Trash2Icon className=" text-3xl size-5 text-[#4F4C55]" />
          </Button>
        </div>
      );
    },
  },
];
