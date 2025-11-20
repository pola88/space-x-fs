"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsers1763645008402 = void 0;
class CreateUsers1763645008402 {
    constructor() {
        this.name = 'CreateUsers1763645008402';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "temporary_favorites" ("id" integer PRIMARY KEY NOT NULL, "flight_number" integer NOT NULL, "user_id" integer NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()))`);
            yield queryRunner.query(`INSERT INTO "temporary_favorites"("id", "flight_number", "user_id", "created_at") SELECT "id", "flight_number", "user_id", "created_at" FROM "favorites"`);
            yield queryRunner.query(`DROP TABLE "favorites"`);
            yield queryRunner.query(`ALTER TABLE "temporary_favorites" RENAME TO "favorites"`);
            yield queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
            yield queryRunner.query(`CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
            yield queryRunner.query(`CREATE TABLE "temporary_favorites" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "flight_number" integer NOT NULL, "user_id" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
            yield queryRunner.query(`INSERT INTO "temporary_favorites"("id", "flight_number", "user_id", "created_at") SELECT "id", "flight_number", "user_id", "created_at" FROM "favorites"`);
            yield queryRunner.query(`DROP TABLE "favorites"`);
            yield queryRunner.query(`ALTER TABLE "temporary_favorites" RENAME TO "favorites"`);
            yield queryRunner.query(`CREATE INDEX "IDX_35a6b05ee3b624d0de01ee5059" ON "favorites" ("user_id") `);
            yield queryRunner.query(`CREATE UNIQUE INDEX "IDX_998f1a7ea312d4c49d6480baea" ON "favorites" ("user_id", "flight_number") `);
            yield queryRunner.query(`DROP INDEX "IDX_35a6b05ee3b624d0de01ee5059"`);
            yield queryRunner.query(`DROP INDEX "IDX_998f1a7ea312d4c49d6480baea"`);
            yield queryRunner.query(`CREATE TABLE "temporary_favorites" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "flight_number" integer NOT NULL, "user_id" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_35a6b05ee3b624d0de01ee50593" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
            yield queryRunner.query(`INSERT INTO "temporary_favorites"("id", "flight_number", "user_id", "created_at") SELECT "id", "flight_number", "user_id", "created_at" FROM "favorites"`);
            yield queryRunner.query(`DROP TABLE "favorites"`);
            yield queryRunner.query(`ALTER TABLE "temporary_favorites" RENAME TO "favorites"`);
            yield queryRunner.query(`CREATE INDEX "IDX_35a6b05ee3b624d0de01ee5059" ON "favorites" ("user_id") `);
            yield queryRunner.query(`CREATE UNIQUE INDEX "IDX_998f1a7ea312d4c49d6480baea" ON "favorites" ("user_id", "flight_number") `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP INDEX "IDX_998f1a7ea312d4c49d6480baea"`);
            yield queryRunner.query(`DROP INDEX "IDX_35a6b05ee3b624d0de01ee5059"`);
            yield queryRunner.query(`ALTER TABLE "favorites" RENAME TO "temporary_favorites"`);
            yield queryRunner.query(`CREATE TABLE "favorites" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "flight_number" integer NOT NULL, "user_id" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
            yield queryRunner.query(`INSERT INTO "favorites"("id", "flight_number", "user_id", "created_at") SELECT "id", "flight_number", "user_id", "created_at" FROM "temporary_favorites"`);
            yield queryRunner.query(`DROP TABLE "temporary_favorites"`);
            yield queryRunner.query(`CREATE UNIQUE INDEX "IDX_998f1a7ea312d4c49d6480baea" ON "favorites" ("user_id", "flight_number") `);
            yield queryRunner.query(`CREATE INDEX "IDX_35a6b05ee3b624d0de01ee5059" ON "favorites" ("user_id") `);
            yield queryRunner.query(`DROP INDEX "IDX_998f1a7ea312d4c49d6480baea"`);
            yield queryRunner.query(`DROP INDEX "IDX_35a6b05ee3b624d0de01ee5059"`);
            yield queryRunner.query(`ALTER TABLE "favorites" RENAME TO "temporary_favorites"`);
            yield queryRunner.query(`CREATE TABLE "favorites" ("id" integer PRIMARY KEY NOT NULL, "flight_number" integer NOT NULL, "user_id" integer NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()))`);
            yield queryRunner.query(`INSERT INTO "favorites"("id", "flight_number", "user_id", "created_at") SELECT "id", "flight_number", "user_id", "created_at" FROM "temporary_favorites"`);
            yield queryRunner.query(`DROP TABLE "temporary_favorites"`);
            yield queryRunner.query(`DROP INDEX "IDX_97672ac88f789774dd47f7c8be"`);
            yield queryRunner.query(`DROP TABLE "users"`);
            yield queryRunner.query(`ALTER TABLE "favorites" RENAME TO "temporary_favorites"`);
            yield queryRunner.query(`CREATE TABLE "favorites" ("id" integer PRIMARY KEY NOT NULL, "flight_number" integer NOT NULL, "user_id" integer NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()))`);
            yield queryRunner.query(`INSERT INTO "favorites"("id", "flight_number", "user_id", "created_at") SELECT "id", "flight_number", "user_id", "created_at" FROM "temporary_favorites"`);
            yield queryRunner.query(`DROP TABLE "temporary_favorites"`);
        });
    }
}
exports.CreateUsers1763645008402 = CreateUsers1763645008402;
