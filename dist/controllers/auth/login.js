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
exports.loginUser = void 0;
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const ServerError_1 = require("../../lib/func/ServerError");
const jwt_1 = require("../../lib/jwt");
const hashing_1 = require("../../lib/func/hashing");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const data = yield db_1.db.select().from(schema_1.UserTable).where((0, drizzle_orm_1.eq)(schema_1.UserTable.email, email)).catch(() => (0, ServerError_1.ServerError)(res, "Error while fetch user from database"));
    if (data.length > 0) {
        if (yield (0, hashing_1.comparePass)(data[0].password, password)) {
            // save accessToken
            res
                .status(200)
                .setHeader("authorization", `Bearer ${(0, jwt_1.JwtGenerate)({ email })}`)
                .json({
                message: "User Logged In"
            });
        }
        else
            (0, ServerError_1.ServerError)(res, "Password Incorrect", 401);
    }
    else
        (0, ServerError_1.ServerError)(res, "User not Found", 404);
});
exports.loginUser = loginUser;
