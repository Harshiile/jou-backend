import { Request, Response } from 'express'
import { google } from 'googleapis'
import { GaxiosPromise, youtube, youtube_v3 } from 'googleapis/build/src/apis/youtube'
import { ServerError } from '../../lib/func/ServerError'

const oauth2Client = new google.auth.OAuth2({
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    redirectUri: 'http://localhost:5173/get/youtube/info'
})

export const youtubeChannelInfo = async (req: Request, res: Response<APIResponse>) => {
    const { code } = req.query
    !code && ServerError(res, "Code not generated after youtube signup")

    const youtubeChannel = await oauth2Client.getToken(code!.toString());

    // store refreshToken on db - Workspace Table
    !youtubeChannel && ServerError(res, "Error while fetching youtube channel refreshToken")

    const refToken = youtubeChannel.tokens.refresh_token
    oauth2Client.setCredentials({
        refresh_token: refToken
    })
    const yt = google.youtube({ version: 'v3', auth: oauth2Client })
    const channels = await yt.channels.list({
        part: ['id', 'snippet'],
        mine: true
    })
    !channels && ServerError(res, "Error while fetching youtube channel info")

    channels.data.items!.length <= 0 && ServerError(res, "Error while fetching youtube channel info", 404, "No channel associated with given youtube account")

    const existChannel = channels.data.items![0]
    // DB Insert
    res.status(200).json({
        message: "Youtube Channel Connected",
        data: {
            id: existChannel.id,
            avatar: existChannel.snippet?.thumbnails?.default?.url,
            name: existChannel.snippet?.title,
            userHandle: existChannel.snippet?.customUrl
        }
    })
}