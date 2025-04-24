CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar,
	"email" varchar,
	"password" varchar,
	"role" integer,
	"refreshToken" varchar
);
--> statement-breakpoint
CREATE TABLE "video" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar,
	"thumbnail" varchar,
	"editor" uuid,
	"workspace" uuid
);
--> statement-breakpoint
CREATE TABLE "workspace" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar,
	"avatar" varchar,
	"email" varchar,
	"owner" uuid,
	"refreshToken" varchar
);
--> statement-breakpoint
ALTER TABLE "video" ADD CONSTRAINT "video_editor_user_id_fk" FOREIGN KEY ("editor") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video" ADD CONSTRAINT "video_workspace_workspace_id_fk" FOREIGN KEY ("workspace") REFERENCES "public"."workspace"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_owner_user_id_fk" FOREIGN KEY ("owner") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;