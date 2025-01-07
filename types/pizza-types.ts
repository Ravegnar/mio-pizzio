import { PIZZA_FRAGMENT } from "@/prisma/fragments/fragments";
import { Prisma } from "@prisma/client";
import { pizzaSchema } from "@zod/pizza";
import { z } from "zod";

export type PizzaType = z.infer<typeof pizzaSchema>; // TODO

export type PizzaFragment = Prisma.PizzaGetPayload<{
   select: typeof PIZZA_FRAGMENT;
}>;

export type TransformedIngredient = {
   id: number;
   name: string;
};

export type TransformedPizzaFragment = Omit<PizzaFragment, "ingredients"> & {
   ingredients: TransformedIngredient[];
};
