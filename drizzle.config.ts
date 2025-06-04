import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./features/db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    port: parseInt(process.env.DB_PORT),
    ssl: false,
  },
});
