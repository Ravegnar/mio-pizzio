"use client";

import {
   ColumnDef,
   ColumnFiltersState,
   SortingState,
   VisibilityState,
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
} from "@tanstack/react-table";
import { ReactNode, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTablePagination } from "@/components/data-table/pagination";
import { DataTableToolbar } from "@/components/data-table/toolbar";
import { Skeleton } from "@ui/skeleton";
import type { Table as TableType } from "@tanstack/react-table";
import { TransformedPizzaFragment } from "@/types/pizza-types";
import { filterFields } from "./filter-fields";

const SKELETON_ROWS_COUNT = 10;

interface DataTableProps {
   actions?: ReactNode;
   className?: string;
   columns: ColumnDef<TransformedPizzaFragment>[];
   data: TransformedPizzaFragment[];
   isLoading: boolean;
}

export function DataTable({ actions, columns, data, isLoading }: DataTableProps) {
   const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
   const [sorting, setSorting] = useState<SortingState>([]);

   const table: TableType<TransformedPizzaFragment> = useReactTable<TransformedPizzaFragment>({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      onColumnFiltersChange: setColumnFilters,
      onColumnVisibilityChange: setColumnVisibility,
      onSortingChange: setSorting,
      state: {
         columnFilters,
         columnVisibility,
         sorting,
      },
   });

   return (
      <>
         <DataTableToolbar table={table} filterFields={filterFields}>
            {actions ?? null}
         </DataTableToolbar>
         <div className="rounded-md border my-3">
            <Table>
               <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                           return (
                              <TableHead key={header.id}>
                                 {header.isPlaceholder
                                    ? null
                                    : flexRender(header.column.columnDef.header, header.getContext())}
                              </TableHead>
                           );
                        })}
                     </TableRow>
                  ))}
               </TableHeader>
               <TableBody>
                  {isLoading ? (
                     [...new Array(SKELETON_ROWS_COUNT)].map((_, index) => (
                        <TableRow key={index}>
                           {columns.map((_, i) => (
                              <TableCell key={i}>
                                 <Skeleton className="h-5 w-full rounded" />
                              </TableCell>
                           ))}
                        </TableRow>
                     ))
                  ) : table.getRowModel().rows?.length ? (
                     table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
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
         </div>
         <DataTablePagination table={table} />
      </>
   );
}
