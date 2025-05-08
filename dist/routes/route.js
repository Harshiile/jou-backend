"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mail_1 = require("../controllers/mail");
const authorize_1 = require("../middleware/authorize");
const auth_1 = require("../controllers/auth");
const oauth_1 = require("../controllers/oauth");
const drive_1 = require("../controllers/drive");
const video_1 = require("../controllers/fetch/video");
const user_1 = require("../controllers/fetch/user");
const router = (0, express_1.Router)();
const tmp = () => { };
// User-Auth
router.post('/login', auth_1.loginUser);
router.post('/signup', auth_1.signUser);
// Mail-Service
router.post('/mail/send', mail_1.SendMail);
// Youtube-Service
router.get('/youtube/get/oauth-url', oauth_1.youtubeConnecterURL); // get/oauth/youtube/url
router.get('/youtube/get/channel-info', oauth_1.youtubeChannelInfo); // get/youtube/info
router.get('/youtube/upload/video', tmp);
// Drive-Service
router.post('/drive/upload', drive_1.uploadOnDrive);
router.delete('/drive', drive_1.deleteOnDrive);
router.post('/drive/retrieve', authorize_1.authorize);
// Fetcher
router.get('/get/videos', video_1.getVideosFromWorkSpace);
router.get('/get/workspace', user_1.getWorkSpaces);
exports.default = router;
