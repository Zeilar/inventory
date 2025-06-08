import { db } from "@/features/db";
import { Item, itemsTable } from "@/features/db/schema";
import { NextResponse } from "next/server";
import { desc, like, or, between, sql, SQL, and, eq, asc } from "drizzle-orm";
import type { GetItemsResponse } from "./types";
import { z } from "zod";
import { getSettings } from "../settings/getSettings";

export type SortDirection = "asc" | "desc";

export type ItemsFilterParams =
  | "quantityFrom"
  | "quantityTo"
  | "dateFrom"
  | "dateTo"
  | "status"
  | "tags"
  | "sortBy"
  | "sortDirection";

export type ItemsSearchParams = ItemsFilterParams | "search" | "page";

const MAX_SAFE_DB_INT = 2147483647;

export async function GET(req: Request) {
  try {
    const settings = await getSettings();

    if (!settings) {
      throw new Error("Settings not found.");
    }

    const { itemsPerPage } = settings;
    const url = new URL(req.url);
    const search = url.searchParams.get("search" satisfies ItemsSearchParams)?.trim();
    const page = url.searchParams.get("page" satisfies ItemsSearchParams)?.trim() ?? "1";
    const status =
      url.searchParams.get("status" satisfies ItemsSearchParams)?.trim() ?? "published";
    const quantityFrom =
      z
        .number({ coerce: true })
        .optional()
        .parse(url.searchParams.get("quantityFrom" satisfies ItemsSearchParams)?.trim()) ?? 0;
    const quantityTo =
      z
        .number({ coerce: true })
        .optional()
        .parse(url.searchParams.get("quantityTo" satisfies ItemsSearchParams)?.trim()) ??
      MAX_SAFE_DB_INT;
    const dateFrom =
      z
        .date({ coerce: true })
        .optional()
        .parse(url.searchParams.get("dateFrom" satisfies ItemsSearchParams)?.trim()) ?? new Date(0);
    const dateTo =
      z
        .date({ coerce: true })
        .optional()
        .parse(url.searchParams.get("dateTo" satisfies ItemsSearchParams)?.trim()) ??
      new Date(Date.now() * 2);
    const tags = url.searchParams
      .get("tags" satisfies ItemsSearchParams)
      ?.trim()
      .split(",")
      .filter(Boolean);
    const sortBy = (url.searchParams.get("sortBy" satisfies ItemsSearchParams) ??
      "id") as keyof Item;
    const sortDirection =
      url.searchParams.get("sortDirection" satisfies ItemsSearchParams) ?? "desc";

    const filters: Array<SQL | undefined> = [
      between(
        itemsTable.quantity,
        Math.max(0, quantityFrom),
        Math.min(quantityTo, MAX_SAFE_DB_INT)
      ),
      between(itemsTable.createdAt, dateFrom.toISOString(), dateTo.toISOString()),
      between(itemsTable.quantity, Math.max(0, quantityFrom), Math.min(quantityTo, Infinity)),
    ];

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
        archivedAt: itemsTable.archivedAt,
        tags: itemsTable.tags,
        total: sql<number>`count(*) OVER ()`.as("total"),
        originalPrice: itemsTable.originalPrice,
        links: itemsTable.links,
      })
      .from(itemsTable)
      .orderBy((item) => (sortDirection === "asc" ? asc(item[sortBy]) : desc(item[sortBy])))
      .limit(itemsPerPage)
      .offset((parseInt(page) - 1) * itemsPerPage);

    if (tags?.length) {
      filters.push(
        or(...tags.map((tag) => sql`instr(',' || tags || ',', ',' || ${tag} || ',') > 0`))
      );
    }

    if (search) {
      const lowerCaseSearch = `%${search.toLowerCase()}%`;
      filters.push(
        or(
          like(itemsTable.title, lowerCaseSearch),
          like(itemsTable.articleId, lowerCaseSearch),
          like(itemsTable.id, lowerCaseSearch),
          like(itemsTable.quantity, lowerCaseSearch)
        )
      );
    }

    if (status === "published") {
      filters.push(eq(itemsTable.archived, false));
    } else if (status === "archived") {
      filters.push(eq(itemsTable.archived, true));
    }

    if (filters.length > 0) {
      itemsQuery.where(and(...filters));
    }

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
