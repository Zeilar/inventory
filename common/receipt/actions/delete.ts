"use server";

import { eq } from "drizzle-orm";
import { rm } from "fs/promises";
import { getImagesDir } from "@/common/image/actions";
import { join } from "path";
import { db } from "@/features/db";
import { imagesTable, receiptsTable } from "@/features/db/schema";
import { revalidateTag } from "next/cache";
import { getImageFilename } from "@/common/image/path";

/**
 * Only use this to delete receipts from the database, otherwise you risk dangling images on disk.
 */
export async function deleteReceipt(id: number): Promise<void> {
  const image = db.select().from(imagesTable).where(eq(imagesTable.receiptId, id)).get();

  await db.delete(receiptsTable).where(eq(receiptsTable.id, id));

  revalidateTag("receipts");
  revalidateTag(`receipts-${id}`);

  if (!image) {
    return;
  }

  await Promise.all([
    rm(join(getImagesDir(), getImageFilename(image.id))),
    db.delete(imagesTable).where(eq(imagesTable.id, image.id)),
  ]);

  revalidateTag(`images-${image.id}`);
}
