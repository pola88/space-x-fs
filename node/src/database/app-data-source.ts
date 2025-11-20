import { DataSource } from "typeorm";

const isTest = process.env.NODE_ENV === "test";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: isTest ? ":memory:" : "./src/database/spacex.sql",
  entities: isTest 
    ? ["./src/entities/**/*.ts"] 
    : ["./dist/entities/**/*{.ts,.js}"],
  logging: !isTest,
  synchronize: isTest,
  dropSchema: isTest,
  migrationsRun: false,
  migrations: isTest ? [] : ["./dist/database/migrations/**/*{.ts,.js}"]
});
