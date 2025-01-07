"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@ui/dialog";
import { Button } from "@ui/button";
import { DataTable } from "./data-table";
import { PizzaForm } from "@/components/form/pizza-form";
import { SheetDescription } from "@ui/sheet";
import { TransformedPizzaFragment } from "@/types/pizza-types";
import { columns } from "./columns";
import useSWR from "swr";
import { useState } from "react";

export default function Page() {
   const [isDialogOpen, setIsDialogOpen] = useState(false);

   const { data: pizzas = [], isLoading } = useSWR<TransformedPizzaFragment[]>("/api/pizzas");

   console.log("%c<<< pizzas >>>", "background: #222; color: goldenrod", pizzas);

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
                        <DialogTitle>New pizza</DialogTitle>
                        <SheetDescription /> {/* TODO default */}
                     </DialogHeader>
                     <PizzaForm setIsDialogOpen={setIsDialogOpen} />
                  </DialogContent>
               </Dialog>
            }
            columns={columns}
            data={pizzas}
            isLoading={isLoading}
         />
      </div>
   );
}
