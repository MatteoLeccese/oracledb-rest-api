import oracledb from "oracledb";
import "dotenv/config";
import { migrate as migrateSchema } from "./db/migrations/001-create-schema.js";
import { migrate as createPackage } from "./db/migrations/002-create-package.js";

async function runMigrations(): Promise<void> {
  try {
    const connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });

    await migrateSchema(connection);
    await createPackage(connection);

    await connection.close();
    console.log("All migrations completed successfully");
  } catch (error) {
    console.error("There wan an error while running the migrations:", error);
  }
}

runMigrations();
