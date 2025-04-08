"use server";

import { db } from "@/features/db";
import { Image, imagesTable, receiptsTable } from "@/features/db/schema";
import { revalidateTag } from "next/cache";
import { eq } from "drizzle-orm";
import base58 from "base58-random";
import {
  base64ImageToFile,
  processImage,
  removeImageFromDisk,
  writeImageToDisk,
} from "@/common/image/actions";
import { imageIdLength } from "@/common/image";

function getReceiptImage(receiptId: number): Image | undefined {
  return db.select().from(imagesTable).where(eq(imagesTable.receiptId, receiptId)).get();
}

export async function updateReceipt(
  id: number,
  title: string | undefined,
  image: string
): Promise<void>;

export async function updateReceipt(
  id: number,
  title: string | undefined,
  image?: undefined
): Promise<void>;

export async function updateReceipt(
  id: number,
  title: string | undefined,
  image?: string // base64.
) {
  const imageId = base58(imageIdLength);

  await db.update(receiptsTable).set({ title }).where(eq(receiptsTable.id, id));

  console.log("Updated receipt.");

  if (image) {
    const imageBlob = await processImage(base64ImageToFile(imageId, image));

    const existingImage = getReceiptImage(id);

    if (existingImage) {
      await db.update(imagesTable).set({ id: imageId }).where(eq(imagesTable.id, existingImage.id));
    } else {
      await db.insert(imagesTable).values({ id: imageId, receiptId: id });
    }

    await writeImageToDisk(imageId, imageBlob);

    console.log("Updated image.");
  } else {
    const existingImage = getReceiptImage(id);
    if (existingImage) {
      await Promise.all([
        db.delete(imagesTable).where(eq(imagesTable.receiptId, id)),
        removeImageFromDisk(existingImage.id),
      ]);
      console.log("Deleted image.");
    }
  }

  revalidateTag("receipts");
  revalidateTag(`receipts-${id}`);
  revalidateTag(`image-${imageId}`);
}
