/**
 * This file depends on the database and its tables existing.
 */

import "dotenv/config"; // Must be run before importing `db`.
import { db } from ".";
import { itemsTable, settingsTable } from "./schema";
import { faker } from "@faker-js/faker";
import { InferInsertModel } from "drizzle-orm";
import ora from "ora";

async function seedItems(count: number = 100): Promise<void> {
  const spinner = ora({
    text: "Seeding items...",
    isEnabled: true,
  }).start();
  const items: Array<InferInsertModel<typeof itemsTable>> = Array.from({ length: count }, () => {
    const archived = Math.random() < 0.3; // Make 30% archived.
    const tags = faker.helpers.multiple(() => faker.commerce.productMaterial(), {
      count: Math.random() * 10,
    });
    return {
      title: faker.commerce.productName(),
      articleId: faker.string.alphanumeric({ length: 15 }),
      quantity: faker.number.int({ min: 0, max: 5 }),
      createdAt: faker.date.recent({ days: 50 }).toISOString(),
      archived,
      archivedAt: archived ? faker.date.recent({ days: 50 }).toISOString() : undefined,
      tags: [...new Set(tags)].join(","), // Tags must be unique.
      thumbnail: "",
    };
  });
  await db.insert(itemsTable).values(items);
  spinner.succeed("✅ Seeded items");
}

async function seedSettings(): Promise<void> {
  const spinner = ora({
    text: "Seeding settings...",
    isEnabled: true,
  }).start();
  await db.insert(settingsTable).values({});
  spinner.succeed("✅ Seeded settings");
}

async function seed() {
  await seedItems();
  await seedSettings();
  console.log("✅ Successfully seeded database");
  const spinner = ora({
    text: "Closing connection... press Ctrl+C if the program does not exit",
    isEnabled: true,
  });
  await db.$client.end();
  spinner.succeed("✅ Closed connection");
}

seed();
