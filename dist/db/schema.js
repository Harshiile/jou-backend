"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoTable = exports.statusEnum = exports.videoTypeEnum = exports.WorkspaceEditorJoin = exports.WorkspaceTable = exports.UserTable = exports.userTypeEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.userTypeEnum = (0, pg_core_1.pgEnum)('userType', ['youtuber', 'editor']);
exports.UserTable = (0, pg_core_1.pgTable)("user", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    name: (0, pg_core_1.varchar)("name"),
    email: (0, pg_core_1.varchar)("email"),
    password: (0, pg_core_1.varchar)("password"),
    userType: (0, exports.userTypeEnum)('userType').notNull(),
    refreshToken: (0, pg_core_1.varchar)("refreshToken")
});
exports.WorkspaceTable = (0, pg_core_1.pgTable)("workspace", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    name: (0, pg_core_1.varchar)("name"),
    userHandle: (0, pg_core_1.varchar)("userHandle"),
    avatar: (0, pg_core_1.varchar)("avatar"),
    email: (0, pg_core_1.varchar)("email"),
    owner: (0, pg_core_1.uuid)("owner").references(() => exports.UserTable.id, { onDelete: 'cascade' }),
    refreshToken: (0, pg_core_1.varchar)("refreshToken")
});
exports.WorkspaceEditorJoin = (0, pg_core_1.pgTable)('workspace_editor', {
    workspace: (0, pg_core_1.uuid)("workspace").references(() => exports.WorkspaceTable.id, { onDelete: 'cascade' }),
    editor: (0, pg_core_1.uuid)("editor").references(() => exports.UserTable.id, { onDelete: 'cascade' })
}, table => [
    (0, pg_core_1.primaryKey)({
        name: 'PK',
        columns: [table.editor, table.workspace]
    })
]);
exports.videoTypeEnum = (0, pg_core_1.pgEnum)('videoType', ['public', 'private', 'unlisted']);
exports.statusEnum = (0, pg_core_1.pgEnum)('status', ['reviewPending', 'uploadPending', 'rejected', 'uploaded']);
exports.VideoTable = (0, pg_core_1.pgTable)("video", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    title: (0, pg_core_1.varchar)("title"),
    desc: (0, pg_core_1.varchar)("desc"),
    videoType: (0, exports.videoTypeEnum)('videoType').notNull(),
    thumbnail: (0, pg_core_1.varchar)('thumbnail'),
    fileId: (0, pg_core_1.varchar)('fileId'),
    url: (0, pg_core_1.varchar)('url'),
    status: (0, exports.statusEnum)('status').notNull(),
    uploadedAt: (0, pg_core_1.timestamp)('uploadedAt', { withTimezone: true }),
    editor: (0, pg_core_1.uuid)("editor").references(() => exports.UserTable.id),
    workspace: (0, pg_core_1.uuid)("workspace").references(() => exports.WorkspaceTable.id)
});
