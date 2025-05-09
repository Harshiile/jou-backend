"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.youtubeConnecterURL = void 0;
const ServerError_1 = require("../../lib/func/ServerError");
const OauthClient_1 = require("./OauthClient");
const scopes = [
    'https://www.googleapis.com/auth/youtube.upload',
    'https://www.googleapis.com/auth/youtube.readonly'
];
const youtubeConnecterURL = (req, res) => {
    const url = OauthClient_1.oauth2Client.generateAuthUrl({
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
exports.youtubeConnecterURL = youtubeConnecterURL;
