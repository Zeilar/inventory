import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import ora from "ora";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const spinner = ora({
      text: "Applying migrations...",
      isEnabled: true,
    });
    spinner.start();
    await migrate(
      drizzle(
        new Pool({
          user: process.env.DB_USER,
          host: process.env.DB_HOST,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          port: parseInt(process.env.DB_PORT),
          ssl: false,
        })
      ),
      { migrationsFolder: "./drizzle" }
    );
    console.log("✅ Applied migrations");
    spinner.stop();
  }
}
