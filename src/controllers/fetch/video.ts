import { Request, Response } from 'express'
import { db } from '../../db';
import { VideoTable } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { ServerError } from '../../lib/func/ServerError';

export const getVideosFromWorkSpace = async (req: Request<{}, {}>, res: Response<APIResponse>) => {

    const { workspace } = req.query;
    if (typeof (workspace) == 'string') {
        const videos = await db.select().from(VideoTable).where(eq(VideoTable.workspace, workspace)).catch(() => ServerError(res, "Error while fetch videoes of workspace from database"))
        res.json({
            message: "Videos from workspace",
            data: { videos }
        })
    }
}