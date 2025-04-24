import { Request, Response } from 'express'
import APIError from '../../lib/Error/APIError'
import { db } from '../../db'
import { User } from '../../db/schema'
import { eq } from 'drizzle-orm'
import { ServerError } from '../../lib/func/ServerError'
import { JwtGenerate } from '../../lib/jwt'

const data = { email: "the", password: "Mcintyre@04" }
export const loginUser = async (req: Request<{}, {}, User>, res: Response<APIResponse>) => {
    if (req.body) {
        const { email, password } = req.body

        const data = await db.select().from(User).where(eq(User.email, email)).catch(() => ServerError())
        if (data.length > 0) {
            if (password == data[0].password) {
                // save accessToken

                res
                    .status(200)
                    .setHeader("authorization", `Bearer ${JwtGenerate({ email })}`)
                    .json({
                        message: "User Logged In"
                    })
            }
            else throw new APIError(401, "Password Incorrect")
        }
        else throw new APIError(404, "User not Found")
    }
    else ServerError()
}