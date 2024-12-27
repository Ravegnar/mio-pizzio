"use client";

import { Dispatch, SetStateAction } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/form";
import { postFetcher, putFetcher } from "@/utils/fetchers";
import { Button } from "@ui/button";
import { Checkbox } from "@ui/checkbox";
import { Ingredient } from "@prisma/client";
import { IngredientType } from "@/types/ingredient-types";
import { Input } from "@ui/input";
import { Textarea } from "@ui/textarea";
import { ingredientSchema } from "@zod/ingredient";
import { mutate } from "swr";
import { useForm } from "react-hook-form";
import { useToast } from "@hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
   ingredient?: Ingredient;
   setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export function IngredientForm(props: Props) {
   const { toast } = useToast();

   const form = useForm<IngredientType>({
      defaultValues: {
         description: props?.ingredient?.description ?? "",
         isActive: props?.ingredient?.isActive ?? true,
         isGlutenFree: props?.ingredient?.isGlutenFree ?? false,
         isVegan: props?.ingredient?.isVegan ?? false,
         name: props?.ingredient?.name ?? "",
         price: props?.ingredient?.price ?? 0,
      },
      resolver: zodResolver(ingredientSchema),
   });

   async function onSubmit(values: IngredientType) {
      try {
         if (props.ingredient) {
            await putFetcher<IngredientType>(`/api/ingredient/${props.ingredient.id}`, values);
         } else {
            await postFetcher<IngredientType>("/api/ingredient", values);
         }

         await mutate("/api/ingredient");

         toast({ title: "Fu", description: "Kakakakakakaaa" });
         props.setIsDialogOpen(false);
         form.reset();
      } catch (error) {
         console.error("Form submission error", error);
         toast({ title: "Failed to submit the form. Please try again.", variant: "destructive" });
      }
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-3xl">
            <FormField
               control={form.control}
               name="name"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Ingredient name</FormLabel>
                     <FormControl>
                        <Input placeholder="Enter name" type="text" {...field} />
                     </FormControl>

                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="price"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Price</FormLabel>
                     <FormControl>
                        <Input placeholder="Enter price" type="number" {...field} />
                     </FormControl>

                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="description"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Description</FormLabel>
                     <FormControl>
                        <Textarea placeholder="Enter description" className="resize-none" {...field} />
                     </FormControl>

                     <FormMessage />
                  </FormItem>
               )}
            />

            <div className="grid grid-cols-12 gap-4">
               <div className="col-span-6">
                  <FormField
                     control={form.control}
                     name="isVegan"
                     render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                           <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                           </FormControl>
                           <div className="space-y-1 leading-none">
                              <FormLabel>Is vegan</FormLabel>

                              <FormMessage />
                           </div>
                        </FormItem>
                     )}
                  />
               </div>

               <div className="col-span-6">
                  <FormField
                     control={form.control}
                     name="isGlutenFree"
                     render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                           <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                           </FormControl>
                           <div className="space-y-1 leading-none">
                              <FormLabel>Is gluten free</FormLabel>

                              <FormMessage />
                           </div>
                        </FormItem>
                     )}
                  />
               </div>
            </div>

            <FormField
               control={form.control}
               name="isActive"
               render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                     <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                     </FormControl>
                     <div className="space-y-1 leading-none">
                        <FormLabel>Active</FormLabel>

                        <FormMessage />
                     </div>
                  </FormItem>
               )}
            />

            <Button type="submit" disabled={form.formState.isSubmitting} className="flex ml-auto">
               {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
         </form>
      </Form>
   );
}
