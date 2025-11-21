import bcrypt from "bcryptjs";
import { generateToken } from "../../src/controllers/admin";
import { clearTables } from "../helpers/database";
import { Users } from "../../src/entities/users";
import { AppDataSource } from "../../src/database/app-data-source";


describe("admin controller", () => {
  beforeEach(async () => {
    await clearTables(Users);
    jest.clearAllMocks();
  });

  it("should generate a token", async () => {
    const usersRepo = AppDataSource.getRepository(Users);
    const hashedPassword = await bcrypt.hash("password", 10);
    await usersRepo.save({
      email: "test@test.com",
      password: hashedPassword,
    });
    const req = { body: { email: "test@test.com", password: "password" } };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    await generateToken(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({ token: expect.any(String) });
  });

  it("should return 401 when the email or password is incorrect", async () => {
    const req = { body: { email: "test@test.com", password: "password" } };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    await generateToken(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ error: 'Email or password is incorrect' });
  });

  it("should return 400 if the userId is not set", async () => {
    const req = { body: {} };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    await generateToken(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ error: 'Email or password not set' });
  });
});