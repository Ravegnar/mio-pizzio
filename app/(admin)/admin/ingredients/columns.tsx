"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@ui/dialog";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import { Button } from "@ui/button";
import { Checkbox } from "@ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { FlashMessageType } from "@/constants/message-codes";
import { Ingredient } from "@prisma/client";
import { IngredientForm } from "@/components/form/ingredient-form";
import { MoreHorizontal } from "lucide-react";
import { SheetDescription } from "@ui/sheet";
import { deleteFetcher } from "@/utils/fetchers";
import { mutate } from "swr";
import { toast } from "@hooks/use-toast";
import { useState } from "react";

const handleDeleteIngredient = async (id: number) => {
   try {
      const res = await deleteFetcher(`/api/ingredient/${id}`);

      if (res.code === FlashMessageType.PIZZA_RELATION) {
         return toast({ variant: "destructive", description: res.message });
      }

      await mutate(
         "/api/ingredient",
         (currentData: Ingredient[] | undefined) => currentData?.filter((v) => v.id !== id) || [],
         { revalidate: false },
      );

      toast({ title: "Fu", description: "Kakakakakakaaa" });
   } catch (error) {
      console.error("Error deleting ingredient:", error);
   }
};

const booleanFilter = (row: Row<Ingredient>, columnId: string, filterValue: unknown[]) => {
   const cellValue = row.getValue(columnId);

   return filterValue.includes(cellValue);
};

export const columns: ColumnDef<Ingredient>[] = [
   {
      id: "select",
      header: ({ table }) => (
         <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
         />
      ),
      cell: ({ row }) => (
         <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
         />
      ),
      enableSorting: false,
      enableHiding: false,
   },
   {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Ingredient" />,
   },
   {
      accessorKey: "isActive",
      header: "Active",
      filterFn: booleanFilter,
   },
   {
      accessorKey: "isGlutenFree",
      header: "Gluten free",
      filterFn: booleanFilter,
   },
   {
      accessorKey: "isVegan",
      header: "Vegan",
   },
   {
      accessorKey: "price",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
   },
   {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
         const [isDialogOpen, setIsDialogOpen] = useState(false);

         return (
            <>
               <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogContent className="sm:max-w-[425px]">
                     <DialogHeader>
                        <DialogTitle>New ingredient</DialogTitle>
                        <SheetDescription /> {/* TODO default */}
                     </DialogHeader>
                     <IngredientForm ingredient={row.original} setIsDialogOpen={setIsDialogOpen} />
                  </DialogContent>
               </Dialog>
               <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                     <Button variant="ghost" className="h-8 w-8 p-0 flex mx-auto">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem onClick={() => handleDeleteIngredient(row.original.id)}>Delete</DropdownMenuItem>
                     <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>Edit</DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </>
         );
      },
   },
];
