import { Request, Response } from 'express'
import { db } from '../../db';
import { VideoTable, VideoWorkspaceJoinTable, WorkspaceTable } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { ServerError } from '../../lib/func/ServerError';
import { url } from 'inspector';
import { oauth2Client } from '../youtube/OauthClient';
import { google } from 'googleapis';

export const getVideosFromWorkSpace = async (req: Request<{}, {}>, res: Response<APIResponse>) => {
    const { workspace } = req.query;
    if (workspace) {

        // Not Uploaded Videos


        const nonUploadedVideos = await db.select({
            id: VideoTable.id,
            title: VideoTable.title,
            duration: VideoTable.duration,
            uploadAt: VideoTable.willUploadAt,
            thumbnail: VideoTable.thumbnail,
            videoType: VideoTable.videoType,
            status: VideoTable.status
        }).from(VideoTable).where(eq(VideoTable.workspace, workspace.toString()))



        // Uploaded Videos
        const uploadedVideos = await db.select({
            videoId: VideoWorkspaceJoinTable.videoId
        }).from(VideoWorkspaceJoinTable).where(eq(VideoWorkspaceJoinTable.workspace, workspace.toString()))

        const [ws] = await db.select({
            refreshToken: WorkspaceTable.refreshToken
        }).from(WorkspaceTable).where(eq(WorkspaceTable.id, workspace.toString()))

        const { refreshToken } = ws

        oauth2Client.setCredentials({
            refresh_token: refreshToken
        })
        const yt = google.youtube({ version: 'v3', auth: oauth2Client })

        const videos = uploadedVideos.map(v => v.videoId!)

        const videoDetails = await yt.videos.list({
            part: ['snippet', 'contentDetails', 'status', 'statistics'],
            id: videos
        });

        const metadata: VideoMetaData[] = nonUploadedVideos;
        const videosMetaDatas = videoDetails?.data?.items;

        videosMetaDatas?.forEach(video => {
            metadata.push({
                id: video.id!,
                title: video.snippet!.title!,
                publishedAt: video.snippet!.publishedAt!,
                duration: video.contentDetails!.duration!,
                thumbnail: video.snippet?.thumbnails!.default!.url!,
                videoType: video.status!.privacyStatus!,
                views: video.statistics!.viewCount!,
                status: 'uploaded'
            })
        })

        res.json({
            message: "Videos from workspace",
            data: { metadata }
        })
    }

}

interface VideoMetaData {
    id: string;
    title: string;
    uploadAt?: Date | null;
    duration: string;
    publishedAt?: string | null;
    thumbnail: string | null;
    videoType: string;
    views?: string | null;
    status: string;
}