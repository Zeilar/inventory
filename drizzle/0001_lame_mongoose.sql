ALTER TABLE `receipts` ADD `imageWidth` integer;--> statement-breakpoint
ALTER TABLE `receipts` ADD `imageHeight` integer;--> statement-breakpoint
ALTER TABLE `receipts` ADD `createdAt` text DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `receipts` ADD `updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL;--> statement-breakpoint
ALTER TABLE `items` ADD `receiptId` integer REFERENCES receipts(id);--> statement-breakpoint
ALTER TABLE `items` ADD `createdAt` text DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `items` ADD `updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL;