"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYoutubeConnecterURL = void 0;
const googleapis_1 = require("googleapis");
const ServerError_1 = require("../../lib/func/ServerError");
const oauth2Client = new googleapis_1.google.auth.OAuth2({
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    redirectUri: 'http://localhost:5173/get/youtube/info'
});
const scopes = [
    'https://www.googleapis.com/auth/youtube.upload',
    'https://www.googleapis.com/auth/youtube.readonly',
];
const getYoutubeConnecterURL = (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: scopes
    });
    url ?
        res.status(200).json({
            message: "Youtube Channel URl",
            data: { url }
        }) :
        (0, ServerError_1.ServerError)(res, "Error while getting youtube connecter url");
};
exports.getYoutubeConnecterURL = getYoutubeConnecterURL;
