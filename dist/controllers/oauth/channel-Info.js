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
const oauth2Client = new googleapis_1.google.auth.OAuth2({
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    redirectUri: 'http://localhost:5173/get/youtube/info'
});
const youtubeChannelInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const { code } = req.query;
    !code && (0, ServerError_1.ServerError)(res, "Code not generated after youtube signup");
    const youtubeChannel = yield oauth2Client.getToken(code.toString());
    // store refreshToken on db - Workspace Table
    !youtubeChannel && (0, ServerError_1.ServerError)(res, "Error while fetching youtube channel refreshToken");
    const refToken = youtubeChannel.tokens.refresh_token;
    oauth2Client.setCredentials({
        refresh_token: refToken
    });
    const yt = googleapis_1.google.youtube({ version: 'v3', auth: oauth2Client });
    const channels = yield yt.channels.list({
        part: ['id', 'snippet'],
        mine: true
    });
    !channels && (0, ServerError_1.ServerError)(res, "Error while fetching youtube channel info");
    channels.data.items.length <= 0 && (0, ServerError_1.ServerError)(res, "Error while fetching youtube channel info", 404, "No channel associated with given youtube account");
    const existChannel = channels.data.items[0];
    // DB Insert
    res.status(200).json({
        message: "Youtube Channel Connected",
        data: {
            id: existChannel.id,
            avatar: (_c = (_b = (_a = existChannel.snippet) === null || _a === void 0 ? void 0 : _a.thumbnails) === null || _b === void 0 ? void 0 : _b.default) === null || _c === void 0 ? void 0 : _c.url,
            name: (_d = existChannel.snippet) === null || _d === void 0 ? void 0 : _d.title,
            userHandle: (_e = existChannel.snippet) === null || _e === void 0 ? void 0 : _e.customUrl
        }
    });
});
exports.youtubeChannelInfo = youtubeChannelInfo;
