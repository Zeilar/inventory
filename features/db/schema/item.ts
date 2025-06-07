import { pgTable, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { type InferSelectModel, sql } from "drizzle-orm";

export type Item = InferSelectModel<typeof itemsTable>;

export const itemsTable = pgTable("items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  /**
   * Nullable. Doesn't refer to anything in the app.
   */
  articleId: text("article_id"),
  quantity: integer("quantity").notNull().default(1),
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
  originalPrice: text("original_price"), // E.g "38 SEK".
  archivedAt: timestamp("archived_at", { withTimezone: false }),
  createdAt: timestamp("created_at", { withTimezone: false }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: false })
    .defaultNow()
    .notNull()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});
