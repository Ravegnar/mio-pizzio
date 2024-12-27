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
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@ui/dropdown-menu";
import { ReactNode, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@ui/button";
import { DataTablePagination } from "@ui/data-table-pagination";
import { Input } from "@ui/input";
import { Skeleton } from "@ui/skeleton";
import { cn } from "@/utils/cn";

const SKELETON_ROWS_COUNT = 10;

interface DataTableProps<TData, TValue> {
   actions?: ReactNode;
   className?: string;
   columns: ColumnDef<TData, TValue>[];
   data: TData[];
   filterByKey: Extract<keyof TData, string>;
   filterPlaceholder?: string;
   isLoading: boolean;
}

export function DataTable<TData, TValue>({
   actions,
   className,
   columns,
   data,
   filterByKey,
   filterPlaceholder,
   isLoading,
}: DataTableProps<TData, TValue>) {
   const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
   const [sorting, setSorting] = useState<SortingState>([]);

   const table = useReactTable({
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
         <div className={cn("flex gap-3", className)}>
            <Input
               className="max-w-sm h-8"
               onChange={(event) => table.getColumn(filterByKey)?.setFilterValue(event.target.value)}
               placeholder={filterPlaceholder ?? "Filter..."}
               type="search"
               value={(table.getColumn(filterByKey)?.getFilterValue() as string) ?? ""}
            />
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline" className="ml-auto">
                     Columns
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
                  {table
                     .getAllColumns()
                     .filter((column) => column.getCanHide())
                     .map((column) => {
                        return (
                           <DropdownMenuCheckboxItem
                              key={column.id}
                              className="capitalize"
                              checked={column.getIsVisible()}
                              onCheckedChange={(value) => column.toggleVisibility(!!value)}
                           >
                              {column.id}
                           </DropdownMenuCheckboxItem>
                        );
                     })}
               </DropdownMenuContent>
            </DropdownMenu>
            {actions ?? null}
         </div>
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
