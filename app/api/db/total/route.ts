import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";

export async function GET() {
  try {
    const dbFile = await readFile(join(process.cwd(), "inventory.db"));
    return NextResponse.json(dbFile.byteLength);
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to download db file.", { status: 500 });
  }
}
