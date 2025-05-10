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
exports.refreshFetch = exports.fetchUserFromDB = void 0;
const jwt_1 = require("../../lib/jwt");
const ServerError_1 = require("../../lib/func/ServerError");
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const fetchUserFromDB = (userId) => {
    return db_1.db.select({
        id: schema_1.UserTable.id,
        role: schema_1.UserTable.userType
    }).from(schema_1.UserTable).where((0, drizzle_orm_1.eq)(schema_1.UserTable.id, userId));
};
exports.fetchUserFromDB = fetchUserFromDB;
const refreshFetch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.cookies['auth'];
    const userId = req.query['id'];
    let user;
    if (auth) {
        user = (0, jwt_1.JwtValidate)(auth);
    }
    else {
        !userId && (0, ServerError_1.ServerError)(res, "Unauthorized User", 403);
        user = yield (0, exports.fetchUserFromDB)(userId.toString());
    }
    res.json({
        message: "User Fetching When Refreshing The Page",
        data: { user }
    });
});
exports.refreshFetch = refreshFetch;
