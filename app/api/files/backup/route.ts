import { NextResponse } from "next/server";
import archiver from "archiver";
import { join } from "path";
import { statSync } from "fs";
import { PassThrough } from "stream";

export async function GET() {
  try {
    const folderPath = join(process.cwd(), "files");

    if (!statSync(folderPath).isDirectory()) {
      return new Response("Not a directory", { status: 400 });
    }

    // Setup streaming zip response.
    const zipStream = new PassThrough();

    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.directory(folderPath, false); // Don't nest in subfolder.
    archive.finalize();

    archive.pipe(zipStream);

    // Works in runtime, so the types should be fine.
    return new Response(zipStream as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="files.zip"`,
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to download files.", { status: 500 });
  }
}
