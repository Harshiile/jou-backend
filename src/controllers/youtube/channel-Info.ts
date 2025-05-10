import { Request, Response } from 'express'
import { google } from 'googleapis'
import { ServerError } from '../../lib/func/ServerError'
import { oauth2Client } from './OauthClient'
import { WorkspaceTable } from '../../db/schema'
import { db } from '../../db'
import { eq } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'


export const youtubeChannelInfo = async (req: Request, res: Response<APIResponse>) => {
    const yt = google.youtube({ version: 'v3', auth: oauth2Client })
    const { code, userId } = req.query

    !code && ServerError(res, "Code not generated after youtube signup")

    const youtubeChannel = await oauth2Client.getToken(code!.toString());

    // store refreshToken on db - Workspace Table
    !youtubeChannel && ServerError(res, "Error while fetching youtube channel refreshToken")

    const refToken = youtubeChannel.tokens.refresh_token
    oauth2Client.setCredentials({
        refresh_token: refToken
    })

    const channels = await yt.channels.list({
        part: ['id', 'snippet'],
        mine: true
    })
    !channels && ServerError(res, "Error while fetching youtube channel info")

    channels.data.items!.length <= 0 && ServerError(res, "Error while fetching youtube channel info", 404, "No channel associated with given youtube account")

    const ytChannel = channels.data.items![0]


    // Checks if ws already exists
    const existingChannel = await db.select().from(WorkspaceTable).where(eq(WorkspaceTable.userHandle, ytChannel.snippet?.customUrl!))
    // DB Insert
    if (existingChannel.length > 0) ServerError(res, "Workspace already exist")
    else
        typeof (userId) == 'string' && db.insert(WorkspaceTable).values({
            name: ytChannel.snippet?.title,
            userHandle: ytChannel.snippet?.customUrl,
            avatar: ytChannel.snippet?.thumbnails?.default?.url,
            owner: userId,
            refreshToken: refToken
        }).then(data => {
            data.rowCount! > 0 &&
                res.json({
                    message: "Workspace Created",
                })
        }).catch(_ => ServerError(res, "Workspace Creation Failed"))
}