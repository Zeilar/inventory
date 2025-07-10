import { db } from "@/features/db";
import { type Item, itemsHistoryTable } from "@/features/db/schema";
import { NextResponse } from "next/server";
import { desc, eq, sql } from "drizzle-orm";
import type { Params } from "@/app/types";
import { z } from "zod";

export async function GET(_req: Request, { params }: Params<"id">) {
  const paramId = (await params).id;
  try {
    const id = z.number().parse(Number(paramId));
    const items: Item[] = await db
      .select({
        // Hack in order to get the timezone, so we may use an ISO 8601 string.
        archivedAt:
          sql<string>`to_char(${itemsHistoryTable.archivedAt}, 'YYYY-MM-DD"T"HH24:MI:SS.MSZ')`.as(
            "archivedAt"
          ),
        createdAt:
          sql<string>`to_char(${itemsHistoryTable.createdAt}, 'YYYY-MM-DD"T"HH24:MI:SS.MSZ')`.as(
            "createdAt"
          ),
        updatedAt:
          sql<string>`to_char(${itemsHistoryTable.updatedAt}, 'YYYY-MM-DD"T"HH24:MI:SS.MSZ')`.as(
            "updatedAt"
          ),
        id: itemsHistoryTable.id,
        title: itemsHistoryTable.title,
        articleId: itemsHistoryTable.articleId,
        quantity: itemsHistoryTable.quantity,
        files: itemsHistoryTable.files,
        archived: itemsHistoryTable.archived,
        tags: itemsHistoryTable.tags,
        price: itemsHistoryTable.price,
        links: itemsHistoryTable.links,
        itemId: itemsHistoryTable.id,
        thumbnail: itemsHistoryTable.thumbnail,
      })
      .from(itemsHistoryTable)
      .where(eq(itemsHistoryTable.itemId, id))
      .orderBy((itemHistory) => desc(itemHistory.id));
    return NextResponse.json(items);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: `Failed to fetch item history with id ${paramId}.` },
      { status: 500 }
    );
  }
}
