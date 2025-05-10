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
exports.editorContribution = void 0;
const ServerError_1 = require("../../lib/func/ServerError");
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const uuid_1 = require("uuid");
const editorContribution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const workspaceId = req.query['ws'];
    (!workspaceId && !(0, uuid_1.validate)(workspaceId)) && (0, ServerError_1.ServerError)(res, "Workspace Id Is Invalid");
    const editorContribution = yield db_1.db.select({
        name: schema_1.UserTable.name,
        editors: schema_1.VideoWorkspaceJoinTable.editor,
        count: (0, drizzle_orm_1.sql) `count(*)`
    })
        .from(schema_1.VideoWorkspaceJoinTable)
        .leftJoin(schema_1.UserTable, (0, drizzle_orm_1.eq)(schema_1.UserTable.id, schema_1.VideoWorkspaceJoinTable.editor))
        .groupBy(schema_1.VideoWorkspaceJoinTable.editor, schema_1.UserTable.name)
        .where((0, drizzle_orm_1.eq)(schema_1.VideoWorkspaceJoinTable.workspace, workspaceId === null || workspaceId === void 0 ? void 0 : workspaceId.toString()));
    res.json({
        message: "Editor Contribution in WorkSpace",
        data: {
            editorContribution
        }
    });
});
exports.editorContribution = editorContribution;
