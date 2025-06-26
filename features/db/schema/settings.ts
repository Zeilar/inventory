import { pgTable, serial, json, timestamp } from "drizzle-orm/pg-core";
import { type InferSelectModel, sql } from "drizzle-orm";

export type Settings = InferSelectModel<typeof settingsTable>;
export type SettingsValues = Settings["value"];

export const settingsTable = pgTable("settings", {
  id: serial("id").primaryKey(),
  value: json("value").$type<{ itemsPerPage: number }>().default({ itemsPerPage: 10 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .defaultNow()
    .notNull()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});
