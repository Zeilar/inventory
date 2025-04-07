/**
 * This file depends on the database and its tables existing.
 */

import "dotenv/config"; // Must be run before importing `db`.
import { db } from ".";
import { itemsTable, receiptsTable } from "./schema";
import { faker } from "@faker-js/faker";
import { InferInsertModel } from "drizzle-orm";

async function seedReceipts(count: number, itemIds: number[]): Promise<void> {
  const receipts: Array<InferInsertModel<typeof receiptsTable>> = Array.from(
    { length: count },
    (_, i) => ({
      title: faker.commerce.productName(),
      itemId: itemIds[i],
    })
  );
  await db.insert(receiptsTable).values(receipts);
}

async function seedItems(count: number = 500): Promise<void> {
  const items: Array<InferInsertModel<typeof itemsTable>> = Array.from(
    { length: count },
    () => ({})
  );
  const insertedItems = await db.insert(itemsTable).values(items).returning();
  await seedReceipts(
    count,
    insertedItems.flatMap(({ id }) => id)
  );
}

seedItems();
