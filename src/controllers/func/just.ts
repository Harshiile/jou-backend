import { Request, Response } from 'express'
import { JwtValidate } from '../../lib/jwt'
export const Just = async (req: Request, res: Response<APIResponse>) => {
    const f = req.headers["authorization"]

    res.json({
        message: "Just Check Authorization",
        data: {
            data: JwtValidate(f!.split('Bearer ')[1])
        }
    })
}