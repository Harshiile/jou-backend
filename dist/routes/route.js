"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const mail_1 = require("../controllers/mail");
const oauth_1 = require("../controllers/oauth");
const authorize_1 = require("../middleware/authorize");
const upload_1 = require("../controllers/drive/upload");
const login_1 = require("../controllers/auth/login");
const router = (0, express_1.Router)();
const tmp = () => { };
// User-Auth
router.post('/login', auth_1.loginUser);
router.post('/signup', auth_1.signUser);
router.post('/tmp', login_1.TMP);
// Mail-Service
router.post('/mail/send', mail_1.SendMail);
// Youtube-Service
router.get('/youtube/get/oauth-url', oauth_1.youtubeConnecterURL); // get/oauth/youtube/url
router.get('/youtube/get/channel-info', oauth_1.youtubeChannelInfo); // get/youtube/info
router.get('/youtube/upload/video', tmp);
// Drive-Service
router.post('/drive/upload', upload_1.uploadOnDrive);
router.post('/drive/retrieve', authorize_1.authorize);
exports.default = router;
