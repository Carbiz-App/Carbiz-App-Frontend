import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useDeleteProducts } from "@/queries/products";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, PenLine, Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router";

export type productsType = {
  productID: string;
  productName: string;
  price: string;
  productStock: number;
  productStatus: string;
};

export const productsColumn = ({
  refetch,
}: {
  refetch: () => void;
}): ColumnDef<productsType>[] => [
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
        Product
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
      const _status = status?.replaceAll("_", " ")?.toLocaleLowerCase();

      const statusColor = () => {
        switch (_status) {
          case "new arrival":
            return "bg-[#D1FADF] text-[#027A48]";
          case "used":
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
      const navigate = useNavigate();
      const { deleteProduct, loading } = useDeleteProducts(refetch);
      const handleDelete = async (productID: string) => {
        await deleteProduct({
          variables: { productID },
        });
      };
      return (
        <div className=" font-normal px-7 py-3.">
          <Button variant={"ghost"} className=" p-4 border-r rounded-none">
            <Eye className=" text-3xl size-5 text-[#4F4C55]" />
          </Button>

          <Button
            onClick={() => navigate(`/products/${id.productID}`)}
            variant={"ghost"}
            className=" p-4 border-r rounded-none"
          >
            <PenLine className=" text-3xl size-5 text-[#4F4C55]" />
          </Button>
          <Button
            disabled={loading}
            variant={"ghost"}
            className=" p-4 rounded-none"
            onClick={() => handleDelete(id.productID)}
          >
            {loading ? (
              "loading..."
            ) : (
              <Trash2Icon className=" text-3xl size-5 text-[#4F4C55]" />
            )}
          </Button>
        </div>
      );
    },
  },
];
