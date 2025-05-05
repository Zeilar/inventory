"use server";

import { db } from "@/features/db";
import { itemsTable } from "@/features/db/schema";
import { eq, type InferInsertModel } from "drizzle-orm";
import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import { revalidateTag } from "next/cache";
import { resolve } from "path";

export async function createItem(
  data: InferInsertModel<typeof itemsTable>,
  files: File[]
): Promise<number> {
  const { id } = db.insert(itemsTable).values(data).returning().get();

  const filesDir = resolve(process.cwd(), "files", `${id}`);
  if (!existsSync(filesDir)) {
    await mkdir(filesDir);
  }

  const uploadedFiles: string[] = [];
  await Promise.all(
    files.map(async (file) => {
      const filePath = resolve(filesDir, file.name);
      try {
        await writeFile(filePath, Buffer.from(await file.arrayBuffer()));
        uploadedFiles.push(file.name);
      } catch (error) {
        console.error(`Failed to write file ${file.name} to ${filePath}`, error);
      }
    })
  );

  await db
    .update(itemsTable)
    .set({ files: uploadedFiles.join(","), ...data })
    .where(eq(itemsTable.id, id));

  revalidateTag("items");

  return id;
}
