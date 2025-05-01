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
exports.SendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const ServerError_1 = require("../../lib/func/ServerError");
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: "theharshiile@gmail.com",
        pass: process.env.MAIL_PASSKEY
    },
});
const mailOptions = {
    from: "theharshiile@gmail.com",
    to: "",
    subject: "Hello Frsssssom Habibi",
    html: '<h1>HELLO FROM NODEMAILER</h1>'
};
const SendMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (email) {
        mailOptions.to = email;
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error: ", error);
            }
            else {
                console.log("Email sent: " + info.response);
            }
        });
        res.status(200).json({
            message: "Email is successfully sent",
            data: {
            // info
            }
        });
    }
    else
        (0, ServerError_1.ServerError)(res, "Email is not exists", 400);
});
exports.SendMail = SendMail;
