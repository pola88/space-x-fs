import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { AppDataSource } from "../database/app-data-source";
import { Users } from "../entities/users";
import { JwtUser } from "../types/jwt";

type UserAndToken = {
  user: Users;
  token: string;
};

export const createUser = async (email: string, password: string): Promise<UserAndToken> => {
  const usersRepo = AppDataSource.getRepository(Users);
  const user = await usersRepo.findOne({ where: { email } });
  if (user) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = usersRepo.create({ email, password: hashedPassword });
  await usersRepo.save(newUser);
  const token = generateToken(newUser);
  return { user: newUser, token };
};

export const validateUserAndPassword = async (email: string, password: string): Promise<UserAndToken> => {
  const usersRepo = AppDataSource.getRepository(Users);
  const user = await usersRepo.findOne({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = generateToken(user);
  return { user, token };
};

const generateToken = (user: Users): string => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  if (!jwtSecretKey) {
    throw new Error("JWT Secret not set");
  }
  const data: JwtUser = {
    time: new Date(),
    userId: user.id,
  };
  return jwt.sign(data, jwtSecretKey, { expiresIn: "30d" });
};