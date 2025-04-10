import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";

export async function GET() {
  const dbFile = await readFile(join(process.cwd(), "inventory.db"));
  return NextResponse.json(dbFile.byteLength);
}
