CREATE TYPE "public"."status" AS ENUM('reviewPending', 'uploadPending');--> statement-breakpoint
CREATE TYPE "public"."userType" AS ENUM('youtuber', 'editor');--> statement-breakpoint
CREATE TYPE "public"."videoType" AS ENUM('public', 'private', 'unlisted');--> statement-breakpoint
CREATE TABLE "ws-editor-join" (
	"workspace" uuid,
	"editor" uuid,
	CONSTRAINT "pk-ws-editor-join" PRIMARY KEY("editor","workspace")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar,
	"email" varchar,
	"password" varchar,
	"userType" "userType" NOT NULL,
	"refreshToken" varchar
);
--> statement-breakpoint
CREATE TABLE "video" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar NOT NULL,
	"desc" varchar,
	"videoType" "videoType" NOT NULL,
	"thumbnail" varchar,
	"fileId" varchar NOT NULL,
	"url" varchar,
	"status" "status" NOT NULL,
	"willUploadAt" timestamp with time zone,
	"editor" uuid,
	"workspace" uuid
);
--> statement-breakpoint
CREATE TABLE "ws-video-editor-join" (
	"videoId" uuid,
	"editor" uuid,
	"workspace" uuid,
	CONSTRAINT "pk-ws-video-editor-join" PRIMARY KEY("videoId","workspace","editor")
);
--> statement-breakpoint
CREATE TABLE "workspace" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar,
	"userHandle" varchar,
	"avatar" varchar,
	"owner" uuid,
	"refreshToken" varchar
);
--> statement-breakpoint
ALTER TABLE "ws-editor-join" ADD CONSTRAINT "ws-editor-join_workspace_workspace_id_fk" FOREIGN KEY ("workspace") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ws-editor-join" ADD CONSTRAINT "ws-editor-join_editor_user_id_fk" FOREIGN KEY ("editor") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video" ADD CONSTRAINT "video_editor_user_id_fk" FOREIGN KEY ("editor") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video" ADD CONSTRAINT "video_workspace_workspace_id_fk" FOREIGN KEY ("workspace") REFERENCES "public"."workspace"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ws-video-editor-join" ADD CONSTRAINT "ws-video-editor-join_editor_user_id_fk" FOREIGN KEY ("editor") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ws-video-editor-join" ADD CONSTRAINT "ws-video-editor-join_workspace_workspace_id_fk" FOREIGN KEY ("workspace") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_owner_user_id_fk" FOREIGN KEY ("owner") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;