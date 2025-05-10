import { Request, Response } from 'express'
import { db } from '../../db'
import { ServerError } from '../../lib/func/ServerError'
import { JwtValidate } from '../../lib/jwt'
import { EditorWorkspaceJoinTable, UserTable } from '../../db/schema'
import { eq } from 'drizzle-orm'
import { validate } from 'uuid'

export const joinWorkSpace = async (req: Request<{ link: string }, {}, { userId: string }>, res: Response<APIResponse>) => {
    const link = req.params.link
    !link && ServerError(res, "Link is not valid")

    const linkData = JwtValidate(link);

    (typeof (linkData) != 'string' && linkData.expiry <= Date.now()) && ServerError(res, "Link is expires");

    // User can signup
    const { userId } = req.body

    !validate(userId) && ServerError(res, "User Id not valid");

    const [user] = await db.select({
        role: UserTable.userType
    }).from(UserTable).where(eq(UserTable.id, userId))

    !user && ServerError(res, "User not found");

    user.role != 'editor' && ServerError(res, "Youtuber can't joined any workspace");

    db.insert(EditorWorkspaceJoinTable).values({
        editor: userId,
        workspace: typeof (linkData) != 'string' && linkData.workspaceId
    })
        .then(_ => res.json({
            message: "Join Workspace successfully",
        }))
        .catch(err => err.code == 23505 && ServerError(res, "You already in this Workspace"))
}