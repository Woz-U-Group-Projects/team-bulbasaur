-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: digichat
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `PostId` int NOT NULL AUTO_INCREMENT,
  `UserId` int NOT NULL,
  `PostHead` varchar(200) COLLATE utf8mb4_0900_as_ci NOT NULL,
  `PostBody` varchar(500) COLLATE utf8mb4_0900_as_ci NOT NULL,
  `Likes` int(10) unsigned zerofill NOT NULL,
  `Dislikes` int(10) unsigned zerofill NOT NULL,
  `Visible` tinyint(3) unsigned zerofill NOT NULL,
  `LastUpdated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userUserId` int DEFAULT NULL,
  PRIMARY KEY (`PostId`),
  UNIQUE KEY `PostId_UNIQUE` (`PostId`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,10,'Hello','Test',0000000001,0000000001,000,'2021-05-29 15:22:56',NULL),(4,12,'Hello From User Two','Test By User Two',0000000000,0000000000,000,'2021-05-28 12:43:24',NULL),(5,12,'Hello From User Two','Second Test By User Two',0000000000,0000000000,000,'2021-05-28 12:43:36',NULL),(6,12,'Hello From User Two','Third Test By User Two',0000000000,0000000000,001,'2021-05-28 14:52:10',NULL),(8,14,'Hello From User Three','Test By User Three',0000000000,0000000000,000,'2021-05-28 12:54:44',NULL),(9,14,'Hello From User Three','Second Test By User Three',0000000000,0000000000,001,'2021-05-28 14:52:10',NULL),(11,14,'Hello From User Three','Forth Test By User Three',0000000000,0000000000,000,'2021-05-28 12:54:44',NULL),(12,14,'Hello From User Three','Fifth Test By User Three',0000000000,0000000000,001,'2021-05-28 14:52:10',NULL),(14,14,'Hello From User Three','Seventh Test By User Three',0000000000,0000000000,001,'2021-05-28 14:52:10',NULL);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-29 23:29:37
