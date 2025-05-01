"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenewToken = void 0;
const jwt_1 = require("../../lib/jwt");
const RenewToken = (refreshToken) => {
    return `Bearer ${(0, jwt_1.JwtGenerate)({ refreshToken })}`;
};
exports.RenewToken = RenewToken;
