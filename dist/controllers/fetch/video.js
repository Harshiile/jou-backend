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
const youtube_1 = require("../youtube");
const getVideosFromWorkSpace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { workspace } = req.query;
    if (typeof (workspace) == 'string') {
        // const videos: Record<string, any> = await db.select({
        //     id: VideoTable.id,
        //     title: VideoTable.title,
        //     videoType: VideoTable.videoType,
        //     thumbnail: VideoTable.thumbnail,
        //     url: VideoTable.url,
        //     status: VideoTable.status,
        //     uploadAt: VideoTable.willUploadAt
        // }).from(VideoTable).where(eq(VideoTable.workspace, workspace)).catch(() => ServerError(res, "Error while fetch videoes of workspace from database"))
        const videos = [{ videoId: 'DkeiKbqa02g' }, { videoId: 'DD0DgwWMrA' }, { videoId: 'yWf-pwGjXcc' }];
        yield Promise.all(videos.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield (0, youtube_1.videoInformation)({
                workspaceId: workspace,
                videoId: item.videoId
            });
            item.metadata = data;
        })));
        res.json({
            message: "Videos from workspace",
            data: { videos }
        });
    }
});
exports.getVideosFromWorkSpace = getVideosFromWorkSpace;
