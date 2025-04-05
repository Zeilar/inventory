CREATE TABLE `images` (
	`id` text PRIMARY KEY NOT NULL,
	`receiptId` integer,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`receiptId`) REFERENCES `receipts`(`id`) ON UPDATE no action ON DELETE cascade
);
