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
exports.getWorkSpaces = void 0;
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const ServerError_1 = require("../../lib/func/ServerError");
const getWorkSpaces = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = req.query;
    if (typeof (userId) == 'string') {
        if (role == 'youtuber') {
            const workspaces = yield db_1.db.select({
                id: schema_1.WorkspaceTable.id,
                name: schema_1.WorkspaceTable.name,
                userHandle: schema_1.WorkspaceTable.userHandle,
                avatar: schema_1.WorkspaceTable.avatar,
            }).from(schema_1.WorkspaceTable).where((0, drizzle_orm_1.eq)(schema_1.WorkspaceTable.owner, userId));
            res.json({
                message: "Workspaces of Youtuber",
                data: { workspaces }
            });
        }
        else if (role == 'editor') {
            const subQuery = db_1.db.select({ workspace: schema_1.EditorWorkspaceJoinTable.workspace }).from(schema_1.EditorWorkspaceJoinTable).where((0, drizzle_orm_1.eq)(schema_1.EditorWorkspaceJoinTable.editor, userId));
            const workspaces = yield db_1.db.select().from(schema_1.WorkspaceTable).where((0, drizzle_orm_1.inArray)(schema_1.WorkspaceTable.id, subQuery));
            res.json({
                message: "Workspaces of Editor",
                data: { workspaces }
            });
        }
        else
            (0, ServerError_1.ServerError)(res, "Role is not valid");
    }
    else
        (0, ServerError_1.ServerError)(res, "UserId is not valid");
});
exports.getWorkSpaces = getWorkSpaces;
