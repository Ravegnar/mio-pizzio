"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@ui/dialog";
import { Button } from "@ui/button";
import { DataTable } from "./data-table";
import { IngredientForm } from "@/components/form/ingredient-form";
import { SheetDescription } from "@ui/sheet";
import { columns } from "./columns";
import useSWR from "swr";
import { useState } from "react";

export default function Page() {
   const [isDialogOpen, setIsDialogOpen] = useState(false);

   const { data: ingredients, isLoading } = useSWR("/api/ingredient");

   console.log("%c<<< ingredients >>>", "background: #222; color: deepskyblue", ingredients);

   return (
      <div className="sm:container sm:mx-auto py-10">
         <DataTable
            actions={
               <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                     <Button size="sm">Add new</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                     <DialogHeader>
                        <DialogTitle>New ingredient</DialogTitle>
                        <SheetDescription /> {/* TODO default */}
                     </DialogHeader>
                     <IngredientForm setIsDialogOpen={setIsDialogOpen} />
                  </DialogContent>
               </Dialog>
            }
            columns={columns}
            data={ingredients ?? []}
            isLoading={isLoading}
         />
      </div>
   );
}
