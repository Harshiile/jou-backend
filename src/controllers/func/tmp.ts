import { Request, Response } from 'express'
import { JwtGenerate, JwtValidate } from '../../lib/jwt'
import { emit } from 'process'
import { encryptPass } from '../../lib/func/hashing'

export const TMP = async (req: Request<{}, {}>, res: Response<APIResponse>) => {
    const pass = req.query['pass']

    res.json({
        message: "TMP Message",
        data: {
            z: Date.now(),
            y: Date.now() + 30 * 1000,
            x: JwtGenerate({
                workspaceId: "2f868511-5242-45a9-b305-d0ca1b28b106",
                expiry: Date.now() + 60 * 60 * 1000
            })
        }
    })
    // const exp = req.query['exp']
    // res.json({
    //     message: "TMP Message",
    //     data: { exp }
    // })
}
