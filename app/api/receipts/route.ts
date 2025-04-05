import { db } from "@/features/db";
import { imagesTable, Receipts, receiptsTable } from "@/features/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    return NextResponse.json(
      (await db
        .select()
        .from(receiptsTable)
        .leftJoin(imagesTable, eq(receiptsTable.id, imagesTable.receiptId))) satisfies Receipts
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch receipts." }, { status: 500 });
  }
}
