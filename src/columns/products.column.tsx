import { ProductAction } from "@/components/templates/app/products/productAction";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export type productsType = {
  productID: string;
  productName: string;
  price: string;
  productStock: number;
  productStatus: string;
};

export const productsColumn = (): ColumnDef<productsType>[] => [
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
    accessorKey: "productName",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] p-2  sm:px-3 md:py-3.5  !border-none">
        Product Name
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal p-2  md:py-2.5 capitalize">
          {row.getValue("productName")}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => (
      <div className=" text-base font-[500] text-black bg-[#FAFAFB] p-2  sm:px-3 md:py-3.5 border-none">
        Price
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal p-2  md:py-2.5">
          {row.getValue("price")}
        </div>
      );
    },
  },
  {
    accessorKey: "productStock",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] p-2  sm:px-3 md:py-3.5">
        Quantity
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal p-2  md:py-2.5">
          {row.getValue("productStock")}
        </div>
      );
    },
  },
  {
    accessorKey: "productStatus",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] p-2  sm:px-3 md:py-3.5">
        Status
      </div>
    ),
    cell: ({ row }) => {
      const status: string | undefined = row.getValue("productStatus");
      const _status = status?.replaceAll("_", " ")?.toLowerCase();

      const statusColor = () => {
        switch (_status) {
          case "new arrival":
            return "bg-[#D1FADF] text-[#027A48]";
          case "out of stock":
            return "bg-[#FEE4E2] text-[#B42318]";
          default:
            return null;
        }
      };
      return (
        <div className={` font-normal p-2  md:py-2.5 `}>
          <span className={`px-3 py-1 rounded-2xl ${statusColor()} capitalize`}>
            {_status}
          </span>
        </div>
      );
    },
  },
  {
    id: "action",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] p-2  sm:px-3 md:py-3.5">
        Action
      </div>
    ),
    cell: ({ row }) => {
      const id = row.original;
      return <ProductAction id={id?.productID} />;
    },
  },
];
