import { db } from "@/features/db";
import { itemsTable } from "@/features/db/schema";
import { NextResponse } from "next/server";
import { desc, count, like, or } from "drizzle-orm";
import type { GetItemsResponse } from "./types";
import { getSettings } from "../settings/route";

export async function GET(req: Request) {
  try {
    const settings = await getSettings();

    if (!settings) {
      throw new Error("Settings not found.");
    }

    const { itemsPerPage } = settings;
    const url = new URL(req.url);
    const search = url.searchParams.get("search")?.trim();
    const page = url.searchParams.get("page")?.trim() ?? "1";

    // Keep these query builders identical for anything that impacts the row count.
    const itemsQuery = db
      .select()
      .from(itemsTable)
      .orderBy(({ id }) => [desc(id)]);
    const countQuery = db.select({ count: count() }).from(itemsTable);

    if (search) {
      const lowerCaseSearch = search.toLowerCase();
      itemsQuery.where(
        or(
          like(itemsTable.title, `%${lowerCaseSearch}%`),
          like(itemsTable.articleId, `%${lowerCaseSearch}%`)
        )
      );
      countQuery.where(
        or(
          like(itemsTable.title, `%${lowerCaseSearch}%`),
          like(itemsTable.articleId, `%${lowerCaseSearch}%`)
        )
      );
    }
    itemsQuery.limit(itemsPerPage).offset((parseInt(page) - 1) * itemsPerPage); // Paginate.

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
