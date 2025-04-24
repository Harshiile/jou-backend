import nodemailer from 'nodemailer'
import { Request, Response } from 'express'
import APIError from '../../lib/Error/APIError'

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
    html: '<h1>HELLO FROM NODEMAILER</h1>'
}


export const SendMail = async (req: Request<{}, {}, Recipient>, res: Response<APIResponse>) => {
    const { email } = req.body
    if (email) {
        mailOptions.to = email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error: ", error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
        res.status(200).json({
            message: "Email is successfully sent",
            data: {
                // info
            }
        })
    }
    else throw new APIError(400, "Email is not exists")
}