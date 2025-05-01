import { db } from "@/features/db";
import { itemsTable } from "@/features/db/schema";
import { NextResponse } from "next/server";
import { desc, count, like } from "drizzle-orm";
import { PER_PAGE } from "@/features/item/config";
import type { GetItemsResponse } from "./types";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const search = url.searchParams.get("search")?.trim();
    const page = url.searchParams.get("page")?.trim() ?? "1";

    // Keep these query builders identical for anything that impacts the row count.
    const itemsQuery = db
      .select()
      .from(itemsTable)
      .orderBy(({ createdAt }) => [desc(createdAt)]);
    const countQuery = db.select({ count: count() }).from(itemsTable);

    if (search) {
      itemsQuery.where(like(itemsTable.title, `%${search.toLowerCase()}%`));
      countQuery.where(like(itemsTable.title, `%${search.toLowerCase()}%`));
    }
    itemsQuery.limit(PER_PAGE).offset((parseInt(page) - 1) * PER_PAGE); // Paginate.

    const countQueryResult = await countQuery;
    const items = await itemsQuery;

    return NextResponse.json({
      items,
      total: countQueryResult.at(0)?.count ?? items.length,
    } satisfies GetItemsResponse);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch items." }, { status: 500 });
  }
}
