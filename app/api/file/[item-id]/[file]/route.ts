import { Params } from "@/app/types";
import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";

export async function GET(_req: Request, { params }: Params<"item-id" | "file">) {
  const { "item-id": itemId, file } = await params;
  const filePath = join(process.cwd(), "files", itemId, file);

  try {
    const fileBuffer = await readFile(filePath);
    const res = new NextResponse(fileBuffer);

    res.headers.set("Content-Type", "application/pdf");
    res.headers.set("Content-Disposition", `attachment; filename="${file}"`);

    return res;
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to download file.", { status: 500 });
  }
}
