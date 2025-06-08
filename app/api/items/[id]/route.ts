import { db } from "@/features/db";
import { type Item, itemsTable } from "@/features/db/schema";
import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";
import type { Params } from "@/app/types";
import { z } from "zod";
import { notFound } from "next/navigation";

export async function GET(_req: Request, { params }: Params<"id">) {
  const paramId = (await params).id;
  try {
    const id = z.number().parse(Number(paramId));
    const item: Item | undefined = (
      await db
        .select({
          // Hack in order to get the timezone, so we may use an ISO 8601 string.
          archivedAt:
            sql<string>`to_char(${itemsTable.archivedAt}, 'YYYY-MM-DD"T"HH24:MI:SS.MSZ')`.as(
              "archivedAt"
            ),
          createdAt:
            sql<string>`to_char(${itemsTable.createdAt}, 'YYYY-MM-DD"T"HH24:MI:SS.MSZ')`.as(
              "createdAt"
            ),
          updatedAt:
            sql<string>`to_char(${itemsTable.updatedAt}, 'YYYY-MM-DD"T"HH24:MI:SS.MSZ')`.as(
              "updatedAt"
            ),
          id: itemsTable.id,
          title: itemsTable.title,
          articleId: itemsTable.articleId,
          quantity: itemsTable.quantity,
          files: itemsTable.files,
          archived: itemsTable.archived,
          tags: itemsTable.tags,
          price: itemsTable.price,
          links: itemsTable.links,
        })
        .from(itemsTable)
        .where(eq(itemsTable.id, id))
    ).at(0);

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
