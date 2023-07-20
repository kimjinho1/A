-- MySQL dump 10.13  Distrib 8.0.33, for macos12.6 (arm64)
--
-- Host: localhost    Database: MYCAR
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ActivateOption`
--

DROP TABLE IF EXISTS `ActivateOption`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ActivateOption` (
  `trim_id` int NOT NULL,
  `option_id` int NOT NULL,
  `activate_option_id` int NOT NULL,
  PRIMARY KEY (`trim_id`,`option_id`,`activate_option_id`),
  KEY `ActivateOption_option_id_fkey` (`option_id`),
  KEY `ActivateOption_activate_option_id_fkey` (`activate_option_id`),
  CONSTRAINT `ActivateOption_activate_option_id_fkey` FOREIGN KEY (`activate_option_id`) REFERENCES `Option` (`option_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ActivateOption_option_id_fkey` FOREIGN KEY (`option_id`) REFERENCES `Option` (`option_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ActivateOption_trim_id_fkey` FOREIGN KEY (`trim_id`) REFERENCES `Trim` (`trim_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ActivateOption`
--

LOCK TABLES `ActivateOption` WRITE;
/*!40000 ALTER TABLE `ActivateOption` DISABLE KEYS */;
INSERT INTO `ActivateOption` VALUES (1,1,2),(2,19,41),(2,19,42),(2,20,34),(3,25,41),(3,25,42),(3,26,34),(4,30,34),(4,31,40);
/*!40000 ALTER TABLE `ActivateOption` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Car`
--

DROP TABLE IF EXISTS `Car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Car` (
  `car_id` int NOT NULL AUTO_INCREMENT,
  `car_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `car_name` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `car_image_path` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `car_type_id` int NOT NULL,
  PRIMARY KEY (`car_id`),
  UNIQUE KEY `Car_car_code_key` (`car_code`),
  UNIQUE KEY `Car_car_name_key` (`car_name`),
  UNIQUE KEY `Car_car_image_path_key` (`car_image_path`),
  KEY `Car_car_type_id_fkey` (`car_type_id`),
  CONSTRAINT `Car_car_type_id_fkey` FOREIGN KEY (`car_type_id`) REFERENCES `CarType` (`car_type_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Car`
--

LOCK TABLES `Car` WRITE;
/*!40000 ALTER TABLE `Car` DISABLE KEYS */;
INSERT INTO `Car` VALUES (1,'CN12','더 뉴 아반떼','/images/car/CN12.png',1),(2,'NX05','투싼','/images/car/NX05.png',2);
/*!40000 ALTER TABLE `Car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CarDrive`
--

DROP TABLE IF EXISTS `CarDrive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CarDrive` (
  `car_id` int NOT NULL,
  `drive_id` int NOT NULL,
  PRIMARY KEY (`car_id`,`drive_id`),
  KEY `CarDrive_drive_id_fkey` (`drive_id`),
  CONSTRAINT `CarDrive_car_id_fkey` FOREIGN KEY (`car_id`) REFERENCES `Car` (`car_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `CarDrive_drive_id_fkey` FOREIGN KEY (`drive_id`) REFERENCES `Drive` (`drive_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CarDrive`
--

LOCK TABLES `CarDrive` WRITE;
/*!40000 ALTER TABLE `CarDrive` DISABLE KEYS */;
INSERT INTO `CarDrive` VALUES (2,1),(2,2);
/*!40000 ALTER TABLE `CarDrive` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CarEngine`
--

DROP TABLE IF EXISTS `CarEngine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CarEngine` (
  `car_id` int NOT NULL,
  `engine_id` int NOT NULL,
  PRIMARY KEY (`car_id`,`engine_id`),
  KEY `CarEngine_engine_id_fkey` (`engine_id`),
  CONSTRAINT `CarEngine_car_id_fkey` FOREIGN KEY (`car_id`) REFERENCES `Car` (`car_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `CarEngine_engine_id_fkey` FOREIGN KEY (`engine_id`) REFERENCES `Engine` (`engine_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CarEngine`
--

LOCK TABLES `CarEngine` WRITE;
/*!40000 ALTER TABLE `CarEngine` DISABLE KEYS */;
INSERT INTO `CarEngine` VALUES (1,1),(1,2),(2,3),(2,4);
/*!40000 ALTER TABLE `CarEngine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CarMission`
--

DROP TABLE IF EXISTS `CarMission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CarMission` (
  `car_id` int NOT NULL,
  `mission_id` int NOT NULL,
  PRIMARY KEY (`car_id`,`mission_id`),
  KEY `CarMission_mission_id_fkey` (`mission_id`),
  CONSTRAINT `CarMission_car_id_fkey` FOREIGN KEY (`car_id`) REFERENCES `Car` (`car_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `CarMission_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `Mission` (`mission_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CarMission`
--

LOCK TABLES `CarMission` WRITE;
/*!40000 ALTER TABLE `CarMission` DISABLE KEYS */;
INSERT INTO `CarMission` VALUES (1,1),(2,2),(2,3);
/*!40000 ALTER TABLE `CarMission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CarModel`
--

DROP TABLE IF EXISTS `CarModel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CarModel` (
  `model_id` int NOT NULL AUTO_INCREMENT,
  `model_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_price` int NOT NULL,
  `model_image_path` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `car_id` int NOT NULL,
  `engine_id` int NOT NULL,
  `mission_id` int NOT NULL,
  `drive_id` int DEFAULT NULL,
  `trim_id` int NOT NULL,
  PRIMARY KEY (`model_id`),
  UNIQUE KEY `CarModel_model_code_key` (`model_code`),
  UNIQUE KEY `CarModel_model_name_key` (`model_name`),
  KEY `CarModel_car_id_fkey` (`car_id`),
  KEY `CarModel_engine_id_fkey` (`engine_id`),
  KEY `CarModel_mission_id_fkey` (`mission_id`),
  KEY `CarModel_drive_id_fkey` (`drive_id`),
  KEY `CarModel_trim_id_fkey` (`trim_id`),
  CONSTRAINT `CarModel_car_id_fkey` FOREIGN KEY (`car_id`) REFERENCES `Car` (`car_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `CarModel_drive_id_fkey` FOREIGN KEY (`drive_id`) REFERENCES `Drive` (`drive_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `CarModel_engine_id_fkey` FOREIGN KEY (`engine_id`) REFERENCES `Engine` (`engine_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `CarModel_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `Mission` (`mission_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `CarModel_trim_id_fkey` FOREIGN KEY (`trim_id`) REFERENCES `Trim` (`trim_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CarModel`
--

LOCK TABLES `CarModel` WRITE;
/*!40000 ALTER TABLE `CarModel` DISABLE KEYS */;
INSERT INTO `CarModel` VALUES (1,'CNJS4RBT3','더 뉴 아반떼 가솔린 1.6 Smart A/T',19750000,'/images/model/CN12-smart.png',1,1,1,NULL,1),(2,'CNJS4RDT3','더 뉴 아반떼 가솔린 1.6 Modern A/T',22730000,'/images/model/CN12-modern.png',1,1,1,NULL,2),(3,'CNJS4RGT3','더 뉴 아반떼 가솔린 1.6 Inspiration A/T',26910000,'/images/model/CN12-inspiration.png',1,1,1,NULL,4),(4,'CNJS4LBT3','더 뉴 아반떼 LPG 1.6 Smart A/T',21150000,'/images/model/CN12-smart.png',1,2,1,NULL,1),(5,'CNJS4LDT3','더 뉴 아반떼 LPG 1.6 Modern A/T',24120000,'/images/model/CN12-modern.png',1,2,1,NULL,2),(6,'CNJS4LGT3','더 뉴 아반떼 LPG 1.6 Inspiration A/T',28180000,'/images/model/CN12-inspiration.png',1,2,1,NULL,4),(7,'NXJJ5DDT2','투싼 디젤 Modern 2WD A/T',28190000,'/images/model/NX05-modern.png',2,3,2,1,2),(8,'NXJJ5DCT2','투싼 디젤 Premium 2WD A/T',31100000,'/images/model/NX05-premium.png',2,3,2,1,3),(9,'NXJJ5DPT2','투싼 디젤 Inspiration 2WD A/T',34780000,'/images/model/NX05-inspiration.png',2,3,2,1,4),(10,'NXJJ5DDA2','투싼 디젤 Modern 4WD A/T',30420000,'/images/model/NX05-modern.png',2,3,2,2,2),(11,'NXJJ5DCA2','투싼 디젤 Premium 4WD A/T',33330000,'/images/model/NX05-premium.png',2,3,2,2,3),(12,'NXJJ5DPA2','투싼 디젤 Inspiration 4WD A/T',37010000,'/images/model/NX05-inspiration.png',2,3,2,2,4),(13,'NXJJ5TDD2','투싼 1.6 가솔린 터보 Modern 2WD DCT',26030000,'/images/model/NX05-modern.png',2,4,3,1,2),(14,'NXJJ5TCD2','투싼 1.6 가솔린 터보 Premium 2WD DCT',28940000,'/images/model/NX05-premium.png',2,4,3,1,3),(15,'NXJJ5TPD2','투싼 1.6 가솔린 터보 Inspiration 2WD DCT',32620000,'/images/model/NX05-inspiration.png',2,4,3,1,4),(16,'NXJJ5TDH2','투싼 1.6 가솔린 터보 Modern 4WD DCT',28010000,'/images/model/NX05-modern.png',2,4,3,2,2),(17,'NXJJ5TCH2','투싼 1.6 가솔린 터보 Premium 4WD DCT',30920000,'/images/model/NX05-premium.png',2,4,3,2,3),(18,'NXJJ5TPH2','투싼 1.6 가솔린 터보 Inspiration 4WD DCT',34600000,'/images/model/NX05-inspiration.png',2,4,3,2,4);
/*!40000 ALTER TABLE `CarModel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CarModelOption`
--

DROP TABLE IF EXISTS `CarModelOption`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CarModelOption` (
  `model_id` int NOT NULL,
  `option_id` int NOT NULL,
  PRIMARY KEY (`model_id`,`option_id`),
  KEY `CarModelOption_option_id_fkey` (`option_id`),
  CONSTRAINT `CarModelOption_model_id_fkey` FOREIGN KEY (`model_id`) REFERENCES `CarModel` (`model_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `CarModelOption_option_id_fkey` FOREIGN KEY (`option_id`) REFERENCES `Option` (`option_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CarModelOption`
--

LOCK TABLES `CarModelOption` WRITE;
/*!40000 ALTER TABLE `CarModelOption` DISABLE KEYS */;
INSERT INTO `CarModelOption` VALUES (1,1),(4,1),(1,2),(4,2),(1,3),(2,3),(4,3),(5,3),(1,4),(4,4),(1,5),(4,5),(2,6),(5,6),(2,7),(5,7),(2,8),(3,8),(5,8),(6,8),(2,9),(5,9),(2,10),(5,11),(2,12),(3,12),(5,12),(6,12),(3,13),(2,14),(3,14),(5,14),(6,14),(7,15),(10,15),(13,15),(16,15),(7,16),(10,16),(13,16),(16,16),(7,17),(8,17),(10,17),(11,17),(13,17),(14,17),(16,17),(17,17),(7,18),(10,18),(13,18),(16,18),(7,19),(10,19),(13,19),(16,19),(7,20),(10,20),(13,20),(16,20),(7,21),(10,21),(13,21),(16,21),(7,22),(10,22),(13,22),(16,22),(8,23),(11,23),(14,23),(17,23),(8,24),(9,24),(11,24),(12,24),(14,24),(15,24),(17,24),(18,24),(8,25),(11,25),(14,25),(17,25),(8,26),(11,26),(14,26),(17,26),(8,27),(11,27),(14,27),(17,27),(14,28),(17,28),(8,29),(11,29),(9,30),(12,30),(15,30),(18,30),(9,31),(12,31),(15,31),(18,31),(15,32),(18,32),(9,33),(12,33),(7,34),(8,34),(9,34),(10,34),(11,34),(12,34),(13,34),(14,34),(15,34),(16,34),(17,34),(18,34),(7,35),(8,35),(9,35),(10,35),(11,35),(12,35),(13,35),(14,35),(15,35),(16,35),(17,35),(18,35),(8,36),(9,36),(11,36),(12,36),(14,36),(15,36),(17,36),(18,36),(7,37),(8,37),(9,37),(10,37),(11,37),(12,37),(13,37),(14,37),(15,37),(16,37),(17,37),(18,37),(7,38),(8,38),(9,38),(10,38),(11,38),(12,38),(13,38),(14,38),(15,38),(16,38),(17,38),(18,38),(7,39),(8,39),(9,39),(10,39),(11,39),(12,39),(13,39),(14,39),(15,39),(16,39),(17,39),(18,39),(9,40),(12,40),(15,40),(18,40),(7,41),(8,41),(9,41),(10,41),(11,41),(12,41),(13,41),(14,41),(15,41),(16,41),(17,41),(18,41),(7,42),(8,42),(9,42),(10,42),(11,42),(12,42),(13,42),(14,42),(15,42),(16,42),(17,42),(18,42);
/*!40000 ALTER TABLE `CarModelOption` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CarTrim`
--

DROP TABLE IF EXISTS `CarTrim`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CarTrim` (
  `car_id` int NOT NULL,
  `trim_id` int NOT NULL,
  PRIMARY KEY (`car_id`,`trim_id`),
  KEY `CarTrim_trim_id_fkey` (`trim_id`),
  CONSTRAINT `CarTrim_car_id_fkey` FOREIGN KEY (`car_id`) REFERENCES `Car` (`car_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `CarTrim_trim_id_fkey` FOREIGN KEY (`trim_id`) REFERENCES `Trim` (`trim_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CarTrim`
--

LOCK TABLES `CarTrim` WRITE;
/*!40000 ALTER TABLE `CarTrim` DISABLE KEYS */;
INSERT INTO `CarTrim` VALUES (1,1),(1,2),(2,2),(2,3),(1,4),(2,4);
/*!40000 ALTER TABLE `CarTrim` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CarType`
--

DROP TABLE IF EXISTS `CarType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CarType` (
  `car_type_id` int NOT NULL AUTO_INCREMENT,
  `car_type_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `car_type_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`car_type_id`),
  UNIQUE KEY `CarType_car_type_code_key` (`car_type_code`),
  UNIQUE KEY `CarType_car_type_name_key` (`car_type_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CarType`
--

LOCK TABLES `CarType` WRITE;
/*!40000 ALTER TABLE `CarType` DISABLE KEYS */;
INSERT INTO `CarType` VALUES (1,'S','승용'),(2,'J','SUV');
/*!40000 ALTER TABLE `CarType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DeactivateOption`
--

DROP TABLE IF EXISTS `DeactivateOption`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DeactivateOption` (
  `option_id` int NOT NULL,
  `deactivate_option_id` int NOT NULL,
  PRIMARY KEY (`option_id`,`deactivate_option_id`),
  KEY `DeactivateOption_deactivate_option_id_fkey` (`deactivate_option_id`),
  CONSTRAINT `DeactivateOption_deactivate_option_id_fkey` FOREIGN KEY (`deactivate_option_id`) REFERENCES `Option` (`option_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `DeactivateOption_option_id_fkey` FOREIGN KEY (`option_id`) REFERENCES `Option` (`option_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DeactivateOption`
--

LOCK TABLES `DeactivateOption` WRITE;
/*!40000 ALTER TABLE `DeactivateOption` DISABLE KEYS */;
INSERT INTO `DeactivateOption` VALUES (21,15),(19,18),(18,19),(15,21),(42,41),(41,42);
/*!40000 ALTER TABLE `DeactivateOption` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DeleteOption`
--

DROP TABLE IF EXISTS `DeleteOption`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DeleteOption` (
  `option_id` int NOT NULL,
  `delete_option_id` int NOT NULL,
  PRIMARY KEY (`option_id`,`delete_option_id`),
  KEY `DeleteOption_delete_option_id_fkey` (`delete_option_id`),
  CONSTRAINT `DeleteOption_delete_option_id_fkey` FOREIGN KEY (`delete_option_id`) REFERENCES `Option` (`option_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `DeleteOption_option_id_fkey` FOREIGN KEY (`option_id`) REFERENCES `Option` (`option_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DeleteOption`
--

LOCK TABLES `DeleteOption` WRITE;
/*!40000 ALTER TABLE `DeleteOption` DISABLE KEYS */;
INSERT INTO `DeleteOption` VALUES (31,37),(31,41),(31,42);
/*!40000 ALTER TABLE `DeleteOption` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Drive`
--

DROP TABLE IF EXISTS `Drive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Drive` (
  `drive_id` int NOT NULL AUTO_INCREMENT,
  `drive_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `drive_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`drive_id`),
  UNIQUE KEY `Drive_drive_code_key` (`drive_code`),
  UNIQUE KEY `Drive_drive_name_key` (`drive_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Drive`
--

LOCK TABLES `Drive` WRITE;
/*!40000 ALTER TABLE `Drive` DISABLE KEYS */;
INSERT INTO `Drive` VALUES (1,'D,T','2WD'),(2,'A,H','4WD');
/*!40000 ALTER TABLE `Drive` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Engine`
--

DROP TABLE IF EXISTS `Engine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Engine` (
  `engine_id` int NOT NULL AUTO_INCREMENT,
  `engine_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `engine_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`engine_id`),
  UNIQUE KEY `Engine_engine_code_key` (`engine_code`),
  UNIQUE KEY `Engine_engine_name_key` (`engine_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Engine`
--

LOCK TABLES `Engine` WRITE;
/*!40000 ALTER TABLE `Engine` DISABLE KEYS */;
INSERT INTO `Engine` VALUES (1,'R','가솔린 1.6'),(2,'L','LPG 1.6'),(3,'D','디젤'),(4,'T','1.6 가솔린 터보');
/*!40000 ALTER TABLE `Engine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ExtColor`
--

DROP TABLE IF EXISTS `ExtColor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ExtColor` (
  `ext_color_id` int NOT NULL AUTO_INCREMENT,
  `ext_color_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ext_color_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ext_color_image_path` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `car_id` int NOT NULL,
  PRIMARY KEY (`ext_color_id`),
  KEY `ExtColor_car_id_fkey` (`car_id`),
  CONSTRAINT `ExtColor_car_id_fkey` FOREIGN KEY (`car_id`) REFERENCES `Car` (`car_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ExtColor`
--

LOCK TABLES `ExtColor` WRITE;
/*!40000 ALTER TABLE `ExtColor` DISABLE KEYS */;
INSERT INTO `ExtColor` VALUES (1,'A5G','아마존 그레이 메탈릭','/images/exterior-color/A5G.png',1),(2,'PE2','에코트로닉 그레이펄','/images/exterior-color/PE2.png',1),(3,'M6T','플루이드 그레이 메탈릭','/images/exterior-color/M6T.png',1),(4,'PM2','메타블루펄','/images/exterior-color/PM2.png',1),(5,'YP5','인텐스 블루 펄','/images/exterior-color/YP5.png',1),(6,'SAW','아틀라스 화이트','/images/exterior-color/SAW.png',1),(7,'R2P','얼티메이트 레드 메탈릭','/images/exterior-color/R2P.png',1),(8,'A2B','어비스블랙펄','/images/exterior-color/A2B.png',1),(9,'C5G','사이버 그레이 메탈릭','/images/exterior-color/C5G.png',1),(10,'B6S','실키 브론즈 메탈릭','/images/exterior-color/B6S.png',2),(11,'R2T','쉬머링 실버 메탈릭','/images/exterior-color/R2T.png',2),(12,'TW3','크리미 화이트 펄','/images/exterior-color/TW3.png',2),(13,'A5G','아마존 그레이 메탈릭','/images/exterior-color/A5G.png',2),(14,'R4G','티탄 그레이 메탈릭','/images/exterior-color/R4G.png',2),(15,'PS8','오션 인디고 펄','/images/exterior-color/PS8.png',2),(16,'TCM','팬텀 블랙 펄','/images/exterior-color/TCM.png',2),(17,'Y3G','티타늄 그레이 매트','/images/exterior-color/Y3G.png',2);
/*!40000 ALTER TABLE `ExtColor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `IntColor`
--

DROP TABLE IF EXISTS `IntColor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `IntColor` (
  `int_color_id` int NOT NULL AUTO_INCREMENT,
  `int_color_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `int_color_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `int_color_image_path` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `car_id` int NOT NULL,
  PRIMARY KEY (`int_color_id`),
  KEY `IntColor_car_id_fkey` (`car_id`),
  CONSTRAINT `IntColor_car_id_fkey` FOREIGN KEY (`car_id`) REFERENCES `Car` (`car_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `IntColor`
--

LOCK TABLES `IntColor` WRITE;
/*!40000 ALTER TABLE `IntColor` DISABLE KEYS */;
INSERT INTO `IntColor` VALUES (1,'NNB','블랙모노톤','/images/interior-color/NNB.png',1),(2,'SSS','세이지그린','/images/interior-color/SSS.png',1),(3,'VHC','캐쉬미어 베이지','/images/interior-color/VHC.png',1),(4,'I34','블랙모노톤','/images/interior-color/I34.png',2),(5,'I35','블랙 모노톤(가죽 시트)','/images/interior-color/I35.png',2),(6,'I36','블랙/그레이 투톤(그레이 가죽시트)','/images/interior-color/I36.png',2),(7,'I37','네이비 원톤(인디고 모노톤)','/images/interior-color/I37.png',2),(8,'I38','블랙모노톤(레드스티치)','/images/interior-color/I38.png',2),(9,'PRF','블랙 / 브라운 투톤(브라운 가죽시트)','/images/interior-color/PRF.png',2);
/*!40000 ALTER TABLE `IntColor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `IntColorOption`
--

DROP TABLE IF EXISTS `IntColorOption`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `IntColorOption` (
  `int_color_id` int NOT NULL,
  `option_id` int NOT NULL,
  PRIMARY KEY (`int_color_id`,`option_id`),
  KEY `IntColorOption_option_id_fkey` (`option_id`),
  CONSTRAINT `IntColorOption_int_color_id_fkey` FOREIGN KEY (`int_color_id`) REFERENCES `IntColor` (`int_color_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `IntColorOption_option_id_fkey` FOREIGN KEY (`option_id`) REFERENCES `Option` (`option_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `IntColorOption`
--

LOCK TABLES `IntColorOption` WRITE;
/*!40000 ALTER TABLE `IntColorOption` DISABLE KEYS */;
INSERT INTO `IntColorOption` VALUES (2,14),(5,27),(6,27);
/*!40000 ALTER TABLE `IntColorOption` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `IntExtColor`
--

DROP TABLE IF EXISTS `IntExtColor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `IntExtColor` (
  `int_color_id` int NOT NULL,
  `ext_color_id` int NOT NULL,
  PRIMARY KEY (`int_color_id`,`ext_color_id`),
  KEY `IntExtColor_ext_color_id_fkey` (`ext_color_id`),
  CONSTRAINT `IntExtColor_ext_color_id_fkey` FOREIGN KEY (`ext_color_id`) REFERENCES `ExtColor` (`ext_color_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `IntExtColor_int_color_id_fkey` FOREIGN KEY (`int_color_id`) REFERENCES `IntColor` (`int_color_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `IntExtColor`
--

LOCK TABLES `IntExtColor` WRITE;
/*!40000 ALTER TABLE `IntExtColor` DISABLE KEYS */;
INSERT INTO `IntExtColor` VALUES (1,1),(2,1),(3,1),(1,2),(2,2),(3,2),(1,3),(2,3),(3,3),(1,4),(3,4),(1,5),(3,5),(1,6),(2,6),(3,6),(1,7),(1,8),(2,8),(3,8),(1,9),(2,9),(3,9),(4,10),(5,10),(6,10),(9,10),(4,11),(5,11),(6,11),(7,11),(9,11),(4,12),(5,12),(6,12),(7,12),(9,12),(4,13),(5,13),(6,13),(9,13),(4,14),(5,14),(6,14),(7,14),(9,14),(4,15),(5,15),(6,15),(7,15),(4,16),(5,16),(6,16),(7,16),(9,16);
/*!40000 ALTER TABLE `IntExtColor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Mission`
--

DROP TABLE IF EXISTS `Mission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Mission` (
  `mission_id` int NOT NULL AUTO_INCREMENT,
  `mission_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mission_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`mission_id`),
  UNIQUE KEY `Mission_mission_code_key` (`mission_code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Mission`
--

LOCK TABLES `Mission` WRITE;
/*!40000 ALTER TABLE `Mission` DISABLE KEYS */;
INSERT INTO `Mission` VALUES (1,'T','A/T'),(2,'A,T','A/T'),(3,'D,H','DCT');
/*!40000 ALTER TABLE `Mission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Option`
--

DROP TABLE IF EXISTS `Option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Option` (
  `option_id` int NOT NULL AUTO_INCREMENT,
  `option_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `option_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `option_price` int NOT NULL,
  `option_image_path` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `option_type_id` int NOT NULL,
  PRIMARY KEY (`option_id`),
  UNIQUE KEY `Option_option_code_key` (`option_code`),
  KEY `Option_option_type_id_fkey` (`option_type_id`),
  CONSTRAINT `Option_option_type_id_fkey` FOREIGN KEY (`option_type_id`) REFERENCES `OptionType` (`option_type_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Option`
--

LOCK TABLES `Option` WRITE;
/*!40000 ALTER TABLE `Option` DISABLE KEYS */;
INSERT INTO `Option` VALUES (1,'CV1','컨비니언스 Ⅰ',690000,'/images/option/CV1.png',1),(2,'IFN','인포테인먼트 내비',790000,'/images/option/IFN.png',1),(3,'HER','하이패스+ECM 룸미러',250000,'/images/option/HER.png',1),(4,'HS3','현대 스마트센스 Ⅲ',690000,'/images/option/HS3.png',1),(5,'AT1','17인치 알로이 휠 & 타이어 Ⅰ',490000,'/images/option/AT1.png',1),(6,'HS1','현대 스마트센스 Ⅰ',940000,'/images/option/HS1.png',1),(7,'EXD','익스테리어 디자인',450000,'/images/option/EXD.png',1),(8,'SRF','선루프',450000,'/images/option/SRF.png',1),(9,'PAP','파킹 어시스트 플러스',1290000,'/images/option/PAP.png',1),(10,'CM1','컴포트 Ⅰ',1140000,'/images/option/CM1.png',1),(11,'CM2','컴포트 Ⅱ',990000,'/images/option/CM2.png',1),(12,'AT2','17인치 알로이 휠 & 타이어 Ⅱ',300000,'/images/option/AT2.png',1),(13,'BIC','빌트인 캠(보조배터리 포함)',690000,'/images/option/BIC.png',1),(14,'SGI','세이지 그린 인테리어 컬러',150000,'/images/option/SGI.png',1),(15,'MN1','멀티미디어 내비 Ⅰ',1290000,'/images/option/MN1.png',1),(16,'CON','컨비니언스',540000,'/images/option/CON.png',1),(17,'HSS','현대 스마트센스',890000,'/images/option/HSS.png',1),(18,'EX1','익스테리어 Ⅰ',690000,'/images/option/EX1.png',1),(19,'E1P','익스테리어 Ⅰ 플러스',940000,'/images/option/E1P.png',1),(20,'PRL','파노라마 선루프 + 루프랙 + LED 실내등(맵램프,룸램프)',1240000,'/images/option/PRL.png',1),(21,'HEC','하이패스+ ECM 룸미러',250000,'/images/option/HEC.png',1),(22,'ID1','인테리어디자인 Ⅰ',250000,'/images/option/X.png',1),(23,'COM','컴포트',1140000,'/images/option/COM.png',1),(24,'BIC2','빌트인 캠(보조배터리 포함)',640000,'/images/option/BIC2.png',1),(25,'EX2','익스테리어 Ⅱ',690000,'/images/option/EX2.png',1),(26,'PSL','파노라마 선루프 + LED 실내등(맵램프,룸램프)',1140000,'/images/option/PSL.png',1),(27,'ID2','인테리어디자인 Ⅱ',590000,'/images/option/X.png',1),(28,'PL1','플래티넘 Ⅰ',2230000,'/images/option/PL1.png',1),(29,'PL2','플래티넘 Ⅱ',2520000,'/images/option/PL2.png',1),(30,'PSF','파노라마 선루프',1090000,'/images/option/PSF.png',1),(31,'AVP','어드벤처패키지',790000,'/images/option/X.png',1),(32,'PL3','플래티넘 Ⅲ',1480000,'/images/option/PL3.png',1),(33,'PL4','플래티넘 Ⅳ',1780000,'/images/option/PL4.png',1),(34,'NX0002','LED 라이팅 패키지 (선루프, 인스퍼레이션 전용)',320000,'/images/option/NX0002.png',2),(35,'NX0004','러기지 패키지',120000,'/images/option/NX0004.png',2),(36,'NX0003','빌트인 공기 청정기',400000,'/images/option/NX0003.png',2),(37,'NX0008','사이드스텝',340000,'/images/option/NX0008.png',2),(38,'NX0009','적외선 무릎 워머',300000,'/images/option/NX0009.png',2),(39,'NX0005','프로텍션 매트 패키지',230000,'/images/option/NX0005.png',2),(40,'NX3855','어드벤처 전용 사이드 스텝',340000,'/images/option/NX3855.png',2),(41,'NX3857','19인치 매트 블랙 경량휠',1140000,'/images/option/NX3857.png',3),(42,'NX3858','모노블록 브레이크+19인치 매트 블랙 경량휠 패키지',2230000,'/images/option/NX3858.png',3);
/*!40000 ALTER TABLE `Option` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OptionType`
--

DROP TABLE IF EXISTS `OptionType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OptionType` (
  `option_type_id` int NOT NULL AUTO_INCREMENT,
  `option_type_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`option_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OptionType`
--

LOCK TABLES `OptionType` WRITE;
/*!40000 ALTER TABLE `OptionType` DISABLE KEYS */;
INSERT INTO `OptionType` VALUES (1,'detail'),(2,'hga'),(3,'performance');
/*!40000 ALTER TABLE `OptionType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Trim`
--

DROP TABLE IF EXISTS `Trim`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Trim` (
  `trim_id` int NOT NULL AUTO_INCREMENT,
  `trim_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `trim_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`trim_id`),
  UNIQUE KEY `Trim_trim_code_key` (`trim_code`),
  UNIQUE KEY `Trim_trim_name_key` (`trim_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Trim`
--

LOCK TABLES `Trim` WRITE;
/*!40000 ALTER TABLE `Trim` DISABLE KEYS */;
INSERT INTO `Trim` VALUES (1,'B','Smart'),(2,'D','Modern'),(3,'C','Premium'),(4,'P','Inspiration');
/*!40000 ALTER TABLE `Trim` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TrimIntColor`
--

DROP TABLE IF EXISTS `TrimIntColor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TrimIntColor` (
  `trim_id` int NOT NULL,
  `int_color_id` int NOT NULL,
  PRIMARY KEY (`trim_id`,`int_color_id`),
  KEY `TrimIntColor_int_color_id_fkey` (`int_color_id`),
  CONSTRAINT `TrimIntColor_int_color_id_fkey` FOREIGN KEY (`int_color_id`) REFERENCES `IntColor` (`int_color_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `TrimIntColor_trim_id_fkey` FOREIGN KEY (`trim_id`) REFERENCES `Trim` (`trim_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TrimIntColor`
--

LOCK TABLES `TrimIntColor` WRITE;
/*!40000 ALTER TABLE `TrimIntColor` DISABLE KEYS */;
INSERT INTO `TrimIntColor` VALUES (1,1),(2,1),(4,1),(2,2),(4,2),(4,3),(2,4),(3,4),(3,5),(4,5),(3,6),(4,6),(4,7),(4,9);
/*!40000 ALTER TABLE `TrimIntColor` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-20 10:59:00
