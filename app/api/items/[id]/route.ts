import { db } from "@/features/db";
import { Item, itemsTable } from "@/features/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import type { Params } from "@/app/types";
import { z } from "zod";
import { notFound } from "next/navigation";

export async function GET(_req: Request, { params }: Params<"id">) {
  const paramId = (await params).id;
  try {
    const id = z.number().parse(Number(paramId));

    const item: Item | undefined = db.select().from(itemsTable).where(eq(itemsTable.id, id)).get();

    if (!item) {
      notFound();
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: `Failed to fetch item with id ${paramId}.` },
      { status: 500 }
    );
  }
}
