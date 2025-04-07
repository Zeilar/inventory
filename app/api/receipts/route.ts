import { db } from "@/features/db";
import { imagesTable, type Receipts, receiptsTable } from "@/features/db/schema";
import { NextResponse } from "next/server";
import { count, eq, like } from "drizzle-orm";
import { PER_PAGE } from "@/features/receipt/config";
import type { GetReceiptsResponse } from "./types";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const search = url.searchParams.get("search")?.trim();
    const page = url.searchParams.get("page")?.trim() ?? "1";

    // Keep these query builders identical.
    const receiptsQuery = db
      .select()
      .from(receiptsTable)
      .leftJoin(imagesTable, eq(receiptsTable.id, imagesTable.receiptId));
    const countQuery = db
      .select({ count: count() })
      .from(receiptsTable)
      .leftJoin(imagesTable, eq(receiptsTable.id, imagesTable.receiptId));

    if (search) {
      receiptsQuery.where(like(receiptsTable.title, `%${search.toLowerCase()}%`));
      countQuery.where(like(receiptsTable.title, `%${search.toLowerCase()}%`));
    }
    receiptsQuery.limit(PER_PAGE).offset((parseInt(page) - 1) * PER_PAGE); // Paginate.

    const countQueryResult = await countQuery;
    const receipts = await receiptsQuery;

    return NextResponse.json({
      receipts,
      total: countQueryResult.at(0)?.count ?? receipts.length,
    } satisfies GetReceiptsResponse);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch receipts." }, { status: 500 });
  }
}
