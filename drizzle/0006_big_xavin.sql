CREATE TABLE "items_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"article_id" text,
	"quantity" integer DEFAULT 1 NOT NULL,
	"files" text DEFAULT '' NOT NULL,
	"archived" boolean DEFAULT false NOT NULL,
	"tags" text DEFAULT '' NOT NULL,
	"links" text DEFAULT '' NOT NULL,
	"price" text,
	"archived_at" timestamp with time zone,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"item_id" integer NOT NULL
);
