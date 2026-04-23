CREATE TABLE `bookings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientName` varchar(255) NOT NULL,
	`car` varchar(255) NOT NULL,
	`pickupDate` varchar(50) NOT NULL,
	`returnDate` varchar(50) NOT NULL,
	`clientCharge` decimal(10,2) NOT NULL,
	`supplierCost` decimal(10,2) NOT NULL,
	`supplierName` varchar(255),
	`profit` decimal(10,2),
	`status` enum('upcoming','active','completed','cancelled') NOT NULL DEFAULT 'upcoming',
	`notes` text,
	`linkedLeadId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `bookings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `clients` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`email` varchar(320),
	`instagram` varchar(100),
	`totalSpend` decimal(12,2) DEFAULT '0',
	`totalBookings` int DEFAULT 0,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `clients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lead_status_history` (
	`id` int AUTO_INCREMENT NOT NULL,
	`leadId` int NOT NULL,
	`fromStatus` varchar(50) NOT NULL,
	`toStatus` varchar(50) NOT NULL,
	`note` text,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `lead_status_history_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `leads` MODIFY COLUMN `status` enum('new','contacted','negotiating','confirmed','completed','lost','archived') NOT NULL DEFAULT 'new';--> statement-breakpoint
ALTER TABLE `leads` ADD `email` varchar(320);--> statement-breakpoint
ALTER TABLE `leads` ADD `instagram` varchar(100);--> statement-breakpoint
ALTER TABLE `leads` ADD `budget` varchar(100);--> statement-breakpoint
ALTER TABLE `leads` ADD `dateNeeded` varchar(100);--> statement-breakpoint
ALTER TABLE `leads` ADD `source` varchar(100);