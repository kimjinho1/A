-- CreateTable
CREATE TABLE `CarType` (
    `car_type_code` VARCHAR(10) NOT NULL,
    `car_type_name` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `CarType_car_type_name_key`(`car_type_name`),
    PRIMARY KEY (`car_type_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Car` (
    `car_code` VARCHAR(10) NOT NULL,
    `car_name` VARCHAR(10) NOT NULL,
    `car_type_code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `Car_car_name_key`(`car_name`),
    PRIMARY KEY (`car_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Engine` (
    `engine_code` VARCHAR(10) NOT NULL,
    `engine_name` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `Engine_engine_name_key`(`engine_name`),
    PRIMARY KEY (`engine_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mission` (
    `mission_code` VARCHAR(10) NOT NULL,
    `mission_name` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`mission_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Drive` (
    `drive_code` VARCHAR(10) NOT NULL,
    `drive_name` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `Drive_drive_name_key`(`drive_name`),
    PRIMARY KEY (`drive_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Trim` (
    `trim_code` VARCHAR(10) NOT NULL,
    `trim_name` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `Trim_trim_name_key`(`trim_name`),
    PRIMARY KEY (`trim_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarEngine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `car_code` VARCHAR(10) NOT NULL,
    `engine_code` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarMission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `car_code` VARCHAR(10) NOT NULL,
    `mission_code` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarDrive` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `car_code` VARCHAR(10) NOT NULL,
    `drive_code` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarTrim` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `car_code` VARCHAR(10) NOT NULL,
    `trim_code` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarModel` (
    `model_code` VARCHAR(10) NOT NULL,
    `model_name` VARCHAR(50) NOT NULL,
    `model_price` INTEGER NOT NULL,
    `car_code` VARCHAR(10) NOT NULL,
    `engine_code` VARCHAR(10) NOT NULL,
    `mission_code` VARCHAR(10) NOT NULL,
    `drive_code` VARCHAR(10) NULL,
    `trim_code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `CarModel_model_name_key`(`model_name`),
    PRIMARY KEY (`model_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IntColor` (
    `int_color_code` VARCHAR(10) NOT NULL,
    `int_color_name` VARCHAR(50) NOT NULL,
    `int_color_price` INTEGER NOT NULL,

    UNIQUE INDEX `IntColor_int_color_name_key`(`int_color_name`),
    PRIMARY KEY (`int_color_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExtColor` (
    `ext_color_code` VARCHAR(10) NOT NULL,
    `ext_color_name` VARCHAR(50) NOT NULL,
    `ext_color_price` INTEGER NOT NULL,

    UNIQUE INDEX `ExtColor_ext_color_name_key`(`ext_color_name`),
    PRIMARY KEY (`ext_color_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarTrimIntColor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `car_code` VARCHAR(10) NOT NULL,
    `trim_code` VARCHAR(10) NOT NULL,
    `int_color_code` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IntExtColor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `int_color_code` VARCHAR(10) NOT NULL,
    `ext_color_code` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
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

-- AddForeignKey
ALTER TABLE `CarModel` ADD CONSTRAINT `CarModel_car_code_fkey` FOREIGN KEY (`car_code`) REFERENCES `Car`(`car_code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarModel` ADD CONSTRAINT `CarModel_engine_code_fkey` FOREIGN KEY (`engine_code`) REFERENCES `Engine`(`engine_code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarModel` ADD CONSTRAINT `CarModel_mission_code_fkey` FOREIGN KEY (`mission_code`) REFERENCES `Mission`(`mission_code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarModel` ADD CONSTRAINT `CarModel_drive_code_fkey` FOREIGN KEY (`drive_code`) REFERENCES `Drive`(`drive_code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarModel` ADD CONSTRAINT `CarModel_trim_code_fkey` FOREIGN KEY (`trim_code`) REFERENCES `Trim`(`trim_code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarTrimIntColor` ADD CONSTRAINT `CarTrimIntColor_car_code_fkey` FOREIGN KEY (`car_code`) REFERENCES `Car`(`car_code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarTrimIntColor` ADD CONSTRAINT `CarTrimIntColor_trim_code_fkey` FOREIGN KEY (`trim_code`) REFERENCES `Trim`(`trim_code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarTrimIntColor` ADD CONSTRAINT `CarTrimIntColor_int_color_code_fkey` FOREIGN KEY (`int_color_code`) REFERENCES `IntColor`(`int_color_code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IntExtColor` ADD CONSTRAINT `IntExtColor_int_color_code_fkey` FOREIGN KEY (`int_color_code`) REFERENCES `IntColor`(`int_color_code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IntExtColor` ADD CONSTRAINT `IntExtColor_ext_color_code_fkey` FOREIGN KEY (`ext_color_code`) REFERENCES `ExtColor`(`ext_color_code`) ON DELETE CASCADE ON UPDATE CASCADE;
