/*
  Warnings:

  - The primary key for the `logoslist` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `favouritelogoslist` DROP FOREIGN KEY `FavouriteLogosList_logosList_id_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `Users_logosList_id_fkey`;

-- AlterTable
ALTER TABLE `favouritelogoslist` MODIFY `logosList_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `logoslist` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `users` MODIFY `logosList_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_logosList_id_fkey` FOREIGN KEY (`logosList_id`) REFERENCES `LogosList`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavouriteLogosList` ADD CONSTRAINT `FavouriteLogosList_logosList_id_fkey` FOREIGN KEY (`logosList_id`) REFERENCES `LogosList`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
