CREATE TABLE `tokens` (
	`ulid` text(26) PRIMARY KEY NOT NULL,
	`user_ulid` text(26) NOT NULL,
	`value` text NOT NULL,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`user_ulid`) REFERENCES `users`(`ulid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`ulid` text(26) PRIMARY KEY NOT NULL,
	`email` text(255) NOT NULL,
	`password` text(255) NOT NULL,
	`picture` text,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);