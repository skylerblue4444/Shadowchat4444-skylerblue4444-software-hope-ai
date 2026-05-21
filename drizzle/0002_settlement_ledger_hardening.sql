CREATE TABLE `settlementLedger` (
	`id` int AUTO_INCREMENT NOT NULL,
	`idempotencyKey` varchar(160) NOT NULL,
	`transactionId` int,
	`userId` int NOT NULL,
	`counterpartyUserId` int,
	`source` enum('mining','staking','casino','tip','trading','wallet','payment','escrow','admin') NOT NULL,
	`direction` enum('credit','debit','neutral') NOT NULL,
	`token` varchar(20) NOT NULL,
	`amount` varchar(50) NOT NULL,
	`provider` varchar(80) NOT NULL DEFAULT 'beta-ledger',
	`providerStatus` enum('beta_ledger','paper','test_mode','provider_gated','disabled','review_required') NOT NULL DEFAULT 'beta_ledger',
	`settlementStatus` enum('recorded','pending_review','approved','rejected','voided','provider_pending') NOT NULL DEFAULT 'recorded',
	`reviewStatus` enum('none','queued','approved','rejected') NOT NULL DEFAULT 'none',
	`memo` varchar(255),
	`auditJson` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `settlementLedger_id` PRIMARY KEY(`id`),
	CONSTRAINT `settlementLedger_idempotencyKey_unique` UNIQUE(`idempotencyKey`)
);
--> statement-breakpoint
ALTER TABLE `settlementLedger` ADD CONSTRAINT `settlementLedger_transactionId_transactions_id_fk` FOREIGN KEY (`transactionId`) REFERENCES `transactions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `settlementLedger` ADD CONSTRAINT `settlementLedger_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `settlementLedger` ADD CONSTRAINT `settlementLedger_counterpartyUserId_users_id_fk` FOREIGN KEY (`counterpartyUserId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;
