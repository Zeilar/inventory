CREATE TABLE "items" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"article_id" text,
	"quantity" integer DEFAULT 1 NOT NULL,
	"files" text DEFAULT '' NOT NULL,
	"archived" boolean DEFAULT false NOT NULL,
	"tags" text DEFAULT '' NOT NULL,
	"archived_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"value" json DEFAULT '{"itemsPerPage":10}'::json NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
