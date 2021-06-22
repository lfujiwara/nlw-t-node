import dotenv from "dotenv";

dotenv.config();

module.exports = {
  type: "postgres",
  url: process.env.POSTGRES_URL,
  entities: ["src/data/entities/*.{js,ts}"],
  migrations: ["src/data/migrations/*.{js,ts}"],
  cli: {
    entitiesDir: "src/data/entities",
    migrationsDir: "src/data/migrations",
  },
};
