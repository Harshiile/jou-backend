import { Request, Response } from 'express'
import { db } from '../../db';
import { EditorWorkspaceJoinTable, WorkspaceTable } from '../../db/schema';
import { eq, inArray } from 'drizzle-orm';
import { ServerError } from '../../lib/func/ServerError';
import { validate } from 'uuid'

export const getWorkSpaces = async (req: Request<{}, {}>, res: Response<APIResponse>) => {
    const { userId, role } = req.query;

    !validate(userId) && ServerError(res, "UserId is not valid");

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
            const subQuery = db.select({ workspace: EditorWorkspaceJoinTable.workspace }).from(EditorWorkspaceJoinTable).where(eq(EditorWorkspaceJoinTable.editor, userId));
            const workspaces = await db.select({
                id: WorkspaceTable.id,
                name: WorkspaceTable.name,
                userHandle: WorkspaceTable.userHandle,
                avatar: WorkspaceTable.avatar,
            }).from(WorkspaceTable).where(inArray(WorkspaceTable.id, subQuery))
            res.json({
                message: "Workspaces of Editor",
                data: { workspaces }
            })
        }
        else ServerError(res, "Role is not valid");
    }
    else ServerError(res, "UserId is not valid");
}