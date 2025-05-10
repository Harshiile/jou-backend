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
const OauthClient_1 = require("../youtube/OauthClient");
const googleapis_1 = require("googleapis");
const getVideosFromWorkSpace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { workspace } = req.query;
    if (workspace) {
        // Not Uploaded Videos
        const nonUploadedVideos = yield db_1.db.select({
            id: schema_1.VideoTable.id,
            title: schema_1.VideoTable.title,
            duration: schema_1.VideoTable.duration,
            uploadAt: schema_1.VideoTable.willUploadAt,
            thumbnail: schema_1.VideoTable.thumbnail,
            videoType: schema_1.VideoTable.videoType,
            status: schema_1.VideoTable.status
        }).from(schema_1.VideoTable).where((0, drizzle_orm_1.eq)(schema_1.VideoTable.workspace, workspace.toString()));
        // Uploaded Videos
        const uploadedVideos = yield db_1.db.select({
            videoId: schema_1.VideoWorkspaceJoinTable.videoId
        }).from(schema_1.VideoWorkspaceJoinTable).where((0, drizzle_orm_1.eq)(schema_1.VideoWorkspaceJoinTable.workspace, workspace.toString()));
        const [ws] = yield db_1.db.select({
            refreshToken: schema_1.WorkspaceTable.refreshToken
        }).from(schema_1.WorkspaceTable).where((0, drizzle_orm_1.eq)(schema_1.WorkspaceTable.id, workspace.toString()));
        const { refreshToken } = ws;
        OauthClient_1.oauth2Client.setCredentials({
            refresh_token: refreshToken
        });
        const yt = googleapis_1.google.youtube({ version: 'v3', auth: OauthClient_1.oauth2Client });
        const videos = uploadedVideos.map(v => v.videoId);
        const videoDetails = yield yt.videos.list({
            part: ['snippet', 'contentDetails', 'status', 'statistics'],
            id: videos
        });
        const metadata = nonUploadedVideos;
        const videosMetaDatas = (_a = videoDetails === null || videoDetails === void 0 ? void 0 : videoDetails.data) === null || _a === void 0 ? void 0 : _a.items;
        videosMetaDatas === null || videosMetaDatas === void 0 ? void 0 : videosMetaDatas.forEach(video => {
            var _a;
            metadata.push({
                id: video.id,
                title: video.snippet.title,
                publishedAt: video.snippet.publishedAt,
                duration: video.contentDetails.duration,
                thumbnail: (_a = video.snippet) === null || _a === void 0 ? void 0 : _a.thumbnails.default.url,
                videoType: video.status.privacyStatus,
                views: video.statistics.viewCount,
                status: 'uploaded'
            });
        });
        res.json({
            message: "Videos from workspace",
            data: { metadata }
        });
    }
});
exports.getVideosFromWorkSpace = getVideosFromWorkSpace;
