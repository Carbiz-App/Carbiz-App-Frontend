import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useDeleteBank } from "@/queries/payment";
import { useModal } from "@/store/useModal";
import { ColumnDef } from "@tanstack/react-table";
import { PenLine, Trash2Icon } from "lucide-react";
import moment from "moment";

export type paymentType = {
  bankID: string;
  accountName: string;
  accountNumber: string;
  bankName: number;
  createdAT: string;
};

export const paymentColumn = (): ColumnDef<paymentType>[] => [
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
          {moment(row.getValue("createdAT")).format("DD-MM-YYYY")}
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
      const { openModal } = useModal();
      const { deleteBank, loading } = useDeleteBank();
      const handleDelete = async (bankID: string) => {
        await deleteBank({
          variables: { bankID },
        });
      };

      const handleEdit = (bankID: string) => {
        openModal(bankID);
      };

      return (
        <div className=" font-normal px-7 py-3.">
          <Button
            onClick={() => handleEdit(id.bankID)}
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
