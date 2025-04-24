"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
const APIError_1 = __importDefault(require("../Error/APIError"));
const ServerError = () => { throw new APIError_1.default(500, "Internal Server Error"); };
exports.ServerError = ServerError;
