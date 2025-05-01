"use server";

import { revalidateTag } from "next/cache";

export async function updateItem(
  id: number,
  title: string | undefined,
  image: string
): Promise<void>;

export async function updateItem(
  id: number,
  title: string | undefined,
  image?: never
): Promise<void>;

export async function updateItem(
  id: number,
  title: string | undefined,
  image?: string // base64.
) {
  const imageId = "";

  console.log("Updated receipt.");

  if (image) {
    console.log("Updated image.");
  }

  revalidateTag("receipts");
  revalidateTag(`receipts-${id}`);
  revalidateTag(`image-${imageId}`);
}
