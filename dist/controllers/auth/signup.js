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
exports.signUser = void 0;
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const ServerError_1 = require("../../lib/func/ServerError");
const jwt_1 = require("../../lib/jwt");
const hashing_1 = require("../../lib/func/hashing");
const signUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, userType, name } = req.body;
    const data = yield db_1.db.select().from(schema_1.UserTable).where((0, drizzle_orm_1.eq)(schema_1.UserTable.email, email)).catch(() => (0, ServerError_1.ServerError)(res, "Error while fetching user from database"));
    if (data.length == 0) {
        const hashPassword = yield (0, hashing_1.encryptPass)(password);
        const refreshToken = (0, jwt_1.JwtGenerate)({ email, userType });
        yield db_1.db.insert(schema_1.UserTable).values({
            name,
            email,
            password: hashPassword,
            userType,
            refreshToken
        }).catch(() => (0, ServerError_1.ServerError)(res, "Error while inserting user into database"));
        res
            .status(200)
            .cookie('auth', (0, jwt_1.JwtGenerate)({ refreshToken }), {
            httpOnly: true,
            maxAge: 15 * 60 * 1000
        })
            .json({
            message: "User Signed In",
        });
    }
    else
        (0, ServerError_1.ServerError)(res, "User Already Exist", 409);
});
exports.signUser = signUser;
