-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 26, 2022 at 03:48 PM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_turkish_ci;
USE `test`;-- --------------------------------------------------------

--
-- Table structure for table `crudoperations`
--

DROP TABLE IF EXISTS `crudoperations`;
CREATE TABLE IF NOT EXISTS `crudoperations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_turkish_ci NOT NULL,
  `code` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `crudoperations`
--

INSERT INTO `crudoperations` (`id`, `name`, `code`) VALUES
(1, 'ahmet', 1),
(2, 'tuna', 1),
(3, 'kisi', 1),
(4, 'tiko', 1);

-- --------------------------------------------------------

--
-- Table structure for table `crudoperationsforeigntable`
--

DROP TABLE IF EXISTS `crudoperationsforeigntable`;
CREATE TABLE IF NOT EXISTS `crudoperationsforeigntable` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `referencedId` int(11) NOT NULL,
  `city` varchar(50) COLLATE utf8mb4_turkish_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk` (`referencedId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `crudoperationsforeigntable`
--

INSERT INTO `crudoperationsforeigntable` (`id`, `referencedId`, `city`) VALUES
(1, 1, 'ankara'),
(2, 1, 'bursa'),
(4, 3, 'ankara');

-- --------------------------------------------------------

--
-- Constraints for table `crudoperationsforeigntable`
--
ALTER TABLE `crudoperationsforeigntable`
  ADD CONSTRAINT `fk` FOREIGN KEY (`referencedId`) REFERENCES `crudoperations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
