"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtGenerate = exports.JwtValidate = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const JwtValidate = (token) => {
    return (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
};
exports.JwtValidate = JwtValidate;
const JwtGenerate = (payload) => {
    return (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET);
};
exports.JwtGenerate = JwtGenerate;
