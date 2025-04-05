"use server";

import { db } from "@/features/db";
import { imagesTable, receiptsTable } from "@/features/db/schema";
import { revalidateTag } from "next/cache";
import { eq } from "drizzle-orm";
import base58 from "base58-random";
import { base64ImageToFile, imageIdLength, processImage, writeImageToDisk } from "@/common/image";

export async function update(
  id: number,
  title: string | undefined,
  image: string,
  imageWidth: number,
  imageHeight: number
): Promise<void>;

export async function update(
  id: number,
  title: string | undefined,
  image?: undefined,
  imageWidth?: undefined,
  imageHeight?: undefined
): Promise<void>;

export async function update(
  id: number,
  title: string | undefined,
  image?: string, // base64.
  imageWidth?: number,
  imageHeight?: number
) {
  const imageId = base58(imageIdLength);

  await db.update(receiptsTable).set({ title }).where(eq(receiptsTable.id, id));

  console.log("Updated receipt.");

  if (image && imageWidth && imageHeight) {
    const imageBlob = await processImage(
      base64ImageToFile(imageId, image),
      imageWidth,
      imageHeight
    );

    const existingImage = await db
      .select()
      .from(imagesTable)
      .where(eq(imagesTable.receiptId, id))
      .get();

    if (existingImage) {
      await db.update(imagesTable).set({ id: imageId }).where(eq(imagesTable.id, existingImage.id));
    } else {
      await db.insert(imagesTable).values({ id: imageId, receiptId: id });
    }

    await writeImageToDisk(imageId, imageBlob);

    console.log("Updated image.");
  }

  revalidateTag("receipts");
  revalidateTag(`receipts-${id}`);
  revalidateTag(`image-${imageId}`);
}
