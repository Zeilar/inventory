import { db } from "@/features/db";
import { imagesTable, type Receipts, receiptsTable } from "@/features/db/schema";
import { NextResponse } from "next/server";
import { eq, like } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const search = new URL(req.url).searchParams.get("search")?.trim();
    const query = db
      .select()
      .from(receiptsTable)
      .leftJoin(imagesTable, eq(receiptsTable.id, imagesTable.receiptId));
    if (search) {
      query.where(like(receiptsTable.title, search));
    }
    return NextResponse.json((await query) satisfies Receipts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch receipts." }, { status: 500 });
  }
}
