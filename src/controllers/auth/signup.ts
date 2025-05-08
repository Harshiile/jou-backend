import { Request, Response } from 'express'
import { db } from '../../db'
import { UserTable } from '../../db/schema'
import { eq } from 'drizzle-orm'
import { ServerError } from '../../lib/func/ServerError'
import { JwtGenerate } from '../../lib/jwt'
import { User } from '../../types/User'
import { encryptPass } from '../../lib/func/hashing'


export const signUser = async (req: Request<{}, {}, User>, res: Response<APIResponse>) => {
    const { email, password, userType, name } = req.body

    const data: Record<string, any> = await db.select().from(UserTable).where(eq(UserTable.email, email)).catch(() => ServerError(res, "Error while fetching user from database"))

    if (data.length == 0) {
        const hashPassword = await encryptPass(password)
        const refreshToken = JwtGenerate({ email, userType })
        await db.insert(UserTable).values({
            name,
            email,
            password: hashPassword,
            userType,
            refreshToken
        }).catch(() => ServerError(res, "Error while inserting user into database"))
        res
            .status(200)
            .cookie('auth', JwtGenerate({ refreshToken }), {
                httpOnly: true,
                maxAge: 15 * 60 * 1000
            })
            .json({
                message: "User Signed In",
            })
    }
    else ServerError(res, "User Already Exist", 409)
}