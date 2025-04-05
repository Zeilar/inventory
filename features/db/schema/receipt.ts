import { type InferSelectModel, sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import type { Image } from "./image";

export type Receipt = InferSelectModel<typeof receiptsTable>;

export interface ReceiptWithImage {
  receipts: Receipt | null;
  images: Image | null;
}

export type Receipts = ReceiptWithImage[];

export const receiptsTable = sqliteTable("receipts", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text(),
  createdAt: text().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});
