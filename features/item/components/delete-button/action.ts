"use server";

import { db } from "@/features/db";
import { itemsTable } from "@/features/db/schema";
import { eq } from "drizzle-orm";
import { existsSync } from "fs";
import { rm } from "fs/promises";
import { revalidateTag } from "next/cache";
import { resolve } from "path";

export async function deleteItem(id: number): Promise<number> {
  const item = db.delete(itemsTable).where(eq(itemsTable.id, id)).returning().get();

  if (!item) {
    const errorMsg = `Failed to delete item with id ${id}.`;
    console.error(errorMsg);
    throw new Error(errorMsg, { cause: item });
  }

  const filesDir = resolve(process.cwd(), "files", `${id}`);

  if (existsSync(filesDir)) {
    await rm(resolve(process.cwd(), "files", `${id}`), { recursive: true });
  }

  revalidateTag("items");
  revalidateTag(`items-${id}`);

  return id;
}
