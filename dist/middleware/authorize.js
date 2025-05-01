"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const renewToken_1 = require("../controllers/func/renewToken");
const authorize = (req, res, next) => {
    if (!req.headers['authorization']) {
        console.log("Authorization Header Not Exist, Need to regenerate");
        const refToken = req.cookies.refTn || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoY3hzY2VoIiwiaWF0IjoxNzQ1NTA2NTAxfQ.1KcbZueCni9ZWBMEYY8uo_Q7U8n9Sm5cifP4Yq4gMlM";
        res.setHeader("authorization", (0, renewToken_1.RenewToken)(refToken));
    }
    next();
};
exports.authorize = authorize;
