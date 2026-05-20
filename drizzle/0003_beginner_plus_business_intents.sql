CREATE TABLE `beginnerPlusBusinessIntents` (
  `id` int AUTO_INCREMENT NOT NULL,
  `intentKey` varchar(160) NOT NULL,
  `userId` int NOT NULL,
  `action` enum('publish-guided-post','review-profile-trust','build-business-offer','queue-creator-monetization','open-partner-path') NOT NULL,
  `note` text,
  `status` enum('queued-for-guided-user-review','queued-for-business-and-creator-review','approved','rejected') NOT NULL DEFAULT 'queued-for-guided-user-review',
  `reviewStatus` enum('none','queued','approved','rejected') NOT NULL DEFAULT 'none',
  `reviewRequired` int NOT NULL DEFAULT 0,
  `actionJson` text,
  `guidanceJson` text,
  `guardrailsJson` text,
  `adminNote` text,
  `reviewedById` int,
  `reviewedAt` timestamp NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `beginnerPlusBusinessIntents_id` PRIMARY KEY(`id`),
  CONSTRAINT `beginnerPlusBusinessIntents_intentKey_unique` UNIQUE(`intentKey`),
  CONSTRAINT `beginnerPlusBusinessIntents_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `beginnerPlusBusinessIntents_reviewedById_users_id_fk` FOREIGN KEY (`reviewedById`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
--> statement-breakpoint
CREATE INDEX `beginnerPlusBusinessIntents_user_review_idx` ON `beginnerPlusBusinessIntents` (`userId`, `reviewStatus`);
--> statement-breakpoint
CREATE INDEX `beginnerPlusBusinessIntents_review_created_idx` ON `beginnerPlusBusinessIntents` (`reviewStatus`, `createdAt`);
