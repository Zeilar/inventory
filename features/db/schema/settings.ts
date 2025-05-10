import { blob, int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { type InferSelectModel, sql } from "drizzle-orm";

export type Settings = InferSelectModel<typeof settingsTable>;
export type SettingsValues = Settings["value"];

export const settingsTable = sqliteTable("settings", {
  id: int().primaryKey({ autoIncrement: true }),
  value: blob({ mode: "json" })
    .$type<{ itemsPerPage: number }>()
    .default({ itemsPerPage: 10 })
    .notNull(),
  createdAt: text()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
