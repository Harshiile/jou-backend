import { Request, Response } from 'express'
import { JwtValidate } from '../../lib/jwt'
import { ServerError } from '../../lib/func/ServerError'
import { db } from '../../db'
import { UserTable, VideoWorkspaceJoinTable } from '../../db/schema'
import { eq, sql } from 'drizzle-orm'
import { validate } from 'uuid'
import { count } from 'console'

export const editorContribution = async (req: Request, res: Response<APIResponse>) => {
    const workspaceId = req.query['ws'];
    (!workspaceId && !validate(workspaceId)) && ServerError(res, "Workspace Id Is Invalid");

    const editorContribution = await db.select({
        name: UserTable.name,
        editors: VideoWorkspaceJoinTable.editor,
        count: sql`count(*)`
    })
        .from(VideoWorkspaceJoinTable)
        .leftJoin(UserTable, eq(UserTable.id, VideoWorkspaceJoinTable.editor))
        .groupBy(VideoWorkspaceJoinTable.editor, UserTable.name)
        .where(eq(VideoWorkspaceJoinTable.workspace, workspaceId?.toString()!))

    res.json({
        message: "Editor Contribution in WorkSpace",
        data: {
            editorContribution
        }
    })
}