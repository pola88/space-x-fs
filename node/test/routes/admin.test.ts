import request from "supertest";
import express, { Router } from "express";
import bcrypt from "bcryptjs";
import adminRoutes from "../../src/routes/admin";
import { AppDataSource } from "../../src/database/app-data-source";
import { Users } from "../../src/entities/users";
import { clearTables } from "../helpers/database";

describe("admin routes", () => {
  let app: express.Application;

  beforeEach(async () => {
    await clearTables(Users);
    
    app = express();
    app.use(express.json());
    const router = Router();
    adminRoutes(router);
    app.use(router);
  });

  it("should generate a token when POST /admin/token is called with email and password", async () => {
    const usersRepo = AppDataSource.getRepository(Users);
    const hashedPassword = await bcrypt.hash("password", 10);
    await usersRepo.save({
      email: "test@test.com",
      password: hashedPassword,
    });

    const response = await request(app)
      .post("/admin/token")
      .send({ email: "test@test.com", password: "password" })
      .expect(201);

    expect(response.body).toHaveProperty("token");
    expect(typeof response.body.token).toBe("string");
  });

  it("should return 400 when POST /admin/token is called without email and password", async () => {
    const response = await request(app)
      .post("/admin/token")
      .send({ email: "", password: "" })
      .expect(400);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Email or password not set");
  });

  it("should return 400 when POST /admin/token is called with empty body", async () => {
    const response = await request(app)
      .post("/admin/token")
      .send()
      .expect(400);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Email or password not set");
  });
});