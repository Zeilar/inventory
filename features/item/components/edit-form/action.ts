"use server";

import { db } from "@/features/db";
import { Item, itemsHistoryTable, itemsTable } from "@/features/db/schema";
import { eq } from "drizzle-orm";
import { existsSync } from "fs";
import { mkdir, rm, writeFile } from "fs/promises";
import { revalidateTag } from "next/cache";
import { resolve } from "path";

export async function updateItem(
  id: number,
  data: Partial<Item>,
  files: File[],
  filesToRemove: string[],
  thumbnail: File | null
): Promise<void> {
  const currentItem = (await db.select().from(itemsTable).where(eq(itemsTable.id, id))).at(0);
  if (!currentItem) {
    throw new Error(`Item with id ${id} not found`);
  }

  const filesDir = resolve(process.cwd(), "files", `${id}`);
  if (!existsSync(filesDir)) {
    await mkdir(filesDir, { recursive: true });
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

  const removedFiles: string[] = [];
  await Promise.all(
    filesToRemove.map(async (fileToRemove) => {
      const filePath = resolve(filesDir, fileToRemove);
      try {
        await rm(filePath);
        removedFiles.push(fileToRemove);
      } catch (error) {
        console.error(`Failed to remove file ${fileToRemove} in ${filePath}`, error);
      }
    })
  );

  let filesToSave = currentItem.files.split(",");
  // Filter out files that are selected for removal.
  filesToSave = filesToSave.filter((file) => !removedFiles.includes(file));
  filesToSave.push(...uploadedFiles);
  filesToSave = filesToSave.filter(Boolean); // Remove empty strings due to comma at the front.

  // Add current (not previous) version to history. Copy everything except auto generated columns.
  await Promise.all([
    db.insert(itemsHistoryTable).values({
      itemId: id,
      ...currentItem,
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    }),
    db
      .update(itemsTable)
      .set({ ...data, files: filesToSave.join(",") })
      .where(eq(itemsTable.id, id)),
  ]);

  if (thumbnail && currentItem.thumbnail !== thumbnail.name) {
    const thumbnailDir = resolve(process.cwd(), "thumbnails", `${currentItem.id}`);
    if (!existsSync(thumbnailDir)) {
      await mkdir(thumbnailDir, { recursive: true });
    }
    const thumbnailPath = resolve(thumbnailDir, thumbnail.name);
    try {
      await writeFile(thumbnailPath, Buffer.from(await thumbnail.arrayBuffer()));
    } catch (error) {
      console.error(`Failed to write thumbnail ${thumbnail.name} to ${thumbnailPath}`, error);
    }
    try {
      await rm(resolve(thumbnailDir, currentItem.thumbnail));
    } catch (error) {
      console.error(
        `Failed to remove thumbnail ${currentItem.thumbnail} at ${thumbnailDir}`,
        error
      );
    }
  }

  revalidateTag("items");
  revalidateTag(`items-${id}`);
  revalidateTag(`items-history-${id}`);
}
