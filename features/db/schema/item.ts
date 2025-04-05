import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { receiptsTable } from "./receipt";
import { sql } from "drizzle-orm";

export const itemsTable = sqliteTable("items", {
  id: int().primaryKey({ autoIncrement: true }),
  image: text(),
  receiptId: int().references(() => receiptsTable.id, { onDelete: "cascade" }),
  createdAt: text().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});
