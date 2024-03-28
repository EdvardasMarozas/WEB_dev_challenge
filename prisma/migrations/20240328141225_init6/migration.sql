/*
  Warnings:

  - You are about to alter the column `logosList_id` on the `favouritelogoslist` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `logoslist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `logoslist` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `logosList_id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `image_id` to the `LogosList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `favouritelogoslist` DROP FOREIGN KEY `FavouriteLogosList_logosList_id_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `Users_logosList_id_fkey`;

-- AlterTable
ALTER TABLE `favouritelogoslist` MODIFY `logosList_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `logoslist` DROP PRIMARY KEY,
    ADD COLUMN `image_id` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `users` MODIFY `logosList_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_logosList_id_fkey` FOREIGN KEY (`logosList_id`) REFERENCES `LogosList`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavouriteLogosList` ADD CONSTRAINT `FavouriteLogosList_logosList_id_fkey` FOREIGN KEY (`logosList_id`) REFERENCES `LogosList`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
