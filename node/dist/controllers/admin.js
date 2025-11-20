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
exports.signup = exports.generateToken = void 0;
const admin_1 = require("../services/admin");
const generateToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    if (!jwtSecretKey) {
        return res.status(400).send("JWT Secret not set");
    }
    if (!email || !password) {
        return res.status(400).send("Email or password not set");
    }
    try {
        const { token } = yield (0, admin_1.validateUserAndPassword)(email, password);
        return res.status(201).send({ token });
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
});
exports.generateToken = generateToken;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const { user, token } = yield (0, admin_1.createUser)(email, password);
        return res.status(201).send({ token });
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
});
exports.signup = signup;
