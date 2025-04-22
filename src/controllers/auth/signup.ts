import { Request, Response } from 'express'
import APIError from '../../lib/Error/APIError'

const data = undefined
export const signUser = async (req: Request<{}, {}, User>, res: Response<APIResponse>) => {
    if (req.body) {
        const { email, password } = req.body

        // data - fetch from DB
        if (!data) {
            // save accessToken
            res
                .status(200)
                .json({
                    message: "User Signed In"
                })
        }
        else throw new APIError(409, "User Already Exist")
    }
    else throw new APIError(500, "Server Error")
}