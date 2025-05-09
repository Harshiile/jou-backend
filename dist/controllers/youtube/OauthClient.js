"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauth2Client = void 0;
const googleapis_1 = require("googleapis");
exports.oauth2Client = new googleapis_1.google.auth.OAuth2({
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    redirectUri: 'http://localhost:5173/get/youtube/info'
});
