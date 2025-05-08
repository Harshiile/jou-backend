import { Request, Response } from 'express'
import { db } from '../../db'
import { UserTable } from '../../db/schema'
import { eq } from 'drizzle-orm'
import { ServerError } from '../../lib/func/ServerError'
import { JwtGenerate, JwtValidate } from '../../lib/jwt'
import { User } from '../../types/User'
import { comparePass } from '../../lib/func/hashing'

export const loginUser = async (req: Request<{}, {}, User>, res: Response<APIResponse>) => {
    const x = req.headers.cookie
    res.json({
        message: "...",
        data: { x }
    })
    // const { email, password } = req.body

    // const data: Record<string, any> = await db.select().from(UserTable).where(eq(UserTable.email, email)).catch(() => ServerError(res, "Error while fetch user from database"))

    // if (data.length > 0) {
    //     if (await comparePass(data[0].password, password)) {
    //         res
    //             .status(200)
    //             .cookie('auth', JwtGenerate({ refreshToken: data[0].refreshToken }), {
    //                 httpOnly: true,
    //                 maxAge: 15 * 60 * 1000
    //             })
    //             .json({
    //                 message: "User Logged In"
    //             })
    //     }
    //     else ServerError(res, "Password Incorrect", 401)
    // }
    // else ServerError(res, "User not Found", 404)
}

