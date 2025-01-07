import { Prisma } from "@prisma/client";

export const PIZZA_FRAGMENT = Prisma.validator<Prisma.PizzaSelect>()({
   id: true,
   name: true,
   description: true,
   isActive: true,
   isGlutenFree: true,
   isVegan: true,
   price: true,
   size: true,
   ingredients: {
      include: {
         ingredient: {
            select: {
               name: true,
               id: true,
            },
         },
      },
   },
});
