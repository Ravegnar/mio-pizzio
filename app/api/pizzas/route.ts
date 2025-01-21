import { PizzaFragment, TransformedPizzaFragment } from "@/types/pizza-types";
import { NextResponse } from "next/server";
import { PIZZA_FRAGMENT } from "@/prisma/fragments/fragments";
import { pizzaSchema } from "@zod/pizza";
import prisma from "@/lib/prisma";

export async function GET() {
   try {
      const pizzas: PizzaFragment[] = await prisma.pizza.findMany({
         orderBy: { name: "asc" },
         select: PIZZA_FRAGMENT,
      });

      const transformedPizzas: TransformedPizzaFragment[] = pizzas.map((pizza) => ({
         ...pizza,
         ingredients: pizza.ingredients.map((ingredient) => ingredient.ingredient),
      }));

      return NextResponse.json(transformedPizzas);
   } catch (error) {
      return NextResponse.json(
         { error: error instanceof Error ? error.message : "Unknown error occurred" },
         { status: 500 },
      );
   }
}

export async function POST(req: Request) {
   try {
      const data = await req.json();
      const validatedData = pizzaSchema.parse(data);

      const { name, description, price, size, ingredients, isVegan, isActive, isGlutenFree } = validatedData;

      const newPizza = await prisma.pizza.create({
         data: {
            name,
            description,
            price,
            size,
            isVegan,
            isActive,
            isGlutenFree,
            ingredients: {
               create:
                  ingredients?.map((id) => ({
                     ingredient: {
                        connect: { id },
                     },
                  })) || [],
            },
         },
      });

      return NextResponse.json(newPizza);
   } catch (error) {
      return NextResponse.json(
         { error: error instanceof Error ? error.message : "Unknown error occurred" },
         { status: 500 },
      );
   }
}
