import { readdir, stat } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";

async function getDirectorySize(path: string): Promise<number> {
  let total = 0;
  const items = await readdir(path, { withFileTypes: true });

  for (const item of items) {
    const fullPath = join(path, item.name);

    if (item.isDirectory()) {
      total += await getDirectorySize(fullPath);
    } else if (item.isFile()) {
      const stats = await stat(fullPath);
      total += stats.size;
    }
  }

  return total;
}

export async function GET() {
  try {
    return NextResponse.json(await getDirectorySize(join(process.cwd(), "files")));
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to get files directory size", { status: 500 });
  }
}
