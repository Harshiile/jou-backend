"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Video = exports.Workspace = exports.User = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.User = (0, pg_core_1.pgTable)("user", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    name: (0, pg_core_1.varchar)("name"),
    email: (0, pg_core_1.varchar)("email"),
    password: (0, pg_core_1.varchar)("password"),
    role: (0, pg_core_1.integer)("role"),
    refreshToken: (0, pg_core_1.varchar)("refreshToken")
});
exports.Workspace = (0, pg_core_1.pgTable)("workspace", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    name: (0, pg_core_1.varchar)("name"),
    avatar: (0, pg_core_1.varchar)("avatar"),
    email: (0, pg_core_1.varchar)("email"),
    owner: (0, pg_core_1.uuid)("owner").references(() => exports.User.id),
    refreshToken: (0, pg_core_1.varchar)("refreshToken")
});
exports.Video = (0, pg_core_1.pgTable)("video", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    title: (0, pg_core_1.varchar)("title"),
    thumbnail: (0, pg_core_1.varchar)("thumbnail"),
    editor: (0, pg_core_1.uuid)("editor").references(() => exports.User.id),
    workspace: (0, pg_core_1.uuid)("workspace").references(() => exports.Workspace.id)
});
