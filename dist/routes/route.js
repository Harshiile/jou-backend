"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mail_1 = require("../controllers/mail");
const authorize_1 = require("../middleware/authorize");
const auth_1 = require("../controllers/auth");
const youtube_1 = require("../controllers/youtube");
const drive_1 = require("../controllers/drive");
const video_1 = require("../controllers/fetch/video");
const workspace_1 = require("../controllers/fetch/workspace");
const router = (0, express_1.Router)();
const tmp = () => { };
// User-Auth
router.post('/login', auth_1.loginUser);
router.post('/signup', auth_1.signUser);
// Mail-Service
router.post('/mail/send', mail_1.SendMail);
// Youtube-Service
router.get('/youtube/get/oauth-url', youtube_1.youtubeConnecterURL); // get/oauth/youtube/url
router.get('/youtube/get/channel-info', youtube_1.youtubeChannelInfo); // get/youtube/info
router.get('/youtube/upload/video', tmp);
// Drive-Service
router.post('/drive/upload', drive_1.uploadOnDrive);
router.delete('/drive', drive_1.deleteOnDrive);
router.post('/drive/retrieve', authorize_1.authorize);
// Fetcher
router.get('/get/videos', video_1.getVideosFromWorkSpace);
router.get('/get/workspaces', workspace_1.getWorkSpaces);
exports.default = router;
