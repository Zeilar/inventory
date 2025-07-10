"use server";

import { db } from "@/features/db";
import { itemsTable } from "@/features/db/schema";
import type { InferInsertModel } from "drizzle-orm";
import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import { revalidateTag } from "next/cache";
import { resolve } from "path";

export async function createItem(
  data: InferInsertModel<typeof itemsTable>,
  files: File[],
  thumbnail: File
): Promise<number> {
  const result = await db
    .insert(itemsTable)
    .values({
      ...data,
      files: files.map((file) => file.name).join(","),
      archivedAt: data.archived ? new Date().toISOString() : undefined,
    })
    .returning();

  const item = result.at(0);

  if (!item) {
    throw new Error("An unexpected error occurred.", { cause: result });
  }

  const filesDir = resolve(process.cwd(), "files", `${item.id}`);
  if (!existsSync(filesDir)) {
    await mkdir(filesDir);
  }

  await Promise.all(
    files.map(async (file) => {
      const filePath = resolve(filesDir, file.name);
      try {
        await writeFile(filePath, Buffer.from(await file.arrayBuffer()));
      } catch (error) {
        console.error(`Failed to write file ${file.name} to ${filePath}`, error);
      }
    })
  );

  const thumbnailDir = resolve(process.cwd(), "public", "thumbnails", `${item.id}`);
  if (!existsSync(thumbnailDir)) {
    await mkdir(thumbnailDir);
  }
  const thumbnailPath = resolve(thumbnailDir, thumbnail.name);
  try {
    await writeFile(thumbnailPath, Buffer.from(await thumbnail.arrayBuffer()));
  } catch (error) {
    console.error(`Failed to write thumbnail ${thumbnail.name} to ${thumbnailPath}`, error);
  }

  revalidateTag("items");

  return item.id;
}
