"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.server = void 0;
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const app_1 = __importDefault(require("./app/app"));
exports.server = (0, http_1.createServer)(app_1.default);
exports.io = new socket_io_1.Server(exports.server, {
    cors: { origin: "http://localhost:5173" }
});
