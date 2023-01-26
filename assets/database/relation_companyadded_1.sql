-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 26, 2023 at 08:39 AM
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
-- Database: `project_manager`
--

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
CREATE TABLE IF NOT EXISTS `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_turkish_ci NOT NULL,
  `description` varchar(500) COLLATE utf8mb4_turkish_ci NOT NULL,
  `photo` varchar(100) COLLATE utf8mb4_turkish_ci DEFAULT 'project_default.png',
  `start_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` timestamp NULL DEFAULT NULL,
  `progress` int(11) DEFAULT '0',
  `department_id` int(11) NOT NULL,
  `state_id` int(11) NOT NULL DEFAULT '2',
  PRIMARY KEY (`id`),
  KEY `state_id` (`state_id`),
  KEY `department_id` (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `name`, `description`, `photo`, `start_date`, `end_date`, `progress`, `department_id`, `state_id`) VALUES
(1, 'Network Project', 'Network construction of Ankara.', 'project_1.png', '2023-01-01 08:40:10', '2023-01-26 09:02:03', 67, 1, 1),
(2, 'Educational Computer Programming', 'Aim is to give basic computer programming education.', 'project_0.png', '2023-01-12 15:39:18', NULL, 30, 1, 2),
(3, 'Frontend Web Game', 'Best game ever!', 'project_0.png', '2023-01-12 16:57:33', '2023-01-10 06:44:16', 100, 1, 4),
(5, 'Internship Program', 'Aim is to develop internships to work later on their internsip.', 'project_default.png', '2023-01-25 12:22:13', '2023-01-31 12:21:18', 0, 2, 1);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `project_state` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `project_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
