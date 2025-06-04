import { db } from "@/features/db";
import { itemsTable } from "@/features/db/schema";
import { count } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = (await db.select({ count: count() }).from(itemsTable)).at(0);
    if (!res) {
      throw new Error("Failed to retrieve receipts count.", { cause: res });
    }
    return NextResponse.json(res.count);
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to fetch total.", { status: 500 });
  }
}
