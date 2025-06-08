ALTER TABLE "items" RENAME COLUMN "original_price" TO "price";--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "archived_at" SET DATA TYPE timestamp with time zone;