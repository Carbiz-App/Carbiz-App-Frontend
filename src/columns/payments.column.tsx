import Loader from "@/components/atoms/loader";
import { Button } from "@/components/ui/button";
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
    accessorKey: "accountName",
    header: () => (
      <div className=" text-base font-[500] text-black bg-[#FAFAFB] p-2  sm:px-3 md:py-3.5 border-none">
        Account Name
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal p-2  md:py-2.5">
          {row.getValue("accountName")}
        </div>
      );
    },
  },
  {
    accessorKey: "accountNumber",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] p-2 md:px-7 sm:px-3 md:py-3.5">
        Account Number
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal p-2 md:px-7 md:py-2.5">
          {row.getValue("accountNumber")}
        </div>
      );
    },
  },
  {
    accessorKey: "bankName",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] p-2 md:px-7 sm:px-3 md:py-3.5">
        Bank Name
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal p-2 md:px-7 md:py-2.5">
          {row.getValue("bankName")}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAT",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] ">
        Created
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal ">
          {moment(row.getValue("createdAT")).format("DD-MM-YYYY")}
        </div>
      );
    },
  },

  {
    id: "action",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] "></div>
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
        openModal({ data: bankID });
      };

      return (
        <div className=" font-normal">
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
              <Loader />
            ) : (
              <Trash2Icon className=" text-3xl size-5 text-[#4F4C55]" />
            )}
          </Button>
        </div>
      );
    },
  },
];
