"use client";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
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
import { ColumnDef } from "@tanstack/react-table";
import { Ingredient } from "@prisma/client";
import { IngredientForm } from "@/components/form/ingredient-form";
import { SheetDescription } from "@ui/sheet";
import { deleteFetcher } from "@/utils/fetchers";
import { mutate } from "swr";
import { useState } from "react";

const handleDeleteIngredient = async (id: number) => {
   try {
      await deleteFetcher(`/api/ingredient/${id}`);

      await mutate(
         "/api/ingredient",
         (currentData: Ingredient[] | undefined) => currentData?.filter((v) => v.id !== id) || [],
         { revalidate: false },
      );
   } catch (error) {
      console.error("Error deleting note:", error);
   }
};

export const columns: ColumnDef<Ingredient>[] = [
   {
      accessorKey: "name",
      header: ({ column }) => {
         return (
            <Button
               className="px-0"
               variant="ghost"
               onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
               Ingredient
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         );
      },
   },
   {
      accessorKey: "isActive",
      header: "Active",
   },
   {
      accessorKey: "isGlutenFree",
      header: "Gluten free",
   },
   {
      accessorKey: "isVegan",
      header: "Vegan",
   },
   {
      accessorKey: "price",
      header: ({ column }) => {
         return (
            <Button
               className="px-0"
               variant="ghost"
               onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
               Price
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         );
      },
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
