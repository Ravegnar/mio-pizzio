"use client";

import { HTMLAttributes, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { DataTableFacetedFilter } from "@/components/data-table/faceted-filter";
import type { DataTableFilterField } from "@/types/data-table-filter-field";
import { DataTableViewOptions } from "@/components/data-table/view-options";
import { Input } from "@/components/ui/input";
import type { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataTableToolbarProps<TData> extends HTMLAttributes<HTMLDivElement> {
   table: Table<TData>;
   filterFields?: DataTableFilterField<TData>[];
}

export function DataTableToolbar<TData>({
   table,
   filterFields = [],
   children,
   className,
   ...props
}: DataTableToolbarProps<TData>) {
   const isFiltered = table.getState().columnFilters.length > 0;

   // Memoize computation of searchableColumns and filterableColumns
   const { searchableColumns, filterableColumns } = useMemo(() => {
      return {
         searchableColumns: filterFields.filter((field) => !field.options),
         filterableColumns: filterFields.filter((field) => field.options),
      };
   }, [filterFields]);

   return (
      <div className={cn("flex w-full items-center justify-between gap-2 overflow-auto p-1", className)} {...props}>
         <div className="flex flex-1 items-center gap-2">
            {searchableColumns.length > 0 &&
               searchableColumns.map(
                  (column) =>
                     table.getColumn(column.id ? String(column.id) : "") && (
                        <Input
                           key={String(column.id)}
                           placeholder={column.placeholder}
                           value={(table.getColumn(String(column.id))?.getFilterValue() as string) ?? ""}
                           onChange={(event) => table.getColumn(String(column.id))?.setFilterValue(event.target.value)}
                           className="h-8 w-40 lg:w-64"
                        />
                     ),
               )}
            {filterableColumns.length > 0 &&
               filterableColumns.map(
                  (column) =>
                     table.getColumn(column.id ? String(column.id) : "") && (
                        <DataTableFacetedFilter
                           key={String(column.id)}
                           column={table.getColumn(column.id ? String(column.id) : "")}
                           title={column.label}
                           options={column.options ?? []}
                        />
                     ),
               )}
            {isFiltered && (
               <Button
                  aria-label="Reset filters"
                  variant="ghost"
                  className="h-8 px-2 lg:px-3"
                  onClick={() => table.resetColumnFilters()}
               >
                  Reset
                  <X className="ml-2 size-4" aria-hidden="true" />
               </Button>
            )}
         </div>
         <div className="flex items-center gap-2">
            {children}
            <DataTableViewOptions table={table} />
         </div>
      </div>
   );
}
