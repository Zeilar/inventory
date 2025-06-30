function sleep(): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

const retries = 5;

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { default: ora } = await import("ora");
    const { migrate } = await import("drizzle-orm/node-postgres/migrator");
    const { drizzle } = await import("drizzle-orm/node-postgres");
    const { Pool } = await import("pg");

    const spinner = ora({
      text: "Applying migrations...",
      isEnabled: true,
    });

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        spinner.start();
        const db = drizzle(
          new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: parseInt(process.env.DB_PORT),
            ssl: false,
          })
        );
        await migrate(db, { migrationsFolder: "./drizzle" });
        spinner.succeed("✅ Applied migrations");
        return;
      } catch (error) {
        spinner.fail(
          `❌ Attempt ${attempt} failed: ${error instanceof Error ? error.message : String(error)}`
        );
        if (attempt < retries) {
          console.log(`🔁 Retrying ${attempt}/${retries}...`);
          await sleep();
        } else {
          console.error("🚨 All attempts to apply migrations failed.");
          throw error;
        }
      }
    }
  }
}
