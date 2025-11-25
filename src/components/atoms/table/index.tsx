import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FunnelSimple } from "@phosphor-icons/react";
import React from "react";
import { Input } from "@/components/ui/input";
import { Pagination } from "./pagination";
import { SearchNormal } from "iconsax-reactjs";
import { useLocation, useNavigate } from "react-router";
import { LucideDownload, Plus } from "lucide-react";
import { useModal } from "@/store/useModal";
import { Spinner } from "@/components/ui/spinner";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tableName?: string;
  isClickable?: boolean;
  loading: boolean;
  total: number;
  pageIndex: number;
  pageSize: number;
  onPageChange: (pageIndex: number) => void;
  message?: string;
  payment?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  tableName,
  isClickable,
  loading,
  total,
  pageIndex,
  pageSize,
  onPageChange,
  message,
  payment,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const { openModal } = useModal();
  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(total / pageSize),
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination: { pageIndex, pageSize },
      rowSelection,
      columnFilters,
    },
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      onPageChange(newState.pageIndex);
    },
  });

  const { pathname } = useLocation();
  const productsPath = pathname === "/products";
  const router = useNavigate();

  return (
    <div className="rounded-md border bg-white ">
      <div
        className={` p-4 md:p-8 flex flex-wrap items-center gap-4 sm:gap-4 md:gap-8 lg:gap-12 ${
          payment ? "justify-between" : ""
        }   ${productsPath && "border-b"}`}
      >
        <h1 className="text-[#020202] font-bold text-xl ">
          {tableName ? tableName : "Recent Orders"}
        </h1>
        <div className="flex items-center  gap-4">
          <div className="inline-flex items-center relative">
            <SearchNormal
              color="#67667A"
              size={16}
              className="absolute left-2"
            />
            <Input
              placeholder="Search here..."
              value={table.getState().globalFilter ?? ""}
              onChange={(event) => table.setGlobalFilter(event.target.value)}
              className="pl-8 md:min-w-sm lg:min-w-sm text-sm lg:text-base rounded-lg  md:py-6 transition-all duration-300 focus:outline-0 focus-visible:ring-0 focus-visible:border-primary-dark placeholder:text-[#9C9BAB]"
            />
          </div>
          <Button
            variant="outline"
            className="md:py-6  border-0 shadow text-[#807F94] text-xs sm:text-sm md:text-[14px] font-[500]"
          >
            <FunnelSimple className="size-5" />
            Filter
          </Button>
        </div>

        {productsPath && (
          <div className="flex items-center gap-4 lg:ml-auto">
            <Button
              variant="outline"
              className="md:py-6  border-0 shadow text-[#807F94] text-xs sm:text-sm md:text-[14px] font-[500]"
            >
              <LucideDownload className="size-3 md:size-5" />
              Export Data
            </Button>
            <Button
              onClick={() => router(`${pathname}/new`)} // Navigate to the new product page
              variant="default"
              className="md:py-6  border-0 shadow text-sm sm:text-sm md:text-[14px] font-bold"
            >
              <Plus className="size-4 md:size-7" />
              New Product
            </Button>
          </div>
        )}
        {payment && (
          <Button
            onClick={() => openModal()}
            variant="default"
            className="md:py-6  border-0 shadow text-sm sm:text-sm md:text-[14px] font-bold "
          >
            <Plus className="size-4 md:size-7" />
            Add Bank
          </Button>
        )}
      </div>

      {
        <>
          <Table>
            <TableHeader className="">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-[#FAFAFB]">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <div className="flex justify-center items-center py-12 w-full">
                      <Spinner className="text-primary size-12" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() =>
                      isClickable && router(`${pathname}/${row?.id}`)
                    }
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                (productsPath && data.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={columns.length}>
                      <div className="flex flex-col items-center justify-center h-[20vh] border border-[#B3B2AF] border-dashed m-2 p-2">
                        <h3 className=" text-[#35322C] text-lg font-medium text-center">
                          No product has been added
                        </h3>
                        <p className="text-[14px] text-[#8E8B87] font-[400] mt-1 text-center">
                          Your product journey begins here. Add your first
                          product to get started.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )) || (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center capitalize pb-0"
                    >
                      {message ?? "no data found"}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
          <Pagination table={table} />
        </>
      }
    </div>
  );
}
