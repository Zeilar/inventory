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
  files: File[]
): Promise<number> {
  const { id } = db
    .insert(itemsTable)
    .values({
      ...data,
      files: files.map((file) => file.name).join(","),
      archivedAt: data.archived ? new Date().toISOString() : undefined,
    })
    .returning()
    .get();

  const filesDir = resolve(process.cwd(), "files", `${id}`);
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

  revalidateTag("items");

  return id;
}
