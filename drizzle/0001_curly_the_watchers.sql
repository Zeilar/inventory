ALTER TABLE `items` ADD `title` text NOT NULL;--> statement-breakpoint
ALTER TABLE `items` ADD `quantity` integer DEFAULT 1;--> statement-breakpoint
CREATE UNIQUE INDEX `receipts_itemId_unique` ON `receipts` (`itemId`);--> statement-breakpoint
CREATE UNIQUE INDEX `images_id_unique` ON `images` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `images_receiptId_unique` ON `images` (`receiptId`);--> statement-breakpoint
CREATE UNIQUE INDEX `images_itemId_unique` ON `images` (`itemId`);