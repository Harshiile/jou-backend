"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoWorkspaceJoinTable = exports.VideoTable = exports.statusEnum = exports.videoTypeEnum = exports.EditorWorkspaceJoinTable = exports.WorkspaceTable = exports.UserTable = exports.userTypeEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
// User Details
exports.userTypeEnum = (0, pg_core_1.pgEnum)('userType', ['youtuber', 'editor']);
exports.UserTable = (0, pg_core_1.pgTable)("user", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    name: (0, pg_core_1.varchar)("name"),
    email: (0, pg_core_1.varchar)("email"),
    password: (0, pg_core_1.varchar)("password"),
    userType: (0, exports.userTypeEnum)('userType').notNull(),
    refreshToken: (0, pg_core_1.varchar)("refreshToken")
});
// Channel Details
exports.WorkspaceTable = (0, pg_core_1.pgTable)("workspace", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    name: (0, pg_core_1.varchar)("name"),
    userHandle: (0, pg_core_1.varchar)("userHandle"),
    avatar: (0, pg_core_1.varchar)("avatar"),
    owner: (0, pg_core_1.uuid)("owner").references(() => exports.UserTable.id, { onDelete: 'cascade' }),
    refreshToken: (0, pg_core_1.varchar)("refreshToken")
});
// Many-to-Many Workspace & Editor
exports.EditorWorkspaceJoinTable = (0, pg_core_1.pgTable)('ws-editor-join', {
    workspace: (0, pg_core_1.uuid)("workspace").references(() => exports.WorkspaceTable.id, { onDelete: 'cascade' }),
    editor: (0, pg_core_1.uuid)("editor").references(() => exports.UserTable.id, { onDelete: 'cascade' })
}, table => [
    (0, pg_core_1.primaryKey)({
        name: 'pk-ws-editor-join',
        columns: [table.editor, table.workspace]
    })
]);
// Just store video information until it uploads - Once video is uploaded delete perticular entity
exports.videoTypeEnum = (0, pg_core_1.pgEnum)('videoType', ['public', 'private', 'unlisted']);
exports.statusEnum = (0, pg_core_1.pgEnum)('status', ['reviewPending', 'uploadPending']);
exports.VideoTable = (0, pg_core_1.pgTable)("video", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    title: (0, pg_core_1.varchar)("title").notNull(),
    desc: (0, pg_core_1.varchar)("desc"),
    videoType: (0, exports.videoTypeEnum)('videoType').notNull(),
    thumbnail: (0, pg_core_1.varchar)('thumbnail'),
    fileId: (0, pg_core_1.varchar)('fileId').notNull(),
    duration: (0, pg_core_1.varchar)('duration').notNull(),
    status: (0, exports.statusEnum)('status').notNull(),
    willUploadAt: (0, pg_core_1.timestamp)('willUploadAt', { withTimezone: true }),
    editor: (0, pg_core_1.uuid)("editor").references(() => exports.UserTable.id), // This field going to VideoWorkspaceJoinTable
    workspace: (0, pg_core_1.uuid)("workspace").references(() => exports.WorkspaceTable.id) // This field going to VideoWorkspaceJoinTable
});
// Many-to-Many Workspace & Video
exports.VideoWorkspaceJoinTable = (0, pg_core_1.pgTable)('ws-video-editor-join', {
    videoId: (0, pg_core_1.varchar)("videoId"),
    editor: (0, pg_core_1.uuid)("editor").references(() => exports.UserTable.id),
    workspace: (0, pg_core_1.uuid)("workspace").references(() => exports.WorkspaceTable.id, { onDelete: 'cascade' }),
}, table => [
    (0, pg_core_1.primaryKey)({
        name: 'pk-ws-video-editor-join',
        columns: [table.videoId, table.workspace, table.editor]
    })
]);
