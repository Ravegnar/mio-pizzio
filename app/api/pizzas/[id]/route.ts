import { NextResponse } from "next/server";
import { pizzaSchema } from "@zod/pizza";
import prisma from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
   try {
      const id = parseInt((await params).id, 10);

      if (!id) {
         return NextResponse.json({ error: "Missing ID" }, { status: 400 });
      }

      const data = await req.json();
      const validatedData = pizzaSchema.parse(data);

      const { name, description, price, size, ingredients } = validatedData;

      const updatedPizza = await prisma.pizza.update({
         where: { id },
         data: {
            name,
            description,
            price,
            size,
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

      return NextResponse.json(updatedPizza);
   } catch (error) {
      console.error("Error in PUT handler:", error);
      return NextResponse.json({ error: String(error) }, { status: 500 });
   }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
   try {
      const id = parseInt((await params).id, 10);

      if (id === null || id === undefined) {
         console.log("No ID provided in params");
         return NextResponse.json({ error: "Missing ID" }, { status: 400 });
      }

      await prisma.pizza.delete({
         where: { id },
      });

      return NextResponse.json({ message: "Pizza deleted successfully" });
   } catch (error) {
      console.error("Error in DELETE handler:", error);

      return NextResponse.json({ error: String(error) }, { status: 500 });
   }
}
