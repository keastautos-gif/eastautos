DROP TABLE `bookings`;--> statement-breakpoint
DROP TABLE `clients`;--> statement-breakpoint
DROP TABLE `lead_status_history`;--> statement-breakpoint
ALTER TABLE `leads` MODIFY COLUMN `status` enum('new','contacted','qualified','closed','archived') NOT NULL DEFAULT 'new';--> statement-breakpoint
ALTER TABLE `leads` DROP COLUMN `email`;--> statement-breakpoint
ALTER TABLE `leads` DROP COLUMN `instagram`;--> statement-breakpoint
ALTER TABLE `leads` DROP COLUMN `budget`;--> statement-breakpoint
ALTER TABLE `leads` DROP COLUMN `dateNeeded`;--> statement-breakpoint
ALTER TABLE `leads` DROP COLUMN `source`;