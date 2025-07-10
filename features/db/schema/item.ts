import { pgTable, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { type InferSelectModel, sql } from "drizzle-orm";

export type Item = InferSelectModel<typeof itemsTable>;

export type ItemHistory = InferSelectModel<typeof itemsHistoryTable>;

const itemsTableSchema = {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  /**
   * Nullable. Isn't connected to anything internally in the app.
   */
  articleId: text("article_id"),
  quantity: integer("quantity").notNull().default(1),
  /**
   * File path.
   */
  thumbnail: text("thumbnail").notNull(),
  /**
   * Comma separated file paths.
   */
  files: text("files").notNull().default(""),
  archived: boolean("archived").notNull().default(false),
  /**
   * Comma separated strings. These can be anything the user wants.
   */
  tags: text("tags").notNull().default(""),
  /**
   * Comma separated strings. These can be anything the user wants.
   */
  links: text("links").notNull().default(""),
  price: text("price"), // E.g "38 SEK".
  archivedAt: timestamp("archived_at", { mode: "string", withTimezone: true }),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .defaultNow()
    .notNull()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
};

export const itemsTable = pgTable("items", itemsTableSchema);

export const itemsHistoryTable = pgTable("items_history", {
  ...itemsTableSchema,
  itemId: integer("item_id").notNull(),
});
