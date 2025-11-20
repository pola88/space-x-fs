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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserAndPassword = exports.createUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const app_data_source_1 = require("../database/app-data-source");
const users_1 = require("../entities/users");
const createUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const usersRepo = app_data_source_1.AppDataSource.getRepository(users_1.Users);
    const user = yield usersRepo.findOne({ where: { email } });
    if (user) {
        throw new Error("User already exists");
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const newUser = usersRepo.create({ email, password: hashedPassword });
    yield usersRepo.save(newUser);
    const token = generateToken(newUser);
    return { user: newUser, token };
});
exports.createUser = createUser;
const validateUserAndPassword = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const usersRepo = app_data_source_1.AppDataSource.getRepository(users_1.Users);
    const user = yield usersRepo.findOne({ where: { email } });
    if (!user) {
        throw new Error("User not found");
    }
    const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }
    const token = generateToken(user);
    return { user, token };
});
exports.validateUserAndPassword = validateUserAndPassword;
const generateToken = (user) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    if (!jwtSecretKey) {
        throw new Error("JWT Secret not set");
    }
    const data = {
        time: new Date(),
        userId: user.id,
    };
    return jsonwebtoken_1.default.sign(data, jwtSecretKey, { expiresIn: "30d" });
};
