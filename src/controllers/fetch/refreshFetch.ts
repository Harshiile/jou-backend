import { Request, Response } from 'express'
import { JwtValidate } from '../../lib/jwt'
import { ServerError } from '../../lib/func/ServerError'
import { db } from '../../db'
import { UserTable } from '../../db/schema'
import { eq } from 'drizzle-orm'

export const fetchUserFromDB = (userId: string) => {
    return db.select({
        id: UserTable.id,
        role: UserTable.userType
    }).from(UserTable).where(eq(UserTable.id, userId))
}

export const refreshFetch = async (req: Request<{}, {}>, res: Response<APIResponse>) => {
    const auth = req.cookies['auth']
    const userId = req.query['id']
    let user;
    if (auth) {
        user = JwtValidate(auth);
    }
    else {

        !userId && ServerError(res, "Unauthorized User", 403);

        user = await fetchUserFromDB(userId!.toString())
    }
    res.json({
        message: "User Fetching When Refreshing The Page",
        data: { user }
    })
}
