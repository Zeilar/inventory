ALTER TABLE "items" ALTER COLUMN "original_price" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "archived_at" SET DATA TYPE date;