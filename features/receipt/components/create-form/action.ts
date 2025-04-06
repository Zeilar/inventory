"use server";

import { db } from "@/features/db";
import { imagesTable, receiptsTable } from "@/features/db/schema";
import { revalidateTag } from "next/cache";
import base58 from "base58-random";
import { base64ImageToFile, imageIdLength, processImage, writeImageToDisk } from "@/common/image";

export async function createReceipt(
  title: string,
  image: string,
  imageWidth: number,
  imageHeight: number
): Promise<void>;

export async function createReceipt(
  title: string,
  image?: undefined,
  imageWidth?: undefined,
  imageHeight?: undefined
): Promise<void>;

export async function createReceipt(
  title: string,
  image?: string, // base64.
  imageWidth?: number,
  imageHeight?: number
): Promise<void> {
  const imageId = base58(imageIdLength);

  const { lastInsertRowid } = await db.insert(receiptsTable).values({ title });
  if (lastInsertRowid && image && imageWidth && imageHeight) {
    const imageBlob = await processImage(
      base64ImageToFile(imageId, image),
      imageWidth,
      imageHeight
    );
    await Promise.all([
      writeImageToDisk(imageId, imageBlob),
      db.insert(imagesTable).values({ id: imageId, receiptId: Number(lastInsertRowid) }),
    ]);
  }

  console.log("Created receipt.");

  revalidateTag("receipts");
}
