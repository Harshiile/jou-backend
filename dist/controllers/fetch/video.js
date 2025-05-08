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
exports.getVideosFromWorkSpace = void 0;
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const ServerError_1 = require("../../lib/func/ServerError");
const getVideosFromWorkSpace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { workspace } = req.query;
    if (typeof (workspace) == 'string') {
        const videos = yield db_1.db.select().from(schema_1.VideoTable).where((0, drizzle_orm_1.eq)(schema_1.VideoTable.workspace, workspace)).catch(() => (0, ServerError_1.ServerError)(res, "Error while fetch videoes of workspace from database"));
        res.json({
            message: "Videos from workspace",
            data: { videos }
        });
    }
});
exports.getVideosFromWorkSpace = getVideosFromWorkSpace;
