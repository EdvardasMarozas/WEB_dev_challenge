/*
  Warnings:

  - You are about to drop the column `favouriteLogos_id` on the `logoslist` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `logoslist` DROP FOREIGN KEY `LogosList_favouriteLogos_id_fkey`;

-- AlterTable
ALTER TABLE `favouritelogoslist` ADD COLUMN `logosList_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `logoslist` DROP COLUMN `favouriteLogos_id`;

-- AddForeignKey
ALTER TABLE `FavouriteLogosList` ADD CONSTRAINT `FavouriteLogosList_logosList_id_fkey` FOREIGN KEY (`logosList_id`) REFERENCES `LogosList`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
