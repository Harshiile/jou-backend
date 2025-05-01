import { Request, Response, NextFunction } from 'express'
import { RenewToken } from '../controllers/func/renewToken';

export const authorize = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers['authorization']) {
        console.log("Authorization Header Not Exist, Need to regenerate");

        const refToken = req.cookies.refTn || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoY3hzY2VoIiwiaWF0IjoxNzQ1NTA2NTAxfQ.1KcbZueCni9ZWBMEYY8uo_Q7U8n9Sm5cifP4Yq4gMlM";
        res.setHeader("authorization", RenewToken(refToken))
    }
    next()
}