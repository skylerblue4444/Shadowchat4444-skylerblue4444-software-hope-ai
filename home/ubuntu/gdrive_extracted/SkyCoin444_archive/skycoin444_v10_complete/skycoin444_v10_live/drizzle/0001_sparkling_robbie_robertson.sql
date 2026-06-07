CREATE TABLE `apiKeys` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`prefix` varchar(20) NOT NULL,
	`secret` text NOT NULL,
	`scopes` text NOT NULL,
	`lastUsed` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `apiKeys_id` PRIMARY KEY(`id`),
	CONSTRAINT `apiKeys_prefix_unique` UNIQUE(`prefix`)
);
--> statement-breakpoint
CREATE TABLE `chatHistory` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`role` enum('user','assistant') NOT NULL,
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chatHistory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `holdings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`asset` varchar(20) NOT NULL,
	`amount` varchar(50) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `holdings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `leaderboard` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`xpScore` int DEFAULT 0,
	`miningScore` int DEFAULT 0,
	`stakingScore` int DEFAULT 0,
	`tradingScore` int DEFAULT 0,
	`referralScore` int DEFAULT 0,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `leaderboard_id` PRIMARY KEY(`id`),
	CONSTRAINT `leaderboard_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`senderId` int NOT NULL,
	`recipientId` int NOT NULL,
	`content` text NOT NULL,
	`tipAmount` int DEFAULT 0,
	`read` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `onboardingProgress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`step` int DEFAULT 1,
	`completed` int DEFAULT 0,
	`xpEarned` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `onboardingProgress_id` PRIMARY KEY(`id`),
	CONSTRAINT `onboardingProgress_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `portfolios` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`totalValue` varchar(50) NOT NULL DEFAULT '10000',
	`totalXP` int DEFAULT 0,
	`level` int DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `portfolios_id` PRIMARY KEY(`id`),
	CONSTRAINT `portfolios_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`content` text NOT NULL,
	`imageUrl` text,
	`likes` int DEFAULT 0,
	`replies` int DEFAULT 0,
	`shares` int DEFAULT 0,
	`tips` int DEFAULT 0,
	`aiRank` int DEFAULT 0,
	`sentiment` varchar(20) DEFAULT 'neutral',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `referrals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`referrerId` int NOT NULL,
	`referredId` int NOT NULL,
	`tier` enum('bronze','silver','gold','platinum','diamond') DEFAULT 'bronze',
	`earned` varchar(50) DEFAULT '0',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `referrals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `trades` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`pair` varchar(20) NOT NULL,
	`type` enum('buy','sell') NOT NULL,
	`amount` varchar(50) NOT NULL,
	`price` varchar(50) NOT NULL,
	`total` varchar(50) NOT NULL,
	`status` enum('pending','filled','cancelled') DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `trades_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `vaults` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`amount` varchar(50) NOT NULL,
	`tier` enum('flex','quarter','annual','diamond') NOT NULL,
	`apy` varchar(10) NOT NULL,
	`lockedUntil` timestamp NOT NULL,
	`label` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `vaults_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `apiKeys` ADD CONSTRAINT `apiKeys_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `chatHistory` ADD CONSTRAINT `chatHistory_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `holdings` ADD CONSTRAINT `holdings_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `leaderboard` ADD CONSTRAINT `leaderboard_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `messages` ADD CONSTRAINT `messages_senderId_users_id_fk` FOREIGN KEY (`senderId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `messages` ADD CONSTRAINT `messages_recipientId_users_id_fk` FOREIGN KEY (`recipientId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `onboardingProgress` ADD CONSTRAINT `onboardingProgress_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `portfolios` ADD CONSTRAINT `portfolios_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `posts` ADD CONSTRAINT `posts_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `referrals` ADD CONSTRAINT `referrals_referrerId_users_id_fk` FOREIGN KEY (`referrerId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `referrals` ADD CONSTRAINT `referrals_referredId_users_id_fk` FOREIGN KEY (`referredId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `trades` ADD CONSTRAINT `trades_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `vaults` ADD CONSTRAINT `vaults_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;