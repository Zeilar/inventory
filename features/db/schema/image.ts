import { type InferSelectModel, sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { receiptsTable } from "./receipt";
import { itemsTable } from "./item";

export type Image = InferSelectModel<typeof imagesTable>;

export const imagesTable = sqliteTable("images", {
  id: text().primaryKey(),
  receiptId: int().references(() => receiptsTable.id, { onDelete: "cascade" }),
  itemId: int().references(() => itemsTable.id, { onDelete: "cascade" }),
  createdAt: text().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});
