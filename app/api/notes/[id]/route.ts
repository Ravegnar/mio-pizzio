import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PUT - Aktualizace existující poznámky
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
   try {
      const id = parseInt((await params).id, 10);

      if (!id) {
         return NextResponse.json({ error: "Missing ID" }, { status: 400 });
      }

      const { name } = await req.json();

      if (!name) {
         return NextResponse.json({ error: "Missing name" }, { status: 400 });
      }

      const updatedNote = await prisma.note.update({
         where: { id },
         data: { name },
      });

      return NextResponse.json(updatedNote);
   } catch (error) {
      console.error("Error in PUT handler:", error);
      return NextResponse.json({ error: String(error) }, { status: 500 });
   }
}

// DELETE - Smazání poznámky
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
   try {
      const id = parseInt((await params).id, 10);

      if (!id) {
         console.log("No ID provided in params");
         return NextResponse.json({ error: "Missing ID" }, { status: 400 });
      }

      await prisma.note.delete({
         where: { id },
      });

      return NextResponse.json({ message: "Note deleted successfully" });
   } catch (error) {
      console.error("Error in DELETE handler:", error);

      return NextResponse.json({ error: String(error) }, { status: 500 });
   }
}
