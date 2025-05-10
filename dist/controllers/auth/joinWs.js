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
exports.joinWorkSpace = void 0;
const db_1 = require("../../db");
const ServerError_1 = require("../../lib/func/ServerError");
const jwt_1 = require("../../lib/jwt");
const schema_1 = require("../../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const uuid_1 = require("uuid");
const joinWorkSpace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.params.link;
    !link && (0, ServerError_1.ServerError)(res, "Link is not valid");
    const linkData = (0, jwt_1.JwtValidate)(link);
    (typeof (linkData) != 'string' && linkData.expiry <= Date.now()) && (0, ServerError_1.ServerError)(res, "Link is expires");
    // User can signup
    const { userId } = req.body;
    !(0, uuid_1.validate)(userId) && (0, ServerError_1.ServerError)(res, "User Id not valid");
    const [user] = yield db_1.db.select({
        role: schema_1.UserTable.userType
    }).from(schema_1.UserTable).where((0, drizzle_orm_1.eq)(schema_1.UserTable.id, userId));
    !user && (0, ServerError_1.ServerError)(res, "User not found");
    user.role != 'editor' && (0, ServerError_1.ServerError)(res, "Youtuber can't joined any workspace");
    db_1.db.insert(schema_1.EditorWorkspaceJoinTable).values({
        editor: userId,
        workspace: typeof (linkData) != 'string' && linkData.workspaceId
    })
        .then(_ => res.json({
        message: "Join Workspace successfully",
    }))
        .catch(err => err.code == 23505 && (0, ServerError_1.ServerError)(res, "You already in this Workspace"));
});
exports.joinWorkSpace = joinWorkSpace;
