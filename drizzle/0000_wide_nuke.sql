CREATE TYPE "public"."status" AS ENUM('reviewPending', 'uploadPending', 'rejected', 'uploaded');--> statement-breakpoint
CREATE TYPE "public"."userType" AS ENUM('youtuber', 'editor');--> statement-breakpoint
CREATE TYPE "public"."videoType" AS ENUM('public', 'private', 'unlisted');--> statement-breakpoint
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
	"title" varchar,
	"desc" varchar,
	"videoType" "videoType" NOT NULL,
	"thumbnail" varchar,
	"status" "status" NOT NULL,
	"uploadedAt" timestamp with time zone,
	"editor" uuid,
	"workspace" uuid
);
--> statement-breakpoint
CREATE TABLE "workspace_editor" (
	"workspace" uuid,
	"editor" uuid,
	CONSTRAINT "PK" PRIMARY KEY("editor","workspace")
);
--> statement-breakpoint
CREATE TABLE "workspace" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar,
	"userHandle" varchar,
	"avatar" varchar,
	"email" varchar,
	"owner" uuid,
	"refreshToken" varchar
);
--> statement-breakpoint
ALTER TABLE "video" ADD CONSTRAINT "video_editor_user_id_fk" FOREIGN KEY ("editor") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video" ADD CONSTRAINT "video_workspace_workspace_id_fk" FOREIGN KEY ("workspace") REFERENCES "public"."workspace"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace_editor" ADD CONSTRAINT "workspace_editor_workspace_workspace_id_fk" FOREIGN KEY ("workspace") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace_editor" ADD CONSTRAINT "workspace_editor_editor_user_id_fk" FOREIGN KEY ("editor") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_owner_user_id_fk" FOREIGN KEY ("owner") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;