import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { type InferSelectModel, sql } from "drizzle-orm";

export type Item = InferSelectModel<typeof itemsTable>;

export const itemsTable = sqliteTable("items", {
  id: int().primaryKey({ autoIncrement: true }),
  createdAt: text().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});
