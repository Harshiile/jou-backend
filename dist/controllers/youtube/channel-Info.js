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
exports.youtubeChannelInfo = void 0;
const googleapis_1 = require("googleapis");
const ServerError_1 = require("../../lib/func/ServerError");
const OauthClient_1 = require("./OauthClient");
const schema_1 = require("../../db/schema");
const db_1 = require("../../db");
const drizzle_orm_1 = require("drizzle-orm");
const youtubeChannelInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const yt = googleapis_1.google.youtube({ version: 'v3', auth: OauthClient_1.oauth2Client });
    const { code, userId } = req.query;
    !code && (0, ServerError_1.ServerError)(res, "Code not generated after youtube signup");
    const youtubeChannel = yield OauthClient_1.oauth2Client.getToken(code.toString());
    // store refreshToken on db - Workspace Table
    !youtubeChannel && (0, ServerError_1.ServerError)(res, "Error while fetching youtube channel refreshToken");
    const refToken = youtubeChannel.tokens.refresh_token;
    OauthClient_1.oauth2Client.setCredentials({
        refresh_token: refToken
    });
    const channels = yield yt.channels.list({
        part: ['id', 'snippet'],
        mine: true
    });
    !channels && (0, ServerError_1.ServerError)(res, "Error while fetching youtube channel info");
    channels.data.items.length <= 0 && (0, ServerError_1.ServerError)(res, "Error while fetching youtube channel info", 404, "No channel associated with given youtube account");
    const ytChannel = channels.data.items[0];
    // Checks if ws already exists
    const existingChannel = yield db_1.db.select().from(schema_1.WorkspaceTable).where((0, drizzle_orm_1.eq)(schema_1.WorkspaceTable.userHandle, (_a = ytChannel.snippet) === null || _a === void 0 ? void 0 : _a.customUrl));
    // DB Insert
    if (existingChannel.length > 0)
        (0, ServerError_1.ServerError)(res, "Workspace already exist");
    else
        typeof (userId) == 'string' && db_1.db.insert(schema_1.WorkspaceTable).values({
            name: (_b = ytChannel.snippet) === null || _b === void 0 ? void 0 : _b.title,
            userHandle: (_c = ytChannel.snippet) === null || _c === void 0 ? void 0 : _c.customUrl,
            avatar: (_f = (_e = (_d = ytChannel.snippet) === null || _d === void 0 ? void 0 : _d.thumbnails) === null || _e === void 0 ? void 0 : _e.default) === null || _f === void 0 ? void 0 : _f.url,
            owner: userId,
            refreshToken: refToken
        }).then(data => {
            data.rowCount > 0 &&
                res.json({
                    message: "Workspace Created",
                });
        }).catch(_ => (0, ServerError_1.ServerError)(res, "Workspace Creation Failed"));
});
exports.youtubeChannelInfo = youtubeChannelInfo;
