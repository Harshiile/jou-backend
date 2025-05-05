"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadOnDrive = void 0;
const ServerError_1 = require("../../lib/func/ServerError");
const googleapis_1 = require("googleapis");
const uuid_1 = require("uuid");
const busboy_1 = __importDefault(require("busboy"));
const socket_1 = require("../../socket");
const auth = new googleapis_1.google.auth.GoogleAuth({
    keyFile: process.env.DRIVE_SERVICE_ACCOUNT_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/drive.file']
});
const drive = googleapis_1.google.drive({ version: 'v3', auth });
const uploadOnDrive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bb = (0, busboy_1.default)({ headers: req.headers });
    console.log(req.headers['socket']);
    if (req.headers['socket']) {
        bb.on('file', (fieldname, file, filename) => __awaiter(void 0, void 0, void 0, function* () {
            const [fileName, fileExt] = filename.filename.split('.');
            yield drive.files.create({
                requestBody: {
                    name: `${fileName}-${(0, uuid_1.v4)()}.${fileExt}`,
                    parents: [process.env.DRIVE_FOLDER_ID],
                },
                media: {
                    mimeType: filename.mimeType,
                    body: file,
                },
            }, {
                onUploadProgress: (progress) => {
                    const uploaded = progress.bytesRead || progress.loaded;
                    const percent = Math.round((Number(uploaded) / Number((req.headers['content-length']) || 1)) * 100);
                    socket_1.io.to(req.headers['socket']).emit('uploading-progress', { percentage: percent });
                }
            });
        }));
        req.pipe(bb);
        res.json({
            message: "Uploaded",
        });
    }
    else
        (0, ServerError_1.ServerError)(res, "Socket is not connected");
});
exports.uploadOnDrive = uploadOnDrive;
