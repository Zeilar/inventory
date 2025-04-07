import { drizzle } from "drizzle-orm/better-sqlite3";
import { imagesTable, itemsTable, receiptsTable } from "./schema";

export const db = drizzle(process.env.DB_FILE_NAME, {
  logger: process.env.NODE_ENV === "development",
  schema: {
    items: itemsTable,
    receipts: receiptsTable,
    images: imagesTable,
  },
});
