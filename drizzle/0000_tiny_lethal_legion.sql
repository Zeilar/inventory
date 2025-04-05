CREATE TABLE `receipts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`image` blob
);
--> statement-breakpoint
CREATE TABLE `items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`image` text
);
