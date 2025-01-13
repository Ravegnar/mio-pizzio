import { FlashMessageType, flashMessages } from "@/constants/message-codes";
import { NextResponse } from "next/server";
import { ingredientSchema } from "@zod/ingredient";
import prisma from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
   try {
      const id = parseInt((await params).id, 10);

      if (isNaN(id)) {
         return NextResponse.json({ error: "Missing ID" }, { status: 400 });
      }

      const data = await req.json();
      const validatedData = ingredientSchema.parse(data);

      const updatedIngredient = await prisma.ingredient.update({
         where: { id },
         data: validatedData,
      });

      return NextResponse.json(updatedIngredient);
   } catch (error) {
      console.error("Error in PUT handler:", error);
      return NextResponse.json({ error: String(error) }, { status: 500 });
   }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
   try {
      const id = parseInt((await params).id, 10);

      const pizzas = await prisma.pizzaIngredient.findMany({
         where: { ingredientId: id },
         include: {
            pizza: true,
         },
      });

      const pizzaNames = pizzas.map((pizzaIngredient) => pizzaIngredient.pizza.name);

      if (pizzas.length) {
         return NextResponse.json({
            message: `${flashMessages[FlashMessageType.PIZZA_RELATION]} ${pizzaNames.slice(0, -1).join(", ")} and ${pizzaNames[pizzaNames.length - 1]}`,
            id,
            code: FlashMessageType.PIZZA_RELATION,
         });
      }

      if (isNaN(id)) {
         console.log("No ID provided in params");
         return NextResponse.json({ error: "Missing ID" }, { status: 400 });
      }

      await prisma.ingredient.delete({
         where: { id },
      });

      return NextResponse.json({ message: "Ingredient deleted successfully" });
   } catch (error) {
      console.error("Error in DELETE handler:", error);

      return NextResponse.json({ error: String(error) }, { status: 500 });
   }
}
