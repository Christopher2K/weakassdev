DO $$ BEGIN
 CREATE TYPE "PostStatus" AS ENUM('PUBLISHED', 'ARCHIVED', 'FLAGGED', 'DELETED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "ReportOutcome" AS ENUM('APPROVED', 'REJECTED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "ReportReason" AS ENUM('OFFENSIVE', 'DUPLICATE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "UserRole" AS ENUM('ADMIN', 'USER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "UserStatus" AS ENUM('BANNED', 'DELETED', 'ACTIVE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Post" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"content" text NOT NULL,
	"status" "PostStatus" DEFAULT 'PUBLISHED' NOT NULL,
	"author_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "PostReport" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"reporter_id" uuid NOT NULL,
	"post_id" uuid NOT NULL,
	"reason" "ReportReason" NOT NULL,
	"reason_context" text,
	"outcome" "ReportOutcome",
	"outcome_context" text,
	CONSTRAINT "PostReport_post_id_reporter_id_unique" UNIQUE("post_id","reporter_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"username" varchar(20) NOT NULL,
	"password" varchar,
	"email" varchar NOT NULL,
	"avatar_url" varchar,
	"biography" text,
	"external_links" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"role" "UserRole" DEFAULT 'USER' NOT NULL,
	"status" "UserStatus" DEFAULT 'ACTIVE' NOT NULL,
	CONSTRAINT "User_username_unique" UNIQUE("username"),
	CONSTRAINT "User_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserPostReaction" (
	"post_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"reaction" varchar(20) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT UserPostReaction_post_id_user_id PRIMARY KEY("post_id","user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Post" ADD CONSTRAINT "Post_author_id_User_id_fk" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "PostReport" ADD CONSTRAINT "PostReport_reporter_id_User_id_fk" FOREIGN KEY ("reporter_id") REFERENCES "User"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "PostReport" ADD CONSTRAINT "PostReport_post_id_Post_id_fk" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserPostReaction" ADD CONSTRAINT "UserPostReaction_post_id_Post_id_fk" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserPostReaction" ADD CONSTRAINT "UserPostReaction_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
