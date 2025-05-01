import { pgTable, varchar, integer, uuid } from "drizzle-orm/pg-core";


export const UserTable = pgTable("user", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name"),
    email: varchar("email"),
    password: varchar("password"),
    role: integer("role"),
    refreshToken: varchar("refreshToken")
})

export const WorkspaceTable = pgTable("workspace", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name"),
    userHandle: varchar("userHandle"),
    avatar: varchar("avatar"),
    email: varchar("email"),
    owner: uuid("owner").references(() => UserTable.id),
    editor: uuid('editor').references(() => UserTable.id),
    refreshToken: varchar("refreshToken")
})

export const VideoTable = pgTable("video", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title"),
    thumbnail: varchar("thumbnail"),
    status: integer("status").$default(() => 0),
    editor: uuid("editor").references(() => UserTable.id),
    workspace: uuid("workspace").references(() => WorkspaceTable.id)
})