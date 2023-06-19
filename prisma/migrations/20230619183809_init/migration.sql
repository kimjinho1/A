/*
  Warnings:

  - You are about to drop the column `car_type_code` on the `CarDrive` table. All the data in the column will be lost.
  - You are about to drop the column `car_type_code` on the `CarEngine` table. All the data in the column will be lost.
  - You are about to drop the column `car_type_code` on the `CarMission` table. All the data in the column will be lost.
  - You are about to drop the column `car_type_code` on the `CarTrim` table. All the data in the column will be lost.
  - You are about to drop the column `car_body_code` on the `CarType` table. All the data in the column will be lost.
  - You are about to drop the `CarBody` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `car_code` to the `CarDrive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `car_code` to the `CarEngine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `car_code` to the `CarMission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `car_code` to the `CarTrim` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CarDrive` DROP FOREIGN KEY `CarDrive_car_type_code_fkey`;

-- DropForeignKey
ALTER TABLE `CarEngine` DROP FOREIGN KEY `CarEngine_car_type_code_fkey`;

-- DropForeignKey
ALTER TABLE `CarMission` DROP FOREIGN KEY `CarMission_car_type_code_fkey`;

-- DropForeignKey
ALTER TABLE `CarTrim` DROP FOREIGN KEY `CarTrim_car_type_code_fkey`;

-- DropForeignKey
ALTER TABLE `CarType` DROP FOREIGN KEY `CarType_car_body_code_fkey`;

-- AlterTable
ALTER TABLE `CarDrive` DROP COLUMN `car_type_code`,
    ADD COLUMN `car_code` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `CarEngine` DROP COLUMN `car_type_code`,
    ADD COLUMN `car_code` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `CarMission` DROP COLUMN `car_type_code`,
    ADD COLUMN `car_code` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `CarTrim` DROP COLUMN `car_type_code`,
    ADD COLUMN `car_code` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `CarType` DROP COLUMN `car_body_code`,
    MODIFY `car_type_name` VARCHAR(20) NOT NULL;

-- DropTable
DROP TABLE `CarBody`;

-- CreateTable
CREATE TABLE `Car` (
    `car_code` VARCHAR(10) NOT NULL,
    `car_name` VARCHAR(10) NOT NULL,
    `car_type_code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `Car_car_name_key`(`car_name`),
    PRIMARY KEY (`car_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_car_type_code_fkey` FOREIGN KEY (`car_type_code`) REFERENCES `CarType`(`car_type_code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarEngine` ADD CONSTRAINT `CarEngine_car_code_fkey` FOREIGN KEY (`car_code`) REFERENCES `Car`(`car_code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarMission` ADD CONSTRAINT `CarMission_car_code_fkey` FOREIGN KEY (`car_code`) REFERENCES `Car`(`car_code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarDrive` ADD CONSTRAINT `CarDrive_car_code_fkey` FOREIGN KEY (`car_code`) REFERENCES `Car`(`car_code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarTrim` ADD CONSTRAINT `CarTrim_car_code_fkey` FOREIGN KEY (`car_code`) REFERENCES `Car`(`car_code`) ON DELETE CASCADE ON UPDATE CASCADE;
