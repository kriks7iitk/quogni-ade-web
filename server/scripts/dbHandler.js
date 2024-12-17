const { Client, Pool } = require("pg");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

// Retrieve database configuration from .env file
const dbName = process.env.PG_DB_NAME;
const dbUser = process.env.PG_USER;
const dbPassword = process.env.PG_PASSWORD;
const dbHost = process.env.PG_HOST;
const dbPort = process.env.PG_PORT;

const pool = new Pool({
  host: dbHost,
  port: dbPort,
  user: dbUser,
  password: dbPassword,
  database: dbName,
});
if (!dbName) {
  console.error("Db configurations are not defined in .env file.");
  process.exit(1);
}

const createDatabase = async () => {
  // const client = new Client({
  //   user: dbUser,
  //   password: dbPassword,
  //   host: dbHost,
  //   port: dbPort,
  //   database: "postgres",
  // });

  const client = await pool.connect();

  try {
    // await client.connect();
    console.log(`Connected to PostgreSQL as ${dbUser}.`);

    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    if (res.rowCount > 0) {
      console.log(`Database "${dbName}" already exists.`);
    } else {
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database "${dbName}" created successfully.`);
    }
  } catch (err) {
    console.error("Error creating database:", err);
  } finally {
    await client.release();
    console.log("Disconnected from PostgreSQL.");
    process.exit(0);
  }
};

const dropAllTables = async () => {
  try {
    const client = await pool.connect();

    console.log("Connected to the database");

    // Query to drop all tables
    const dropTablesQuery = `
      DO $$ 
      DECLARE
          table_name text;
      BEGIN
          -- Loop through each table in the current schema
          FOR table_name IN 
              SELECT tablename FROM pg_tables 
              WHERE schemaname = 'public'
          LOOP
              EXECUTE format('DROP TABLE IF EXISTS %I CASCADE', table_name);
          END LOOP;
      END $$;
    `;

    await client.query(dropTablesQuery);
    console.log("Database reset is success");

    client.release();
    process.exit(0);
  } catch (err) {
    console.error("Error resetting db:", err);
    process.exit(1);
  }
};

const main = async () => {
  const action = process.argv[2];

  if (!action) {
    console.error("Please provide an action: 'create' or 'drop'.");
    process.exit(1);
  }

  if (action === "create") {
    await createDatabase();
  } else if (action === "drop") {
    await dropAllTables();
  } else {
    console.error(`Unknown action: ${action}`);
    console.error("Valid actions are: 'create', 'drop'.");
    process.exit(1);
  }
};

main().catch((err) => console.error("Unhandled error:", err));
