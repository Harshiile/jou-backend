import { Request, Response } from 'express'
import { ServerError } from '../../lib/func/ServerError'
import { oauth2Client } from './OauthClient'

const scopes = [
    'https://www.googleapis.com/auth/youtube.upload',
    'https://www.googleapis.com/auth/youtube.readonly'
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