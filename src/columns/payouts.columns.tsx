import { Badge } from "@/components/ui/badge";
import { PayoutOutput } from "@/types/payoutOutput";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export const PayoutsColumn: ColumnDef<PayoutOutput>[] = [
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
    accessorKey: "payoutID",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Payout ID
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal py-3.5 uppercase">
          {row?.original?.payoutID}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Created Date
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal py-3.5 capitalize">
          {moment(row?.original?.createdAt).format("DD/MM/YYYY") !==
          "Invalid date"
            ? moment(row?.original?.createdAt).format("DD/MM/YYYY")
            : "~~~~"}
        </div>
      );
    },
  },
  {
    accessorKey: "username",
    header: () => (
      <div className=" text-base font-[500] text-black bg-[#FAFAFB] px-7 py-3.5 border-none">
        User Name
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal px-7 py-3.5">
          {row?.original?.merchant?.businessName ||
            `${row?.original?.rider?.firstName} ${row?.original?.rider?.lastName}`}
        </div>
      );
    },
  },
  {
    accessorKey: "usertype",
    header: () => (
      <div className=" text-base font-[500] text-black bg-[#FAFAFB] px-7 py-3.5 border-none">
        User Type
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal px-7 py-3.5">
          {row?.original?.merchant !== null ? "Merchant" : "Rider"}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] px-7 py-3.5">
        Amount
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal px-7 py-3.">
          ₦{row.original?.netPayout}
        </div>
      );
    },
  },
  {
    accessorKey: "method",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] px-7 py-3.5">
        Payout Method
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal px-7 py-3.">
          {row.original?.paymentMethod ?? "~~~~"}
        </div>
      );
    },
  },

  {
    accessorKey: "date",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Payment Date
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal py-3.5 capitalize">
          {moment(row?.original?.payoutAt).format("DD/MM/YYYY") !==
          "Invalid date"
            ? moment(row?.original?.payoutAt).format("DD/MM/YYYY")
            : "~~~~"}
        </div>
      );
    },
  },

  {
    accessorKey: "paymentStatus",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB]">
        Payment Status
      </div>
    ),
    cell: ({ row }) => {
      const status: string | undefined = row.getValue("paymentStatus");
      const statusColor = () => {
        switch (status?.toLocaleLowerCase()) {
          case "successful":
            return "bg-[#F6FAF7] text-[#027A48]";
          case "processing":
            return "bg-[#FAF3FE] text-[#7046C6]";
          case "pending":
            return "text-[#96650D] bg-[#FFFBF3]";
          case "failed":
            return "text-[#B42318] bg-[#FEE4E2]";
          default:
            return null;
        }
      };
      return (
        <div>
          {row?.original?.paymentStatus && (
            <div>
              <Badge
                className={`px-2 py-1 rounded-sm text-sm  font-normal uppercase ${statusColor()}`}
              >
                {row?.original?.paymentStatus}
              </Badge>
            </div>
          )}
        </div>
      );
    },
  },
];
