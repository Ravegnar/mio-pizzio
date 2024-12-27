import { NextResponse } from "next/server";
import { ingredientSchema } from "@zod/ingredient";
import prisma from "@/lib/prisma";

export async function GET() {
   try {
      const ingredients = await prisma.ingredient.findMany({
         orderBy: { name: "asc" },
      });

      return NextResponse.json(ingredients);
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
      const validatedData = ingredientSchema.parse(data);

      const newIngredient = await prisma.ingredient.create({
         data: validatedData,
      });

      return NextResponse.json(newIngredient);
   } catch (error) {
      return NextResponse.json(
         { error: error instanceof Error ? error.message : "Unknown error occurred" },
         { status: 500 },
      );
   }
}
