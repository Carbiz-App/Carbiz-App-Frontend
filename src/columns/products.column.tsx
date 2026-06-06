import { ProductAction } from "@/components/templates/app/products/productAction";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export type productsType = {
  productID: string;
  productName: string;
  price: string;
  productStock: number;
  productStatus: string;
  createdAt: Date | string;
  archivedAt?: string | null;
  isArchived?: boolean;
  priceCurrencyType: string;
  productCategory: {
    productCategoryName: string;
  };
  discountPercentage: number;
};

type ProductsColumnOptions = {
  variant?: "active" | "archived";
};

const statusBadge = (status: string | undefined) => {
  const _status = status?.replaceAll("_", " ")?.toLowerCase();

  const statusColor = () => {
    switch (_status) {
      case "new arrival":
        return "bg-[#D1FADF] text-[#027A48]";
      case "out of stock":
        return "bg-[#FEE4E2] text-[#B42318]";
      case "available":
        return "bg-[#87CEEB]/50 text-[#87CEEB]";
      default:
        return null;
    }
  };

  return (
    <Badge className={`px-2 py-1 rounded-sm ${statusColor()} uppercase`}>
      {_status}
    </Badge>
  );
};

export const productsColumn = ({
  variant = "active",
}: ProductsColumnOptions = {}): ColumnDef<productsType>[] => {
  const dateColumn: ColumnDef<productsType> =
    variant === "archived"
      ? {
          accessorKey: "archivedAt",
          header: () => (
            <div className=" text-base font-[500] text-black bg-[#FAFAFB]     border-none">
              Archived at
            </div>
          ),
          cell: ({ row }) => {
            const archivedAt = row.getValue("archivedAt") as string | null;
            return (
              <div className=" font-normal   ">
                {archivedAt
                  ? moment(archivedAt).format("DD MMM, YYYY hh:mm A")
                  : "—"}
              </div>
            );
          },
        }
      : {
          accessorKey: "createdAt",
          header: () => (
            <div className=" text-base font-[500] text-black bg-[#FAFAFB]     border-none">
              Created
            </div>
          ),
          cell: ({ row }) => {
            return (
              <div className=" font-normal   ">
                {moment(row.getValue("createdAt")).format(
                  "DD MMM, YYYY hh:mm A",
                )}
              </div>
            );
          },
        };

  return [
    {
      id: "index",
      header: () => (
        <div className="text-base font-[500] text-black bg-[#FAFAFB] pl-3">
          #
        </div>
      ),
      cell: ({ row }) => <div className="pl-3 font-normal">{row.index + 1}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    dateColumn,
    {
      accessorKey: "productName",
      header: () => (
        <div className=" text-base font-[500] text-black !bg-[#FAFAFB]     !border-none">
          Product Name
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className=" font-normal capitalize max-w-sm text-wrap">
            {row.getValue("productName")}
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: () => (
        <div className=" text-base font-[500] text-black bg-[#FAFAFB] p-2 border-none">
          Price
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className=" font-normal p-2  md:py-2.5">
            {formatCurrency(
              row?.original?.price,
              row.original?.priceCurrencyType,
            )}
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
      accessorKey: "category",
      header: () => (
        <div className=" text-base  font-[500] text-black bg-[#FAFAFB] p-2  sm:px-3 md:py-3.5">
          Product Category
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className=" font-normal p-2  md:py-2.5">
            {row?.original?.productCategory?.productCategoryName}
          </div>
        );
      },
    },
    {
      accessorKey: "discount",
      header: () => (
        <div className=" text-base  font-[500] text-black bg-[#FAFAFB] p-2  sm:px-3 md:py-3.5">
          Discount (%)
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className=" font-normal p-2  md:py-2.5">
            {row?.original?.discountPercentage}
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
        return (
          <div className={` font-normal p-2  md:py-2.5 `}>
            {statusBadge(status)}
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
      cell: ({ row }) => (
        <ProductAction
          variant={variant}
          productID={row.original.productID}
          productName={row.original.productName}
        />
      ),
    },
  ];
};

const CURRENCY_LOCALE_MAP: Record<string, string> = {
  NGR: "en-NG",
  USD: "en-US",
  GBP: "en-GB",
  CAD: "en-CA",
  RMB: "zh-CN",
};

export const formatCurrency = (
  amount: number | string,
  currencyType: string,
) => {
  const numericAmount =
    typeof amount === "string" ? parseFloat(amount) : amount;

  const locale = CURRENCY_LOCALE_MAP[currencyType] || "en-US";
  const currencyCode = currencyType === "NGR" ? "NGN" : currencyType;

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
    }).format(numericAmount || 0);
  } catch (error) {
    console.error("Formatting error:", error);
    return `${currencyCode} ${numericAmount}`;
  }
};
