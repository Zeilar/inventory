import { db } from "@/features/db";
import { itemsTable } from "@/features/db/schema";
import { NextResponse } from "next/server";
import { desc, like, or, between, sql, SQL, and, eq } from "drizzle-orm";
import type { GetItemsResponse } from "./types";
import { getSettings } from "../settings/route";
import { z } from "zod";

export type ItemsFilterParams =
  | "quantityFrom"
  | "quantityTo"
  | "dateFrom"
  | "dateTo"
  | "archived"
  | "published";
export type ItemsSearchParams = ItemsFilterParams | "search" | "page";

export async function GET(req: Request) {
  try {
    const settings = await getSettings();

    if (!settings) {
      throw new Error("Settings not found.");
    }

    const { itemsPerPage } = settings;
    const url = new URL(req.url);
    const filters: Array<SQL | undefined> = [];
    const search = url.searchParams.get("search" satisfies ItemsSearchParams)?.trim();
    const page = url.searchParams.get("page" satisfies ItemsSearchParams)?.trim() ?? "1";
    const archived =
      url.searchParams.get("archived" satisfies ItemsSearchParams)?.trim() === "true";
    const published =
      url.searchParams.get("published" satisfies ItemsSearchParams)?.trim() === "true";
    const quantityFrom = z
      .number({ coerce: true })
      .optional()
      .parse(url.searchParams.get("quantityFrom" satisfies ItemsSearchParams)?.trim());
    const quantityTo = z
      .number({ coerce: true })
      .optional()
      .parse(url.searchParams.get("quantityTo" satisfies ItemsSearchParams)?.trim());
    const dateFrom = z
      .date({ coerce: true })
      .optional()
      .parse(url.searchParams.get("dateFrom" satisfies ItemsSearchParams)?.trim());
    const dateTo = z
      .date({ coerce: true })
      .optional()
      .parse(url.searchParams.get("dateTo" satisfies ItemsSearchParams)?.trim());

    const itemsQuery = db
      .select({
        id: itemsTable.id,
        title: itemsTable.title,
        articleId: itemsTable.articleId,
        quantity: itemsTable.quantity,
        files: itemsTable.files,
        archived: itemsTable.archived,
        createdAt: itemsTable.createdAt,
        updatedAt: itemsTable.updatedAt,
        total: sql<number>`count(*) OVER ()`.as("total"),
      })
      .from(itemsTable)
      .orderBy(({ id }) => [desc(id)]);

    if (search) {
      const lowerCaseSearch = search.toLowerCase();
      filters.push(
        or(
          like(itemsTable.title, `%${lowerCaseSearch}%`),
          like(itemsTable.articleId, `%${lowerCaseSearch}%`)
        )
      );
    }

    if (!archived) {
      filters.push(eq(itemsTable.archived, false));
    }

    if (!published) {
      filters.push(eq(itemsTable.archived, true));
    }

    if (typeof quantityFrom === "number" && typeof quantityTo === "number") {
      filters.push(between(itemsTable.quantity, quantityFrom, quantityTo));
    }

    if (dateFrom instanceof Date && dateTo instanceof Date) {
      filters.push(between(itemsTable.createdAt, dateFrom.toISOString(), dateTo.toISOString()));
    }

    if (filters.length > 0) {
      itemsQuery.where(and(...filters));
    }

    itemsQuery.limit(itemsPerPage).offset((parseInt(page) - 1) * itemsPerPage); // Paginate.

    const items = await itemsQuery;

    return NextResponse.json({
      items,
      total: items.at(0)?.total ?? items.length,
    } satisfies GetItemsResponse);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch items." }, { status: 500 });
  }
}
