import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1763645008402 implements MigrationInterface {
    name = 'CreateUsers1763645008402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_favorites" ("id" integer PRIMARY KEY NOT NULL, "flight_number" integer NOT NULL, "user_id" integer NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()))`);
        await queryRunner.query(`INSERT INTO "temporary_favorites"("id", "flight_number", "user_id", "created_at") SELECT "id", "flight_number", "user_id", "created_at" FROM "favorites"`);
        await queryRunner.query(`DROP TABLE "favorites"`);
        await queryRunner.query(`ALTER TABLE "temporary_favorites" RENAME TO "favorites"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE TABLE "temporary_favorites" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "flight_number" integer NOT NULL, "user_id" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_favorites"("id", "flight_number", "user_id", "created_at") SELECT "id", "flight_number", "user_id", "created_at" FROM "favorites"`);
        await queryRunner.query(`DROP TABLE "favorites"`);
        await queryRunner.query(`ALTER TABLE "temporary_favorites" RENAME TO "favorites"`);
        await queryRunner.query(`CREATE INDEX "IDX_35a6b05ee3b624d0de01ee5059" ON "favorites" ("user_id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_998f1a7ea312d4c49d6480baea" ON "favorites" ("user_id", "flight_number") `);
        await queryRunner.query(`DROP INDEX "IDX_35a6b05ee3b624d0de01ee5059"`);
        await queryRunner.query(`DROP INDEX "IDX_998f1a7ea312d4c49d6480baea"`);
        await queryRunner.query(`CREATE TABLE "temporary_favorites" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "flight_number" integer NOT NULL, "user_id" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_35a6b05ee3b624d0de01ee50593" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_favorites"("id", "flight_number", "user_id", "created_at") SELECT "id", "flight_number", "user_id", "created_at" FROM "favorites"`);
        await queryRunner.query(`DROP TABLE "favorites"`);
        await queryRunner.query(`ALTER TABLE "temporary_favorites" RENAME TO "favorites"`);
        await queryRunner.query(`CREATE INDEX "IDX_35a6b05ee3b624d0de01ee5059" ON "favorites" ("user_id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_998f1a7ea312d4c49d6480baea" ON "favorites" ("user_id", "flight_number") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_998f1a7ea312d4c49d6480baea"`);
        await queryRunner.query(`DROP INDEX "IDX_35a6b05ee3b624d0de01ee5059"`);
        await queryRunner.query(`ALTER TABLE "favorites" RENAME TO "temporary_favorites"`);
        await queryRunner.query(`CREATE TABLE "favorites" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "flight_number" integer NOT NULL, "user_id" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "favorites"("id", "flight_number", "user_id", "created_at") SELECT "id", "flight_number", "user_id", "created_at" FROM "temporary_favorites"`);
        await queryRunner.query(`DROP TABLE "temporary_favorites"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_998f1a7ea312d4c49d6480baea" ON "favorites" ("user_id", "flight_number") `);
        await queryRunner.query(`CREATE INDEX "IDX_35a6b05ee3b624d0de01ee5059" ON "favorites" ("user_id") `);
        await queryRunner.query(`DROP INDEX "IDX_998f1a7ea312d4c49d6480baea"`);
        await queryRunner.query(`DROP INDEX "IDX_35a6b05ee3b624d0de01ee5059"`);
        await queryRunner.query(`ALTER TABLE "favorites" RENAME TO "temporary_favorites"`);
        await queryRunner.query(`CREATE TABLE "favorites" ("id" integer PRIMARY KEY NOT NULL, "flight_number" integer NOT NULL, "user_id" integer NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()))`);
        await queryRunner.query(`INSERT INTO "favorites"("id", "flight_number", "user_id", "created_at") SELECT "id", "flight_number", "user_id", "created_at" FROM "temporary_favorites"`);
        await queryRunner.query(`DROP TABLE "temporary_favorites"`);
        await queryRunner.query(`DROP INDEX "IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "favorites" RENAME TO "temporary_favorites"`);
        await queryRunner.query(`CREATE TABLE "favorites" ("id" integer PRIMARY KEY NOT NULL, "flight_number" integer NOT NULL, "user_id" integer NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()))`);
        await queryRunner.query(`INSERT INTO "favorites"("id", "flight_number", "user_id", "created_at") SELECT "id", "flight_number", "user_id", "created_at" FROM "temporary_favorites"`);
        await queryRunner.query(`DROP TABLE "temporary_favorites"`);
    }

}
