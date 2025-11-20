import { auth } from "../../src/middlewares/auth";
import jwt from "jsonwebtoken";

describe("auth middleware", () => {
  it("should return 401 if no token is provided", () => {
    const req = { headers: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    auth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if the token is invalid", () => {
    const req = { headers: { authorization: "Bearer invalid" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    auth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if the token is expired", () => {
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) - 1 }, process.env.JWT_SECRET_KEY);
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    auth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
    expect(next).not.toHaveBeenCalled();
  });

  it('calls next if the token is valid', () => {
    const token = jwt.sign({ time: Date.now(), userId: 123 }, process.env.JWT_SECRET_KEY);
    const req = { headers: { authorization: `Bearer ${token}` }, currentUserId: null };
    const next = jest.fn();
    auth(req, {}, next);
    expect(next).toHaveBeenCalledWith();
    expect(req.currentUserId).toEqual(123);
  });
});