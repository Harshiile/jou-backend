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
exports.signUser = void 0;
const APIError_1 = __importDefault(require("../../lib/Error/APIError"));
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const ServerError = () => { throw new APIError_1.default(500, "Internal Server Error"); };
const signUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body) {
        const { email, password, role, name } = req.body;
        // data - fetch from DB
        const data = yield db_1.db.select().from(schema_1.User).where((0, drizzle_orm_1.eq)(schema_1.User.email, email)).catch(() => ServerError());
        console.table(data);
        if (!(data.length > 0)) {
            // save accessToken 
            yield db_1.db.insert(schema_1.User).values({
                name,
                role,
                email,
                password,
                refreshToken: 'xx-xxx-xxxx-xxxx'
            }).catch(() => ServerError());
            res
                .status(200)
                .json({
                message: "User Signed In"
            });
        }
        else
            throw new APIError_1.default(409, "User Already Exist");
    }
    else
        throw new APIError_1.default(500, "Server Error");
});
exports.signUser = signUser;
