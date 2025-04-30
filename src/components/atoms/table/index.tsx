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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tableName?: string;
  isClickable?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  tableName,
  isClickable
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

  const {pathname} = useLocation()
  const router = useNavigate()

  return (
    <div className="rounded-md border bg-white">
      <div className=" p-8 flex items-center gap-2.5">
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
        <Button variant="outline" className="py-6 w-[8%] border-0 shadow">
          <FunnelSimple />
          Filter
        </Button>
      </div>
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
                onClick={() => isClickable && router(`${pathname}/${row?.id}`)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination table={table} />
    </div>
  );
}
