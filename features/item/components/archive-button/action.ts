"use server";

import { db } from "@/features/db";
import { itemsTable } from "@/features/db/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export async function toggleItemArchive(ids: number[]): Promise<boolean[]> {
  return Promise.all(
    ids.map(async (id) => {
      const item = db.select().from(itemsTable).where(eq(itemsTable.id, id)).get();

      if (!item) {
        throw new Error(`Failed to toggle archive on item with id ${id}.`, { cause: item });
      }

      const newArchivedStatus = !item.archived;

      await db
        .update(itemsTable)
        .set({ archived: newArchivedStatus })
        .where(eq(itemsTable.id, item.id));

      revalidateTag("items");
      revalidateTag(`items-${id}`);

      return newArchivedStatus;
    })
  );
}
