"use server";

import { eq } from "drizzle-orm";
import { rm } from "fs/promises";
import { getImageFilename, getImagesDir } from "@/common/image";
import { join } from "path";
import { db } from "@/features/db";
import { imagesTable, receiptsTable } from "@/features/db/schema";
import { revalidateTag } from "next/cache";

/**
 * Only use this to delete receipts from the database, otherwise you risk dangling images on disk.
 */
export async function deleteReceipt(id: number): Promise<void> {
  const imageRows = await db.select().from(imagesTable).where(eq(imagesTable.receiptId, id));
  const image = imageRows.at(0);
  await db.delete(receiptsTable).where(eq(receiptsTable.id, id));
  revalidateTag("receipts");
  revalidateTag(`receipts-${id}`);
  if (!image) {
    return;
  }
  await rm(join(getImagesDir(), getImageFilename(image.id)));
  await db.delete(imagesTable).where(eq(imagesTable.id, image.id));
  revalidateTag(`images-${image.id}`);
}
