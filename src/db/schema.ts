import { pgTable, varchar, integer, uuid } from "drizzle-orm/pg-core";

export const User = pgTable("user", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name"),
    email: varchar("email"),
    password: varchar("password"),
    role: integer("role"),
    refreshToken: varchar("refreshToken")
})

export const Workspace = pgTable("workspace", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name"),
    avatar: varchar("avatar"),
    email: varchar("email"),
    owner: uuid("owner").references(() => User.id),
    refreshToken: varchar("refreshToken")
})

export const Video = pgTable("video", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title"),
    thumbnail: varchar("thumbnail"),
    editor: uuid("editor").references(() => User.id),
    workspace: uuid("workspace").references(() => Workspace.id)
})