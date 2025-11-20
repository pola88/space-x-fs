"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = require("../controllers/admin");
exports.default = (router) => {
    router.post("/admin/token", admin_1.generateToken);
    router.post("/admin/signup", admin_1.signup);
};
