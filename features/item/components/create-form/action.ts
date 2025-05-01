"use server";

import { revalidateTag } from "next/cache";

export async function createReceipt(title: string, image: string): Promise<void>;

export async function createReceipt(title: string, image?: never): Promise<void>;

export async function createReceipt(
  title: string,
  image?: string // base64.
): Promise<void> {
  if (image) {
    await Promise.all([]);
  }

  console.log("Created receipt.");

  revalidateTag("receipts");
  revalidateTag("receipts-total");
}
