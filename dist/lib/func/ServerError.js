"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
const ServerError = (res, msg, statusCode, errMsg) => {
    return res.status(statusCode || 400).json({
        message: msg,
        errorMsg: errMsg || "Internal Server Error"
    });
};
exports.ServerError = ServerError;
