import { pgTable, varchar, uuid, pgEnum, timestamp, primaryKey } from "drizzle-orm/pg-core";

export const userTypeEnum = pgEnum('userType', ['youtuber', 'editor']);
export const UserTable = pgTable("user", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name"),
    email: varchar("email"),
    password: varchar("password"),
    userType: userTypeEnum('userType').notNull(),
    refreshToken: varchar("refreshToken")
})

export const WorkspaceTable = pgTable("workspace", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name"),
    userHandle: varchar("userHandle"),
    avatar: varchar("avatar"),
    email: varchar("email"),
    owner: uuid("owner").references(() => UserTable.id, { onDelete: 'cascade' }),
    refreshToken: varchar("refreshToken")
})

export const WorkspaceEditorJoin = pgTable('workspace_editor', {
    workspace: uuid("workspace").references(() => WorkspaceTable.id, { onDelete: 'cascade' }),
    editor: uuid("editor").references(() => UserTable.id, { onDelete: 'cascade' })
}, table => [
    primaryKey({
        name: 'PK',
        columns: [table.editor, table.workspace]
    })
]
)

export const videoTypeEnum = pgEnum('videoType', ['public', 'private', 'unlisted']);
export const statusEnum = pgEnum('status', ['reviewPending', 'uploadPending', 'rejected', 'uploaded']);
export const VideoTable = pgTable("video", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title"),
    desc: varchar("desc"),
    videoType: videoTypeEnum('videoType').notNull(),
    thumbnail: varchar('thumbnail'),
    fileId: varchar('fileId'),
    url: varchar('url'),
    status: statusEnum('status').notNull(),
    uploadedAt: timestamp('uploadedAt', { withTimezone: true }),
    editor: uuid("editor").references(() => UserTable.id),
    workspace: uuid("workspace").references(() => WorkspaceTable.id)
})