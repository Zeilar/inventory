import { db } from "@/features/db";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  try {
    const result = await db.execute(
      "SELECT pg_size_pretty(pg_database_size(current_database())) AS db_size;"
    );
    const { db_size } = z.object({ db_size: z.string() }).parse(result.at(0));
    return NextResponse.json(db_size);
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to download db file.", { status: 500 });
  }
}
