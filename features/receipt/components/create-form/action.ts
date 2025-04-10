"use server";

import { db } from "@/features/db";
import { imagesTable, receiptsTable } from "@/features/db/schema";
import { revalidateTag } from "next/cache";
import base58 from "base58-random";
import { base64ImageToFile, processImage, writeImageToDisk } from "@/common/image/actions";
import { imageIdLength } from "@/common/image";

export async function createReceipt(title: string, image: string): Promise<void>;

export async function createReceipt(title: string, image?: undefined): Promise<void>;

export async function createReceipt(
  title: string,
  image?: string // base64.
): Promise<void> {
  const imageId = base58(imageIdLength);

  const { lastInsertRowid } = await db.insert(receiptsTable).values({ title });
  if (lastInsertRowid && image) {
    const imageBlob = await processImage(base64ImageToFile(imageId, image));
    await Promise.all([
      writeImageToDisk(imageId, imageBlob),
      db.insert(imagesTable).values({ id: imageId, receiptId: Number(lastInsertRowid) }),
    ]);
  }

  console.log("Created receipt.");

  revalidateTag("receipts");
  revalidateTag("receipts-total");
}
