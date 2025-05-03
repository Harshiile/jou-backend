import nodemailer from 'nodemailer'
import { Request, Response } from 'express'
import { ServerError } from '../../lib/func/ServerError';
import { ApprovalMailTemplate } from './templates/approval';

interface Recipient {
    email: string
}

const transporter = nodemailer.createTransport({
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
    html: ApprovalMailTemplate({
        id: "VID38510107535",
        title: "CM Punk enters first WrestleMania main event with Paul Heyman: WrestleMania 41 Saturday highlights",
        thumbnail: "https://i.ytimg.com/vi/buafAa8Gobo/hqdefault.jpg?sqp=-oaymwEmCKgBEF5IWvKriqkDGQgBFQAAiEIYAdgBAeIBCggYEAIYBjgBQAE=&rs=AOn4CLDYrQ3Upio8JgBH1S2KyMJWgHCYcA",
        wsName: "WWE"
    }, {
        name: "Harshil",
        id: "EDI182442352362",
        email: "themcintyre619@gmail.com"
    })
}


export const SendMail = async (req: Request<{}, {}, Recipient>, res: Response<APIResponse>) => {
    const { email } = req.body
    if (email) {
        mailOptions.to = email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                ServerError(res, "Email sending failed !", 400)
            } else {
                console.log("Email sent to " + email);
                res.status(200).json({
                    message: "Email is successfully sent"
                })
            }
        });
    }
    else ServerError(res, "Email is not exists", 400)
}