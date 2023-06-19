-- CreateTable
CREATE TABLE `CarBody` (
    `car_body_code` VARCHAR(10) NOT NULL,
    `car_body_name` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `CarBody_car_body_name_key`(`car_body_name`),
    PRIMARY KEY (`car_body_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarType` (
    `car_type_code` VARCHAR(10) NOT NULL,
    `car_type_name` VARCHAR(10) NOT NULL,
    `car_body_code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `CarType_car_type_name_key`(`car_type_name`),
    PRIMARY KEY (`car_type_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarEngine` (
    `car_engine_code` VARCHAR(10) NOT NULL,
    `car_engine_name` VARCHAR(20) NOT NULL,
    `car_type_code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `CarEngine_car_engine_name_key`(`car_engine_name`),
    PRIMARY KEY (`car_engine_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarMission` (
    `car_mission_code` VARCHAR(10) NOT NULL,
    `car_mission_name` VARCHAR(20) NOT NULL,
    `car_type_code` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`car_mission_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarDrive` (
    `car_drive_code` VARCHAR(10) NOT NULL,
    `car_drive_name` VARCHAR(20) NOT NULL,
    `car_type_code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `CarDrive_car_drive_name_key`(`car_drive_name`),
    PRIMARY KEY (`car_drive_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarTrim` (
    `car_trim_code` VARCHAR(10) NOT NULL,
    `car_trim_name` VARCHAR(20) NOT NULL,
    `car_type_code` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`car_trim_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarModel` (
    `car_model_code` VARCHAR(10) NOT NULL,
    `car_model_name` VARCHAR(100) NOT NULL,
    `car_model_price` INTEGER NOT NULL,
    `car_engine_code` VARCHAR(10) NOT NULL,
    `car_mission_code` VARCHAR(10) NOT NULL,
    `car_drive_code` VARCHAR(10) NOT NULL,
    `car_trim_code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `CarModel_car_model_name_key`(`car_model_name`),
    PRIMARY KEY (`car_model_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CarType` ADD CONSTRAINT `CarType_car_body_code_fkey` FOREIGN KEY (`car_body_code`) REFERENCES `CarBody`(`car_body_code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarEngine` ADD CONSTRAINT `CarEngine_car_type_code_fkey` FOREIGN KEY (`car_type_code`) REFERENCES `CarType`(`car_type_code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarMission` ADD CONSTRAINT `CarMission_car_type_code_fkey` FOREIGN KEY (`car_type_code`) REFERENCES `CarType`(`car_type_code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarDrive` ADD CONSTRAINT `CarDrive_car_type_code_fkey` FOREIGN KEY (`car_type_code`) REFERENCES `CarType`(`car_type_code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarTrim` ADD CONSTRAINT `CarTrim_car_type_code_fkey` FOREIGN KEY (`car_type_code`) REFERENCES `CarType`(`car_type_code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarModel` ADD CONSTRAINT `CarModel_car_engine_code_fkey` FOREIGN KEY (`car_engine_code`) REFERENCES `CarEngine`(`car_engine_code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarModel` ADD CONSTRAINT `CarModel_car_mission_code_fkey` FOREIGN KEY (`car_mission_code`) REFERENCES `CarMission`(`car_mission_code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarModel` ADD CONSTRAINT `CarModel_car_drive_code_fkey` FOREIGN KEY (`car_drive_code`) REFERENCES `CarDrive`(`car_drive_code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarModel` ADD CONSTRAINT `CarModel_car_trim_code_fkey` FOREIGN KEY (`car_trim_code`) REFERENCES `CarTrim`(`car_trim_code`) ON DELETE CASCADE ON UPDATE CASCADE;
