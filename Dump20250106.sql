-- MySQL dump 10.13  Distrib 8.0.40, for Linux (x86_64)
--
-- Host: localhost    Database: teszt_app
-- ------------------------------------------------------
-- Server version	8.0.40-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `felhasznalok`
--

DROP TABLE IF EXISTS `felhasznalok`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `felhasznalok` (
  `emailCim` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL,
  `nev` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL,
  `jelszo` varchar(260) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `telSzam` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL,
  PRIMARY KEY (`emailCim`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `felhasznalok`
--

INSERT INTO `felhasznalok` (`emailCim`, `nev`, `jelszo`, `telSzam`) VALUES ('csilla@pelda.com','Szarka Csilla','jelszo','12345678912'),('geza@pelda.com','Diós Géza','$2y$10$I3LNXek1drMSMPMFrpIxU.P502CWUx48P7moJVjWcqhJf5gx23pKS','12345678912');

--
-- Table structure for table `hozzafer`
--

DROP TABLE IF EXISTS `hozzafer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hozzafer` (
  `szaknev` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL,
  `emailCim` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL,
  PRIMARY KEY (`szaknev`,`emailCim`),
  KEY `szaknev` (`szaknev`),
  KEY `emailCim` (`emailCim`),
  CONSTRAINT `hozzafer_ibfk_1` FOREIGN KEY (`szaknev`) REFERENCES `szak` (`szaknev`),
  CONSTRAINT `hozzafer_ibfk_2` FOREIGN KEY (`emailCim`) REFERENCES `felhasznalok` (`emailCim`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hozzafer`
--

INSERT INTO `hozzafer` (`szaknev`, `emailCim`) VALUES ('Mérnök BsC','geza@pelda.com');

--
-- Table structure for table `jogosultsag`
--

DROP TABLE IF EXISTS `jogosultsag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jogosultsag` (
  `jogosultsag` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL,
  PRIMARY KEY (`jogosultsag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jogosultsag`
--

INSERT INTO `jogosultsag` (`jogosultsag`) VALUES ('Admin'),('Oktató'),('Szakfelelős'),('Tanszékvezető'),('Tanulmányi iroda');

--
-- Table structure for table `mostani`
--

DROP TABLE IF EXISTS `mostani`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mostani` (
  `targykod` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL,
  `teremigeny` text COLLATE utf8mb4_hungarian_ci,
  `online` varchar(20) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `oktatoNap` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `oktatoLev` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `TImegjegyzes` text COLLATE utf8mb4_hungarian_ci,
  `oktatoMegjegyzes` text COLLATE utf8mb4_hungarian_ci,
  `tanev` varchar(20) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `utolsoBelepes` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`targykod`),
  KEY `targykod` (`targykod`),
  CONSTRAINT `mostani_ibfk_1` FOREIGN KEY (`targykod`) REFERENCES `tanterv` (`targykod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mostani`
--

INSERT INTO `mostani` (`targykod`, `teremigeny`, `online`, `oktatoNap`, `oktatoLev`, `TImegjegyzes`, `oktatoMegjegyzes`, `tanev`, `utolsoBelepes`) VALUES ('NKGTGAB144A',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKGTMIB222G',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKMIIN313IN',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKMIINB336PL',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKMIMAB244DI',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKMIMAB244FO',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKMIMAB246TV',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKMIMAB344LI',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKMIMIB10xT',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKMIMIB20xT',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKMISAB154RF',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKMISAB223RF',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKMISAB244DF',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKMISAB244OK',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKMISAB254MV',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKMISAB254ZF',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKMISAB256SF',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKMIVIB213KT',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKMIVIB213SF',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKMIVIB233FA',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKMIVIB234J',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKMIVIB244EV',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKMIVIB254MV',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKMIVIB256CF',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKMIVIB256SH',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKMIVIB343SP',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKMIVIB344ZV',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKMKLE1220A',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKMKLE12X0A',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKMKLE2220A',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKMKMAB544F',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL),('NKMKSP1100B/D',NULL,NULL,NULL,NULL,NULL,NULL,'2023/24/2',NULL);

--
-- Table structure for table `oktatja`
--

DROP TABLE IF EXISTS `oktatja`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oktatja` (
  `emailCim` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL,
  `targykod` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL,
  PRIMARY KEY (`emailCim`,`targykod`),
  KEY `emailCim` (`emailCim`),
  KEY `targykod` (`targykod`),
  CONSTRAINT `oktatja_ibfk_1` FOREIGN KEY (`emailCim`) REFERENCES `felhasznalok` (`emailCim`),
  CONSTRAINT `oktatja_ibfk_2` FOREIGN KEY (`targykod`) REFERENCES `mostani` (`targykod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oktatja`
--


--
-- Table structure for table `rendelkezik`
--

DROP TABLE IF EXISTS `rendelkezik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rendelkezik` (
  `emailCim` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL,
  `jogosultsag` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL,
  PRIMARY KEY (`emailCim`,`jogosultsag`),
  KEY `emailCim` (`emailCim`),
  KEY `jogosultsag` (`jogosultsag`),
  CONSTRAINT `rendelkezik_ibfk_1` FOREIGN KEY (`emailCim`) REFERENCES `felhasznalok` (`emailCim`),
  CONSTRAINT `rendelkezik_ibfk_2` FOREIGN KEY (`jogosultsag`) REFERENCES `jogosultsag` (`jogosultsag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rendelkezik`
--

INSERT INTO `rendelkezik` (`emailCim`, `jogosultsag`) VALUES ('csilla@pelda.com','Admin'),('geza@pelda.com','Szakfelelős');

--
-- Table structure for table `szak`
--

DROP TABLE IF EXISTS `szak`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `szak` (
  `szaknev` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `indul` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`szaknev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `szak`
--

INSERT INTO `szak` (`szaknev`, `indul`) VALUES ('Mérnök BsC',0),('Mérnökinformatikus felsőoktatási szakképzés',NULL),('Üzemmérnök informatikus BProf',NULL);

--
-- Table structure for table `tanterv`
--

DROP TABLE IF EXISTS `tanterv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tanterv` (
  `targykod` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL,
  `szervEgys` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL,
  `evszak` varchar(8) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `targynev` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL,
  `tipus` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `kredit` tinyint NOT NULL,
  `oraszamNap` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL,
  `oraszamLev` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL,
  `kovetelmeny` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL,
  `evfolyam` varchar(20) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `felev` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  PRIMARY KEY (`targykod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tanterv`
--

INSERT INTO `tanterv` (`targykod`, `szervEgys`, `evszak`, `targynev`, `tipus`, `kredit`, `oraszamNap`, `oraszamLev`, `kovetelmeny`, `evfolyam`, `felev`) VALUES ('NKGTGAB144A','AGI',NULL,'Vállalati gazdaságtan','Kötelező',6,'2+2+0','0','Kollokvium (K)',NULL,'4'),('NKGTMIB222G','AGI',NULL,'A probléma megoldás gyakorlata I.','Kötelezően választható',2,'0+2+0','0','Évközi jegy (É)',NULL,'4'),('NKMIIN313IN','AIT',NULL,'Iparjogvédelem és innovációmenedzsment','Kötelezően választható',3,'2+0+0','0','Folyamatos számonkérés (F)',NULL,'4,6'),('NKMIINB336PL','AIT',NULL,'Projekt labor','Kötelező',6,'20ó/félév','0','Évközi jegy (É)',NULL,'5'),('NKMIMAB244DI','AIT',NULL,'Diszkrét matematika','Kötelező',4,'2+1+0','0','Kollokvium (K)',NULL,'2'),('NKMIMAB244FO','AIT',NULL,'Operációkutatás','Kötelező',4,'1+2+0','0','Folyamatos számonkérés (F)',NULL,'6'),('NKMIMAB246TV','AIT',NULL,'Matematikai analízis II.','Kötelező',6,'2+2+0','0','Vizsga (V)',NULL,'2'),('NKMIMAB344LI','AIT',NULL,'Lineáris algebra','Kötelező',4,'2+1+0','0','Vizsga (V)',NULL,'2'),('NKMIMIB10xT','AIT',NULL,'Tervezés I.','Kötelező',5,'10ó/félév','0','Évközi jegy (É)',NULL,'6'),('NKMIMIB20xT','AIT',NULL,'Tervezés II.','Kötelező',10,'10ó/félév','0','Évközi jegy (É)',NULL,'7'),('NKMISAB154RF','AIT',NULL,'Rendszertesztelés','Kötelezően választható',4,'1+0+2','0','Folyamatos számonkérés (F)',NULL,'4,6'),('NKMISAB223RF','AIT',NULL,'A rendszerfejlesztés haladó módszerei','Kötelező',3,'0+2+0','0','Folyamatos számonkérés (F)',NULL,'4'),('NKMISAB244DF','AIT',NULL,'Adatstruktúrák és algoritmusok I.','Kötelező',4,'2+1+0','0','Folyamatos számonkérés (F)',NULL,'2'),('NKMISAB244OK','AIT',NULL,'Operációs rendszerek','Kötelező',4,'2+1+0','0','Kollokvium (K)',NULL,'4'),('NKMISAB254MV','AIT',NULL,'Mesterséges intelligencia alapjai','Kötelező',4,'2+0+1','0','Vizsga (V)',NULL,'4'),('NKMISAB254ZF','AIT',NULL,'Python programozás','Kötelező',4,'1+0+2','0','Folyamatos számonkérés (F)',NULL,'4'),('NKMISAB256SF','AIT',NULL,'Programozás II.','Kötelező',6,'2+0+2','0','Folyamatos számonkérés (F)',NULL,'2'),('NKMIVIB213KT','AIT',NULL,'Távközlési hálózatok','Kötelező',3,'2+0+0','0','Kollokvium (K)',NULL,'6'),('NKMIVIB213SF','AIT',NULL,'Számítógép-architektúrák I.','Kötelező',3,'2+0+0','0','Folyamatos számonkérés (F)',NULL,'2'),('NKMIVIB233FA','AIT',NULL,'Adatbáziskezelő rendszerek II.','Kötelezően választható',3,'0+0+2','0','Folyamatos számonkérés (F)',NULL,'4,6'),('NKMIVIB234J','AIT',NULL,' Java programozás II.','Kötelezően választható',5,'0+0+4','0','Folyamatos számonkérés (F)',NULL,'4,6'),('NKMIVIB244EV','AIT',NULL,'Elektromosságtan','Kötelező',4,'1+2+0','0','Vizsga (V)',NULL,'2'),('NKMIVIB254MV','AIT',NULL,'Mobil robotika','Kötelező',4,'1+0+2','0','Vizsga (V)',NULL,'6'),('NKMIVIB256CF','AIT',NULL,'Informatikai biztonság','Kötelező',6,'1+0+3','0','Folyamatos számonkérés (F)',NULL,'6'),('NKMIVIB256SH','AIT',NULL,'Számítógép-hálózatok II.','Kötelezően választható',6,'2+0+2','0','Folyamatos számonkérés (F)',NULL,'4,7'),('NKMIVIB343SP','AIT',NULL,'Számítógépes perifériák','Kötelező',3,'1+1+0','0','Kollokvium (K)',NULL,'4'),('NKMIVIB344ZV','AIT',NULL,'Számítógép-architektúrák II.','Kötelező',4,'2+1+0','0','Vizsga (V)',NULL,'4'),('NKMKLE1220A','Nyelv',NULL,'Angol nyelv II.','Szabadon válaszható',4,'0+4+0','0','Folyamatos számonkérés (F)',NULL,'2'),('NKMKLE12X0A','Nyelv',NULL,'Angol nyelvi kollokvium','Kötelező',0,'0+0+0','0','Kollokvium (K)',NULL,'2'),('NKMKLE2220A','Nyelv',NULL,'Angol nyelv IV.','Szabadon válaszható',4,'0+4+0','0','Folyamatos számonkérés (F)',NULL,'4'),('NKMKMAB544F','AIT',NULL,'Matematikai felzárkóztató II. ','Szabadon válaszható',2,'0+2+0','0','Aláírás (A)',NULL,'3'),('NKMKSP1100B/D','Testnevelés',NULL,'Testnevelés II.','Kötelező',0,'0+2+0','0','Aláírás (A)',NULL,'2');

--
-- Table structure for table `tartozik`
--

DROP TABLE IF EXISTS `tartozik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tartozik` (
  `szaknev` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL,
  `targykod` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL,
  PRIMARY KEY (`szaknev`,`targykod`),
  KEY `szaknev` (`szaknev`),
  KEY `targykod` (`targykod`),
  CONSTRAINT `tartozik_ibfk_1` FOREIGN KEY (`szaknev`) REFERENCES `szak` (`szaknev`),
  CONSTRAINT `tartozik_ibfk_2` FOREIGN KEY (`targykod`) REFERENCES `tanterv` (`targykod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tartozik`
--

INSERT INTO `tartozik` (`szaknev`, `targykod`) VALUES ('Mérnök BsC','NKGTGAB144A'),('Mérnök BsC','NKGTMIB222G'),('Mérnök BsC','NKMIIN313IN'),('Mérnök BsC','NKMIINB336PL'),('Mérnök BsC','NKMIMAB244DI'),('Mérnök BsC','NKMIMAB244FO'),('Mérnök BsC','NKMIMAB246TV'),('Mérnök BsC','NKMIMAB344LI'),('Mérnök BsC','NKMIMIB10xT'),('Mérnök BsC','NKMIMIB20xT'),('Mérnök BsC','NKMISAB154RF'),('Mérnök BsC','NKMISAB223RF'),('Mérnök BsC','NKMISAB244DF'),('Mérnök BsC','NKMISAB244OK'),('Mérnök BsC','NKMISAB254MV'),('Mérnök BsC','NKMISAB254ZF'),('Mérnök BsC','NKMISAB256SF'),('Mérnök BsC','NKMIVIB213KT'),('Mérnök BsC','NKMIVIB213SF'),('Mérnök BsC','NKMIVIB233FA'),('Mérnök BsC','NKMIVIB234J'),('Mérnök BsC','NKMIVIB244EV'),('Mérnök BsC','NKMIVIB254MV'),('Mérnök BsC','NKMIVIB256CF'),('Mérnök BsC','NKMIVIB256SH'),('Mérnök BsC','NKMIVIB343SP'),('Mérnök BsC','NKMIVIB344ZV'),('Mérnök BsC','NKMKLE1220A'),('Mérnök BsC','NKMKLE12X0A'),('Mérnök BsC','NKMKLE2220A'),('Mérnök BsC','NKMKMAB544F'),('Mérnök BsC','NKMKSP1100B/D');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
