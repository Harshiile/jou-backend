import { Request, Response } from 'express'
import { google } from 'googleapis'
import { GaxiosPromise, youtube, youtube_v3 } from 'googleapis/build/src/apis/youtube'
import { ServerError } from '../../lib/func/ServerError'

const oauth2Client = new google.auth.OAuth2({
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    redirectUri: 'http://localhost:5173/get/youtube/info'
})


const scopes = [
    'https://www.googleapis.com/auth/youtube.upload',
    'https://www.googleapis.com/auth/youtube.readonly',
]


export const youtubeConnecterURL = (req: Request, res: Response<APIResponse>) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: scopes
    })
    url ?
        res.status(200).json({
            message: "Youtube Channel URl",
            data: { url }
        }) :
        ServerError(res, "Error while getting youtube connecter url")
}