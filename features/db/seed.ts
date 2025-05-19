/**
 * This file depends on the database and its tables existing.
 */

import "dotenv/config"; // Must be run before importing `db`.
import { db } from ".";
import { itemsTable, settingsTable } from "./schema";
import { faker } from "@faker-js/faker";
import { InferInsertModel } from "drizzle-orm";

async function seedItems(count: number = 100): Promise<void> {
  const items: Array<InferInsertModel<typeof itemsTable>> = Array.from({ length: count }, () => ({
    title: faker.commerce.productName(),
    articleId: faker.string.alphanumeric({ length: 15 }),
    quantity: faker.number.int({ min: 0, max: 5 }),
    createdAt: faker.date.recent({ days: 50 }).toISOString(),
    archived: Math.random() < 0.3, // Make 30% archived.
    tags: faker.helpers
      .multiple(() => faker.commerce.productMaterial(), { count: Math.random() * 10 })
      .join(","),
  }));
  await db.insert(itemsTable).values(items);
}

async function seedSettings(): Promise<void> {
  await db.insert(settingsTable).values({});
}

seedItems();
seedSettings();
