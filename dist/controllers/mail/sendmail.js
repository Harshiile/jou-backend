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
const approval_1 = require("./templates/approval");
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
    html: (0, approval_1.ApprovalMailTemplate)({
        id: "VID38510107535",
        title: "CM Punk enters first WrestleMania main event with Paul Heyman: WrestleMania 41 Saturday highlights",
        thumbnail: "https://i.ytimg.com/vi/buafAa8Gobo/hqdefault.jpg?sqp=-oaymwEmCKgBEF5IWvKriqkDGQgBFQAAiEIYAdgBAeIBCggYEAIYBjgBQAE=&rs=AOn4CLDYrQ3Upio8JgBH1S2KyMJWgHCYcA",
        wsName: "WWE"
    }, {
        name: "Harshil",
        id: "EDI182442352362",
        email: "themcintyre619@gmail.com"
    })
};
const SendMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (email) {
        mailOptions.to = email;
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                (0, ServerError_1.ServerError)(res, "Email sending failed !", 400);
            }
            else {
                console.log("Email sent to " + email);
                res.status(200).json({
                    message: "Email is successfully sent"
                });
            }
        });
    }
    else
        (0, ServerError_1.ServerError)(res, "Email is not exists", 400);
});
exports.SendMail = SendMail;
