import { Request, Response } from 'express'
import { db } from '../../db';
import { VideoTable, WorkspaceEditorJoin, WorkspaceTable } from '../../db/schema';
import { eq, inArray } from 'drizzle-orm';
import { ServerError } from '../../lib/func/ServerError';

export const getWorkSpaces = async (req: Request<{}, {}>, res: Response<APIResponse>) => {
    const { userId, role } = req.query;
    if (typeof (userId) == 'string') {
        if (role == 'youtuber') {
            const workspaces = await db.select({
                id: WorkspaceTable.id,
                name: WorkspaceTable.name,
                userHandle: WorkspaceTable.userHandle,
                avatar: WorkspaceTable.avatar,
            }).from(WorkspaceTable).where(eq(WorkspaceTable.owner, userId))
            res.json({
                message: "Workspaces of Youtuber",
                data: { workspaces }
            })
        }
        else if (role == 'editor') {
            const subQuery = db.select({ workspace: WorkspaceEditorJoin.workspace }).from(WorkspaceEditorJoin).where(eq(WorkspaceEditorJoin.editor, userId));
            const workspaces = await db.select().from(WorkspaceTable).where(inArray(WorkspaceTable.id, subQuery))
            res.json({
                message: "Workspaces of Editor",
                data: { workspaces }
            })
        }
        else ServerError(res, "Role is not valid")
    }
    else ServerError(res, "UserId is not valid")
}