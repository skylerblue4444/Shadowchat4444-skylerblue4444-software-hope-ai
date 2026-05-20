CREATE TABLE `supplierProviderSyncs` (
  `id` int AUTO_INCREMENT NOT NULL,
  `provider` enum('dhgate','alibaba','admin_import','private_supplier') NOT NULL,
  `displayName` varchar(160) NOT NULL,
  `apiId` varchar(160),
  `providerStatus` enum('not_configured','configured','syncing','healthy','degraded','disabled') NOT NULL DEFAULT 'not_configured',
  `lastSyncAt` timestamp NULL,
  `lastError` text,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `supplierProviderSyncs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `supplierCatalogItems` (
  `id` int AUTO_INCREMENT NOT NULL,
  `provider` enum('dhgate','alibaba','admin_import','private_supplier') NOT NULL DEFAULT 'admin_import',
  `externalId` varchar(180),
  `title` varchar(220) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(80) NOT NULL DEFAULT 'general',
  `supplierName` varchar(180) NOT NULL,
  `supplierCountry` varchar(80) NOT NULL DEFAULT 'global',
  `sourceUrl` text,
  `imageUrlsJson` text NOT NULL,
  `reviewSummaryJson` text,
  `specsJson` text,
  `price` varchar(50) NOT NULL,
  `compareAtPrice` varchar(50),
  `currency` varchar(12) NOT NULL DEFAULT 'USD',
  `serviceFee` varchar(50) NOT NULL DEFAULT '44',
  `marginPercent` varchar(50) NOT NULL DEFAULT '18',
  `rating` varchar(20) NOT NULL DEFAULT '0',
  `reviewCount` int NOT NULL DEFAULT 0,
  `soldCount` int NOT NULL DEFAULT 0,
  `minOrder` int NOT NULL DEFAULT 1,
  `shippingSummary` varchar(180) NOT NULL DEFAULT 'Supplier quoted shipping',
  `shippingDays` varchar(80) NOT NULL DEFAULT 'Quoted after review',
  `providerStatus` enum('live_api','admin_import','curated_seed','needs_review','paused','removed') NOT NULL DEFAULT 'admin_import',
  `reviewStatus` enum('queued','approved','rejected') NOT NULL DEFAULT 'approved',
  `createdByAdminId` int,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `supplierCatalogItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `supplierOrderRequests` (
  `id` int AUTO_INCREMENT NOT NULL,
  `requesterId` int NOT NULL,
  `provider` enum('dhgate','alibaba','admin_import','private_supplier','mixed') NOT NULL DEFAULT 'mixed',
  `cartItemsJson` text NOT NULL,
  `subtotal` varchar(50) NOT NULL,
  `serviceFee` varchar(50) NOT NULL DEFAULT '44',
  `platformMargin` varchar(50) NOT NULL DEFAULT '0',
  `estimatedSupplierCost` varchar(50) NOT NULL DEFAULT '0',
  `total` varchar(50) NOT NULL,
  `currency` varchar(12) NOT NULL DEFAULT 'USD',
  `orderStatus` enum('queued','admin_review','approved','provider_submitted','fulfilled','rejected','cancelled') NOT NULL DEFAULT 'queued',
  `paymentStatus` enum('not_charged','quote_sent','held','paid','refunded') NOT NULL DEFAULT 'not_charged',
  `shippingName` varchar(180),
  `shippingAddress` text,
  `buyerNote` text,
  `adminNote` text,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `supplierOrderRequests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `supplierCatalogItems` ADD CONSTRAINT `supplierCatalogItems_createdByAdminId_users_id_fk` FOREIGN KEY (`createdByAdminId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE `supplierOrderRequests` ADD CONSTRAINT `supplierOrderRequests_requesterId_users_id_fk` FOREIGN KEY (`requesterId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;
