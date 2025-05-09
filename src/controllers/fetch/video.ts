import { Request, Response } from 'express'
import { db } from '../../db';
import { VideoTable } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { ServerError } from '../../lib/func/ServerError';
import { url } from 'inspector';
import { videoInformation } from '../youtube';

export const getVideosFromWorkSpace = async (req: Request<{}, {}>, res: Response<APIResponse>) => {

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

        const videos = [{ videoId: 'DkeiKbqa02g' }, { videoId: 'DD0DgwWMrA' }, { videoId: 'yWf-pwGjXcc' }]
        await Promise.all(
            videos.map(async (item: any) => {
                const data = await videoInformation({
                    workspaceId: workspace,
                    videoId: item.videoId
                });
                item.metadata = data;
            })
        );

        res.json({
            message: "Videos from workspace",
            data: { videos }
        })
    }
}