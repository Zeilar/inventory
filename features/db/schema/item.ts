import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { type InferSelectModel, sql } from "drizzle-orm";

export type Item = InferSelectModel<typeof itemsTable>;

export const itemsTable = sqliteTable("items", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  /**
   * Nullable. Doesn't refer to anything in the app.
   */
  articleId: text(),
  quantity: int().notNull().default(1),
  /**
   * Comma separated file paths.
   */
  files: text().notNull().default(""),
  createdAt: text()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
