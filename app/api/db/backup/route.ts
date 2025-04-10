import { createReadStream } from "fs";
import { stat } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const filePath = join(process.cwd(), "inventory.db");

  try {
    const fileStat = await stat(filePath);
    const fileStream = createReadStream(filePath);

    // This definitely works in runtime.
    return new NextResponse(fileStream as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Length": `${fileStat.size}`,
        "Content-Disposition": `attachment; filename="inventory.db"`,
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to download db file.", { status: 500 });
  }
}
