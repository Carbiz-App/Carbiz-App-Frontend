import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useDeleteProducts } from "@/queries/products";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, PenLine, Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router";

export type paymentType = {
  bankID: string;
  accountName: string;
  accountNumber: string;
  bankName: number;
  createdAT: string;
};

export const paymentColumn = ({
  refetch,
}: {
  refetch: () => void;
}): ColumnDef<paymentType>[] => [
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
    accessorKey: "bankID",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Bank ID
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal py-3.5 capitalize">
          {row.getValue("bankID")}
        </div>
      );
    },
  },
  {
    accessorKey: "accountName",
    header: () => (
      <div className=" text-base font-[500] text-black bg-[#FAFAFB] px-7 py-3.5 border-none">
        Account Name
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal px-7 py-3.">
          {row.getValue("accountName")}
        </div>
      );
    },
  },
  {
    accessorKey: "accountNumber",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] px-7 py-3.5">
        Account Number
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal px-7 py-3.">
          {row.getValue("accountNumber")}
        </div>
      );
    },
  },
  {
    accessorKey: "bankName",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] px-7 py-3.5">
        Bank Name
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal px-7 py-3.">
          {row.getValue("bankName")}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAT",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] px-7 py-3.5">
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
    id: "action",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] px-7 py-3.5"></div>
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
            onClick={() => navigate(`/products/${id.bankID}`)}
            variant={"ghost"}
            className=" p-4 border-r rounded-none"
          >
            <PenLine className=" text-3xl size-5 text-[#4F4C55]" />
          </Button>
          <Button
            disabled={loading}
            variant={"ghost"}
            className=" p-4 rounded-none"
            onClick={() => handleDelete(id.bankID)}
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
