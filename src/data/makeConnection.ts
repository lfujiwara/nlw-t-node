import { ConnectionOptions, createConnection } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const rootDir = process.env.NODE_ENV !== "development" ? "dist" : "src";

export const makeConnection = (overrides: Partial<ConnectionOptions> = {}) =>
  createConnection(
    Object.assign(
      {
        type: "postgres",
        url:
          process.env.NODE_ENV === "test"
            ? process.env.POSTGRES_TEST_URL
            : process.env.POSTGRES_URL,
        synchronize: process.env.NODE_ENV === "development",
        entities: [rootDir + "/data/entities/*.{js,ts}"],
        migrations: [rootDir + "/data/migrations/*.{js,ts}"],
      },
      overrides
    ) as ConnectionOptions
  );
