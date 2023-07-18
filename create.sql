-- CreateTable
CREATE TABLE `CarType` (
    `car_type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `car_type_code` VARCHAR(10) NOT NULL,
    `car_type_name` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `CarType_car_type_code_key`(`car_type_code`),
    UNIQUE INDEX `CarType_car_type_name_key`(`car_type_name`),
    PRIMARY KEY (`car_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Car` (
    `car_id` INTEGER NOT NULL AUTO_INCREMENT,
    `car_code` VARCHAR(10) NOT NULL,
    `car_name` VARCHAR(10) NOT NULL,
    `car_image_path` VARCHAR(50) NOT NULL,
    `car_type_id` INTEGER NOT NULL,

    UNIQUE INDEX `Car_car_code_key`(`car_code`),
    UNIQUE INDEX `Car_car_name_key`(`car_name`),
    UNIQUE INDEX `Car_car_image_path_key`(`car_image_path`),
    PRIMARY KEY (`car_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Engine` (
    `engine_id` INTEGER NOT NULL AUTO_INCREMENT,
    `engine_code` VARCHAR(10) NOT NULL,
    `engine_name` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `Engine_engine_code_key`(`engine_code`),
    UNIQUE INDEX `Engine_engine_name_key`(`engine_name`),
    PRIMARY KEY (`engine_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mission` (
    `mission_id` INTEGER NOT NULL AUTO_INCREMENT,
    `mission_code` VARCHAR(10) NOT NULL,
    `mission_name` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `Mission_mission_code_key`(`mission_code`),
    PRIMARY KEY (`mission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Drive` (
    `drive_id` INTEGER NOT NULL AUTO_INCREMENT,
    `drive_code` VARCHAR(10) NOT NULL,
    `drive_name` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `Drive_drive_code_key`(`drive_code`),
    UNIQUE INDEX `Drive_drive_name_key`(`drive_name`),
    PRIMARY KEY (`drive_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Trim` (
    `trim_id` INTEGER NOT NULL AUTO_INCREMENT,
    `trim_code` VARCHAR(10) NOT NULL,
    `trim_name` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `Trim_trim_code_key`(`trim_code`),
    UNIQUE INDEX `Trim_trim_name_key`(`trim_name`),
    PRIMARY KEY (`trim_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarEngine` (
    `car_id` INTEGER NOT NULL,
    `engine_id` INTEGER NOT NULL,

    PRIMARY KEY (`car_id`, `engine_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarMission` (
    `car_id` INTEGER NOT NULL,
    `mission_id` INTEGER NOT NULL,

    PRIMARY KEY (`car_id`, `mission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarDrive` (
    `car_id` INTEGER NOT NULL,
    `drive_id` INTEGER NOT NULL,

    PRIMARY KEY (`car_id`, `drive_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarTrim` (
    `car_id` INTEGER NOT NULL,
    `trim_id` INTEGER NOT NULL,

    PRIMARY KEY (`car_id`, `trim_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarModel` (
    `model_id` INTEGER NOT NULL AUTO_INCREMENT,
    `model_code` VARCHAR(10) NOT NULL,
    `model_name` VARCHAR(50) NOT NULL,
    `model_price` INTEGER NOT NULL,
    `model_image_path` VARCHAR(50) NOT NULL,
    `car_id` INTEGER NOT NULL,
    `engine_id` INTEGER NOT NULL,
    `mission_id` INTEGER NOT NULL,
    `drive_id` INTEGER NULL,
    `trim_id` INTEGER NOT NULL,

    UNIQUE INDEX `CarModel_model_code_key`(`model_code`),
    UNIQUE INDEX `CarModel_model_name_key`(`model_name`),
    PRIMARY KEY (`model_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IntColor` (
    `int_color_id` INTEGER NOT NULL AUTO_INCREMENT,
    `int_color_code` VARCHAR(10) NOT NULL,
    `int_color_name` VARCHAR(50) NOT NULL,
    `int_color_image_path` VARCHAR(50) NOT NULL,
    `car_id` INTEGER NOT NULL,

    PRIMARY KEY (`int_color_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExtColor` (
    `ext_color_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ext_color_code` VARCHAR(10) NOT NULL,
    `ext_color_name` VARCHAR(50) NOT NULL,
    `ext_color_image_path` VARCHAR(50) NOT NULL,
    `car_id` INTEGER NOT NULL,

    PRIMARY KEY (`ext_color_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IntExtColor` (
    `int_color_id` INTEGER NOT NULL,
    `ext_color_id` INTEGER NOT NULL,

    PRIMARY KEY (`int_color_id`, `ext_color_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TrimIntColor` (
    `trim_id` INTEGER NOT NULL,
    `int_color_id` INTEGER NOT NULL,

    PRIMARY KEY (`trim_id`, `int_color_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OptionType` (
    `option_type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `option_type_name` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`option_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Option` (
    `option_id` INTEGER NOT NULL AUTO_INCREMENT,
    `option_code` VARCHAR(10) NOT NULL,
    `option_name` VARCHAR(50) NOT NULL,
    `option_price` INTEGER NOT NULL,
    `option_image_path` VARCHAR(50) NOT NULL,
    `option_type_id` INTEGER NOT NULL,

    UNIQUE INDEX `Option_option_code_key`(`option_code`),
    PRIMARY KEY (`option_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarModelOption` (
    `model_id` INTEGER NOT NULL,
    `option_id` INTEGER NOT NULL,

    PRIMARY KEY (`model_id`, `option_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IntColorOption` (
    `int_color_id` INTEGER NOT NULL,
    `option_id` INTEGER NOT NULL,

    PRIMARY KEY (`int_color_id`, `option_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActivateOption` (
    `trim_id` INTEGER NOT NULL,
    `option_id` INTEGER NOT NULL,
    `activate_option_id` INTEGER NOT NULL,

    PRIMARY KEY (`trim_id`, `option_id`, `activate_option_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DeactivateOption` (
    `option_id` INTEGER NOT NULL,
    `deactivate_option_id` INTEGER NOT NULL,

    PRIMARY KEY (`option_id`, `deactivate_option_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DeleteOption` (
    `option_id` INTEGER NOT NULL,
    `delete_option_id` INTEGER NOT NULL,

    PRIMARY KEY (`option_id`, `delete_option_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_car_type_id_fkey` FOREIGN KEY (`car_type_id`) REFERENCES `CarType`(`car_type_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarEngine` ADD CONSTRAINT `CarEngine_car_id_fkey` FOREIGN KEY (`car_id`) REFERENCES `Car`(`car_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarEngine` ADD CONSTRAINT `CarEngine_engine_id_fkey` FOREIGN KEY (`engine_id`) REFERENCES `Engine`(`engine_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarMission` ADD CONSTRAINT `CarMission_car_id_fkey` FOREIGN KEY (`car_id`) REFERENCES `Car`(`car_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarMission` ADD CONSTRAINT `CarMission_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `Mission`(`mission_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarDrive` ADD CONSTRAINT `CarDrive_car_id_fkey` FOREIGN KEY (`car_id`) REFERENCES `Car`(`car_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarDrive` ADD CONSTRAINT `CarDrive_drive_id_fkey` FOREIGN KEY (`drive_id`) REFERENCES `Drive`(`drive_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarTrim` ADD CONSTRAINT `CarTrim_car_id_fkey` FOREIGN KEY (`car_id`) REFERENCES `Car`(`car_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarTrim` ADD CONSTRAINT `CarTrim_trim_id_fkey` FOREIGN KEY (`trim_id`) REFERENCES `Trim`(`trim_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarModel` ADD CONSTRAINT `CarModel_car_id_fkey` FOREIGN KEY (`car_id`) REFERENCES `Car`(`car_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarModel` ADD CONSTRAINT `CarModel_engine_id_fkey` FOREIGN KEY (`engine_id`) REFERENCES `Engine`(`engine_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarModel` ADD CONSTRAINT `CarModel_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `Mission`(`mission_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarModel` ADD CONSTRAINT `CarModel_drive_id_fkey` FOREIGN KEY (`drive_id`) REFERENCES `Drive`(`drive_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarModel` ADD CONSTRAINT `CarModel_trim_id_fkey` FOREIGN KEY (`trim_id`) REFERENCES `Trim`(`trim_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IntColor` ADD CONSTRAINT `IntColor_car_id_fkey` FOREIGN KEY (`car_id`) REFERENCES `Car`(`car_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExtColor` ADD CONSTRAINT `ExtColor_car_id_fkey` FOREIGN KEY (`car_id`) REFERENCES `Car`(`car_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IntExtColor` ADD CONSTRAINT `IntExtColor_int_color_id_fkey` FOREIGN KEY (`int_color_id`) REFERENCES `IntColor`(`int_color_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IntExtColor` ADD CONSTRAINT `IntExtColor_ext_color_id_fkey` FOREIGN KEY (`ext_color_id`) REFERENCES `ExtColor`(`ext_color_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TrimIntColor` ADD CONSTRAINT `TrimIntColor_trim_id_fkey` FOREIGN KEY (`trim_id`) REFERENCES `Trim`(`trim_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TrimIntColor` ADD CONSTRAINT `TrimIntColor_int_color_id_fkey` FOREIGN KEY (`int_color_id`) REFERENCES `IntColor`(`int_color_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Option` ADD CONSTRAINT `Option_option_type_id_fkey` FOREIGN KEY (`option_type_id`) REFERENCES `OptionType`(`option_type_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarModelOption` ADD CONSTRAINT `CarModelOption_model_id_fkey` FOREIGN KEY (`model_id`) REFERENCES `CarModel`(`model_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarModelOption` ADD CONSTRAINT `CarModelOption_option_id_fkey` FOREIGN KEY (`option_id`) REFERENCES `Option`(`option_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IntColorOption` ADD CONSTRAINT `IntColorOption_int_color_id_fkey` FOREIGN KEY (`int_color_id`) REFERENCES `IntColor`(`int_color_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IntColorOption` ADD CONSTRAINT `IntColorOption_option_id_fkey` FOREIGN KEY (`option_id`) REFERENCES `Option`(`option_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivateOption` ADD CONSTRAINT `ActivateOption_trim_id_fkey` FOREIGN KEY (`trim_id`) REFERENCES `Trim`(`trim_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivateOption` ADD CONSTRAINT `ActivateOption_option_id_fkey` FOREIGN KEY (`option_id`) REFERENCES `Option`(`option_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivateOption` ADD CONSTRAINT `ActivateOption_activate_option_id_fkey` FOREIGN KEY (`activate_option_id`) REFERENCES `Option`(`option_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DeactivateOption` ADD CONSTRAINT `DeactivateOption_option_id_fkey` FOREIGN KEY (`option_id`) REFERENCES `Option`(`option_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DeactivateOption` ADD CONSTRAINT `DeactivateOption_deactivate_option_id_fkey` FOREIGN KEY (`deactivate_option_id`) REFERENCES `Option`(`option_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DeleteOption` ADD CONSTRAINT `DeleteOption_option_id_fkey` FOREIGN KEY (`option_id`) REFERENCES `Option`(`option_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DeleteOption` ADD CONSTRAINT `DeleteOption_delete_option_id_fkey` FOREIGN KEY (`delete_option_id`) REFERENCES `Option`(`option_id`) ON DELETE CASCADE ON UPDATE CASCADE;
