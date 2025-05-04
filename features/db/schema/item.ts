import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { type InferSelectModel, sql } from "drizzle-orm";

export type Item = InferSelectModel<typeof itemsTable>;

export const itemsTable = sqliteTable("items", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  articleId: text(), // Nullable. Doesn't refer to anything in the app.
  quantity: int().default(1),
  files: text().notNull().default(""), // Comma separated file paths.
  createdAt: text()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
