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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tableName?: string;
  isClickable?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  tableName,
  isClickable,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: { rowSelection, columnFilters },
  });

  const { pathname } = useLocation();
  const productsPath = pathname === "/products";
  const router = useNavigate();

  return (
    <div className="rounded-md border bg-white">
      <div
        className={` p-8 flex items-center gap-2.5 ${
          productsPath && "border-b"
        }`}
      >
        <h1 className="text-[##020202] font-bold text-xl mr-5">
          {tableName ? tableName : "Recent Orders"}
        </h1>
        <div className="flex items-center py-4 mr-1.5">
          <div className="inline-flex items-center">
            <SearchNormal color="#67667A" size={16} className="-mr-7" />
            <Input
              placeholder="Search here..."
              value={table.getState().globalFilter ?? ""}
              onChange={(event) => table.setGlobalFilter(event.target.value)}
              className="pl-8 min-w-md text-sm lg:text-base rounded-lg py-6 transition-all duration-300 focus:outline-0 focus-visible:ring-0 focus-visible:border-primary-dark placeholder:text-[#9C9BAB]"
            />
          </div>
        </div>
        <Button
          variant="outline"
          className="py-6 w-[8%] border-0 shadow text-[#807F94] text-[14px] font-[500]"
        >
          <FunnelSimple className="size-5" />
          Filter
        </Button>
        {productsPath && (
          <div className="flex items-center gap-4 ml-auto">
            <Button
              variant="outline"
              className="py-6  border-0 shadow text-[#807F94] text-[14px] font-[500]"
            >
              <LucideDownload className="size-5" />
              Export Data
            </Button>
            <Button
              onClick={() => router(`${pathname}/new`)} // Navigate to the new product page
              variant="default"
              className="py-6  border-0 shadow text-[14px] font-bold"
            >
              <Plus className="size-7" />
              New Product
            </Button>
          </div>
        )}
      </div>

      {productsPath && data.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] border border-[#B3B2AF] border-dashed m-4">
          <h3 className=" text-[#35322C] text-lg font-medium">
            No product has been added
          </h3>
          <p className="text-[14px] text-[#8E8B87] font-[400] mt-1">
            Your product journey begins here. Add your first product to get
            started.
          </p>
        </div>
      ) : (
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
              {table.getRowModel().rows?.length ? (
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
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Pagination table={table} />
        </>
      )}
    </div>
  );
}
