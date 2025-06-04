import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { itemsTable, settingsTable } from "./schema";

// If any program runs this file without Next's env loader, variable interpolation won't work.
// So we do it here to avoid any issues.
const DB_URL = `${process.env.DB_TYPE}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

// Create the Drizzle ORM instance
export const db = drizzle(postgres(DB_URL), {
  schema: {
    items: itemsTable,
    settings: settingsTable,
  },
  logger: process.env.NODE_ENV === "development",
});
