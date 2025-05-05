import { Request, Response, NextFunction } from 'express'
import { RenewToken } from '../controllers/func/refreshToken'
import { JwtValidate } from '../lib/jwt'

export const authorize = (req: Request, res: Response<APIResponse>, next: NextFunction) => {
    if (req.headers['authorization']) {
        try {
            // Valid Token
            JwtValidate(req.headers['authorization'].split(' ')[1])
            next()
        } catch (error) {
            // Token is not valid
            res.json({
                message: "Access Token is not valid"
            })
        }
    }
    else {
        // expires
        const userId = req.headers['id']
        if (userId && typeof (userId) === 'string') {
            res.cookie('auth', RenewToken(userId), {
                httpOnly: true
            })
        }
    }
    next()
}