import { pgTable, varchar, uuid, pgEnum, timestamp, primaryKey } from "drizzle-orm/pg-core";


// User Details
export const userTypeEnum = pgEnum('userType', ['youtuber', 'editor']);
export const UserTable = pgTable("user", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name"),
    email: varchar("email"),
    password: varchar("password"),
    userType: userTypeEnum('userType').notNull(),
    refreshToken: varchar("refreshToken")
})


// Channel Details
export const WorkspaceTable = pgTable("workspace", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name"),
    userHandle: varchar("userHandle"),
    avatar: varchar("avatar"),
    owner: uuid("owner").references(() => UserTable.id, { onDelete: 'cascade' }),
    refreshToken: varchar("refreshToken")
})


// Many-to-Many Workspace & Editor
export const EditorWorkspaceJoinTable = pgTable('ws-editor-join', {
    workspace: uuid("workspace").references(() => WorkspaceTable.id, { onDelete: 'cascade' }),
    editor: uuid("editor").references(() => UserTable.id, { onDelete: 'cascade' })
}, table => [
    primaryKey({
        name: 'pk-ws-editor-join',
        columns: [table.editor, table.workspace]
    })
])


// Just store video information until it uploads - Once video is uploaded delete perticular entity
export const videoTypeEnum = pgEnum('videoType', ['public', 'private', 'unlisted']);
export const statusEnum = pgEnum('status', ['reviewPending', 'uploadPending']);
export const VideoTable = pgTable("video", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title").notNull(),
    desc: varchar("desc"),
    videoType: videoTypeEnum('videoType').notNull(),
    thumbnail: varchar('thumbnail'),
    fileId: varchar('fileId').notNull(),
    url: varchar('url'),
    status: statusEnum('status').notNull(),
    willUploadAt: timestamp('willUploadAt', { withTimezone: true }),
    editor: uuid("editor").references(() => UserTable.id), // This field going to VideoWorkspaceJoinTable
    workspace: uuid("workspace").references(() => WorkspaceTable.id) // This field going to VideoWorkspaceJoinTable
})


// Many-to-Many Workspace & Video
export const VideoWorkspaceJoinTable = pgTable('ws-video-editor-join', {
    videoId: uuid("videoId"),
    editor: uuid("editor").references(() => UserTable.id),
    workspace: uuid("workspace").references(() => WorkspaceTable.id, { onDelete: 'cascade' }),
}, table => [
    primaryKey({
        name: 'pk-ws-video-editor-join',
        columns: [table.videoId, table.workspace, table.editor]
    })
])