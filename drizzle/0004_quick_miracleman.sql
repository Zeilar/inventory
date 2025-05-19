PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`articleId` text,
	`quantity` integer DEFAULT 1 NOT NULL,
	`files` text DEFAULT '' NOT NULL,
	`archived` integer DEFAULT false NOT NULL,
	`tags` text DEFAULT '' NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_items`("id", "title", "articleId", "quantity", "files", "archived", "tags", "createdAt", "updatedAt") SELECT "id", "title", "articleId", "quantity", "files", "archived", "tags", "createdAt", "updatedAt" FROM `items`;--> statement-breakpoint
DROP TABLE `items`;--> statement-breakpoint
ALTER TABLE `__new_items` RENAME TO `items`;--> statement-breakpoint
PRAGMA foreign_keys=ON;