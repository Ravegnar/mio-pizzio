"use client";

import { Dispatch, SetStateAction } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@ui/form";
import {
   MultiSelector,
   MultiSelectorContent,
   MultiSelectorInput,
   MultiSelectorItem,
   MultiSelectorList,
   MultiSelectorTrigger,
} from "@ui/multi-select";
import { PizzaType, TransformedPizzaFragment } from "@/types/pizza-types";
import { postFetcher, putFetcher } from "@/utils/fetchers";
import useSWR, { mutate } from "swr";
import { Button } from "@ui/button";
import { Checkbox } from "@ui/checkbox";
import { Ingredient } from "@prisma/client";
import { Input } from "@ui/input";
import { Textarea } from "@ui/textarea";
import { pizzaSchema } from "@zod/pizza";
import { useForm } from "react-hook-form";
import { useToast } from "@hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
   pizza?: TransformedPizzaFragment;
   setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export function PizzaForm(props: Props) {
   const { toast } = useToast();

   const { data: ingredients } = useSWR<Ingredient[]>("/api/ingredient");

   const form = useForm<PizzaType>({
      defaultValues: {
         description: props?.pizza?.description ?? "",
         isActive: props?.pizza?.isActive ?? true,
         isGlutenFree: props?.pizza?.isGlutenFree ?? false,
         isVegan: props?.pizza?.isVegan ?? false,
         name: props?.pizza?.name ?? "",
         price: props?.pizza?.price ?? 0,
         size: props?.pizza?.size ?? 0,
         ingredients: props?.pizza?.ingredients.map((v) => v.id) ?? [],
      },
      resolver: zodResolver(pizzaSchema),
   });

   async function onSubmit(values: PizzaType) {
      try {
         if (props.pizza) {
            await putFetcher<PizzaType>(`/api/pizzas/${props.pizza.id}`, values);
         } else {
            await postFetcher<PizzaType>("/api/pizzas", values);
         }

         await mutate("/api/pizzas");

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
                     <FormLabel>Pizza name</FormLabel>
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
               name="size"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Size</FormLabel>
                     <FormControl>
                        <Input placeholder="Enter size" type="number" {...field} />
                     </FormControl>

                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="ingredients"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Select your framework</FormLabel>
                     <FormControl>
                        <MultiSelector values={field.value} onValuesChange={field.onChange} loop className="max-w-xs">
                           <MultiSelectorTrigger>
                              <MultiSelectorInput placeholder="Select languages" />
                           </MultiSelectorTrigger>
                           <MultiSelectorContent>
                              <MultiSelectorList>
                                 {ingredients
                                    ? ingredients.map((v) => (
                                         <MultiSelectorItem key={v.id} value={v.id.toString()}>
                                            {v.name}
                                         </MultiSelectorItem>
                                      ))
                                    : null}
                              </MultiSelectorList>
                           </MultiSelectorContent>
                        </MultiSelector>
                     </FormControl>
                     <FormDescription>Select multiple options.</FormDescription>
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
