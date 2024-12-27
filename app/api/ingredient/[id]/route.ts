import { NextResponse } from "next/server";
import { ingredientSchema } from "@zod/ingredient";
import prisma from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
   try {
      const id = parseInt((await params).id, 10);

      if (!id) {
         return NextResponse.json({ error: "Missing ID" }, { status: 400 });
      }

      const data = await req.json();
      const validatedData = ingredientSchema.parse(data);

      const updatedIngredient = await prisma.ingredient.update({
         where: { id },
         data: validatedData,
      });

      console.log("%c<<< updatedIngredient >>>", "background: #222; color: blueviolet", updatedIngredient);

      return NextResponse.json("updatedIngredient");
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

      await prisma.ingredient.delete({
         where: { id },
      });

      return NextResponse.json({ message: "Ingredient deleted successfully" });
   } catch (error) {
      console.error("Error in DELETE handler:", error);

      return NextResponse.json({ error: String(error) }, { status: 500 });
   }
}
