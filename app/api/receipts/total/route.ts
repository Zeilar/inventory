import { db } from "@/features/db";
import { receiptsTable } from "@/features/db/schema";
import { count } from "drizzle-orm";
import { NextResponse } from "next/server";

export function GET() {
  const res = db.select({ count: count() }).from(receiptsTable).get();
  if (!res) {
    throw new Error("Failed to retrieve receipts count.", { cause: res });
  }
  return NextResponse.json(res.count);
}
