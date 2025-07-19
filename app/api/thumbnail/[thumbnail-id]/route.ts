import { Params } from "@/app/types";
import { readdir, readFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";
import mime from "mime";
import { notFound } from "next/navigation";

export async function GET(_req: Request, { params }: Params<"thumbnail-id">) {
  const { "thumbnail-id": thumbnailId } = await params;

  try {
    const thumbnailDir = join(process.cwd(), "thumbnails", thumbnailId);
    const files = await readdir(thumbnailDir);
    const file = files.at(0);
    if (!file) {
      notFound();
    }
    const fileBuffer = await readFile(join(thumbnailDir, file));
    const res = new NextResponse(fileBuffer);

    res.headers.set("Content-Type", mime.getType(file) || "application/octet-stream");

    return res;
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to download file.", { status: 500 });
  }
}
