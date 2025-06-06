import { NextResponse } from "next/server";
import { db } from "@/features/db";
import { z } from "zod";

export async function GET() {
  try {
    const tablesRes = z.array(z.object({ table_name: z.string() })).parse(
      await db.execute(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type='BASE TABLE';
    `)
    );
    const output: Record<string, unknown[]> = {};
    for (const { table_name } of tablesRes) {
      output[table_name] = await db.execute(`SELECT * FROM "${table_name}"`);
    }
    return NextResponse.json(output);
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to download db file.", { status: 500 });
  }
}
