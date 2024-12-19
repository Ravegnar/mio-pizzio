import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Načtení všech poznámek
export async function GET() {
  try {
    const notes = await prisma.note.findMany({
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Vytvoření nové poznámky
export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    const newNote = await prisma.note.create({
      data: { name },
    });

    return NextResponse.json(newNote);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
