import { Request, Response } from 'express'
import APIError from '../../lib/Error/APIError'
import { db } from '../../db'
import { User } from '../../db/schema'
import { eq } from 'drizzle-orm'
import { ServerError } from '../../lib/func/ServerError'
import { JwtGenerate } from '../../lib/jwt'


export const signUser = async (req: Request<{}, {}, User>, res: Response<APIResponse>) => {
    if (req.body) {
        const { email, password, role, name } = req.body

        // data - fetch from DB
        const data = await db.select().from(User).where(eq(User.email, email)).catch(() => ServerError())
        if (!(data.length > 0)) {
            // save accessToken 
            await db.insert(User).values({
                name,
                role,
                email,
                password,
                refreshToken: `Bearer ${JwtGenerate({ email })}`
            }).catch(() => ServerError())
            res
                .status(200)
                .json({
                    message: "User Signed In"
                })
        }
        else throw new APIError(409, "User Already Exist")
    }
    else ServerError()
}