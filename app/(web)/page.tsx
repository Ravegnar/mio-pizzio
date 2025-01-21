"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, Plus, Vegan, Wheat } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/tooltip";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { TransformedPizzaFragment } from "@/types/pizza-types";
import { formatStringArray } from "@/utils/format-string-array";
import useSWR from "swr";

export default function WebPage() {
   const { data: pizzas = [], isLoading } = useSWR<TransformedPizzaFragment[]>("/api/pizzas");

   return (
      <div className="w-full grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                 <Card key={index} className="flex flex-col overflow-hidden">
                    <Skeleton className="w-auto h-72 bg-gray-200" />
                    <CardHeader>
                       <CardTitle className="flex items-center justify-between gap-x-2">
                          <Skeleton className="w-2/3 h-7 rounded-md" />
                          <div className="flex items-center gap-2">
                             <Skeleton className="size-6 rounded-full" />
                             <Skeleton className="size-6 rounded-full" />
                          </div>
                       </CardTitle>
                       <CardDescription>{/*<Skeleton className="w-full h-4 rounded-md" />*/}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-y-2">
                       <Skeleton className="w-full h-4 rounded-md" />
                       <Skeleton className="w-3/4 h-4 rounded-md" />
                    </CardContent>
                    <CardFooter className="flex justify-between mt-auto">
                       <Skeleton className="w-16 h-6 rounded-md" />
                       <div className="flex gap-2 items-center">
                          <Skeleton className="size-9 rounded-full" />
                          <Skeleton className="w-10 h-6 rounded-md" />
                          <Skeleton className="size-9 rounded-full" />
                       </div>
                    </CardFooter>
                 </Card>
              ))
            : pizzas.map(
                 (pizza) =>
                    pizza.isActive && (
                       <Card key={pizza.id} className="flex flex-col overflow-hidden">
                          <div className="relative w-full h-72 border-b bg-gray-100 dark:bg-amber-200">
                             <Image
                                alt={`${pizza.name} image`}
                                className="object-contain mix-blend-darken"
                                fill
                                priority
                                sizes="(max-width: 400px) 100vw"
                                src="/assets/pizza.jpg"
                             />
                          </div>
                          <CardHeader>
                             <CardTitle className="flex items-center justify-between gap-x-2">
                                <div className="truncate text-xl">{pizza.name}</div>
                                <div className="flex items-center gap-2">
                                   {pizza.isVegan && (
                                      <Tooltip>
                                         <TooltipTrigger>
                                            <Vegan className="text-green-600" />
                                         </TooltipTrigger>
                                         <TooltipContent>Vegan</TooltipContent>
                                      </Tooltip>
                                   )}
                                   {pizza.isGlutenFree && (
                                      <Tooltip>
                                         <TooltipTrigger>
                                            <Wheat className="text-yellow-600" />
                                         </TooltipTrigger>
                                         <TooltipContent>Gluten Free</TooltipContent>
                                      </Tooltip>
                                   )}
                                </div>
                             </CardTitle>
                             <CardDescription>{/* TODO pizza.description*/}</CardDescription>
                          </CardHeader>
                          <CardContent>
                             <p className="text-sm text-muted-foreground line-clamp-2">
                                Ingredients: {formatStringArray(pizza.ingredients, "name")}
                             </p>
                          </CardContent>
                          <CardFooter className="flex justify-between mt-auto">
                             <p className="text-lg font-semibold">${pizza.price.toFixed(2)}</p>
                             <div className="flex gap-2 items-center">
                                <Button
                                   className="rounded-full"
                                   onClick={() => console.log("%c<<< TODO >>>", "background: #222; color: deepskyblue")}
                                   size="icon"
                                   variant="outline"
                                >
                                   <Minus size={40} width={40} />
                                   <span className="sr-only">Add to cart</span>
                                </Button>
                                TODO
                                <Button
                                   className="rounded-full"
                                   onClick={() => console.log("%c<<< TODO >>>", "background: #222; color: deepskyblue")}
                                   size="icon"
                                   variant="outline"
                                >
                                   <Plus />
                                   <span className="sr-only">Add to cart</span>
                                </Button>
                             </div>
                          </CardFooter>
                       </Card>
                    ),
              )}
      </div>
   );
}
