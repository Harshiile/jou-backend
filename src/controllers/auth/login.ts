import { Request, Response } from 'express'
import APIError from '../../lib/Error/APIError'

const data = { email: "the", password: "Mcintyre@04" }
export const loginUser = async (req: Request<{}, {}, User>, res: Response<APIResponse>) => {
    if (req.body) {
        const { email, password } = req.body

        // data - fetch from DB
        if (data) {
            if (password == data.password) {
                // save accessToken
                res
                    .status(200)
                    .json({
                        message: "User Logged In"
                    })
            }
            else throw new APIError(401, "Password Incorrect")
        }
        else throw new APIError(404, "User not Found")
    }
    else throw new APIError(500, "Server Error")
}