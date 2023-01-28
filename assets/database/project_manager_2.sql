-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 28, 2023 at 10:50 AM
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
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
CREATE TABLE IF NOT EXISTS `company` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(75) COLLATE utf8mb4_turkish_ci NOT NULL,
  `icon` varchar(85) COLLATE utf8mb4_turkish_ci NOT NULL DEFAULT 'default_icon.png',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `name`, `icon`) VALUES
(1, 'Devoloper Ahmet', 'icon_59_53.png');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
CREATE TABLE IF NOT EXISTS `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_turkish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `name`) VALUES
(1, 'IT'),
(2, 'HR');

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `name`, `description`, `photo`, `start_date`, `end_date`, `progress`, `department_id`, `state_id`) VALUES
(1, 'Network Project', 'Network construction of Ankara.', 'project_1.png', '2023-01-01 08:40:10', '2023-01-26 09:02:03', 67, 1, 1),
(2, 'Educational Computer Programming', 'Aim is to give basic computer programming education.', 'project_0.png', '2023-01-12 15:39:18', NULL, 30, 1, 2),
(3, 'Frontend Web Game', 'Best game ever!', 'project_0.png', '2023-01-12 16:57:33', '2023-01-10 06:44:16', 100, 1, 4),
(5, 'Internship Program', 'Aim is to develop internships to work later on their internsip.', 'project_default.png', '2023-01-25 12:22:13', '2023-01-31 12:21:18', 0, 2, 1),
(6, 'Data Analysis Of The Pages', 'Trace script will follow the actions of the users and report of that actions will be displayed.', 'project_default.png', '2023-01-27 21:00:00', '2023-01-30 21:00:00', 0, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `project_member`
--

DROP TABLE IF EXISTS `project_member`;
CREATE TABLE IF NOT EXISTS `project_member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `department_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `department_id` (`department_id`),
  KEY `project_id` (`project_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `project_member`
--

INSERT INTO `project_member` (`id`, `department_id`, `project_id`, `user_id`) VALUES
(1, 1, 1, 1),
(2, 1, 1, 2),
(3, 1, 2, 1),
(4, 1, 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `project_state`
--

DROP TABLE IF EXISTS `project_state`;
CREATE TABLE IF NOT EXISTS `project_state` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state` varchar(50) COLLATE utf8mb4_turkish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `project_state`
--

INSERT INTO `project_state` (`id`, `state`) VALUES
(1, 'In progress'),
(2, 'Waiting'),
(3, 'In maintenance'),
(4, 'Completed'),
(5, 'Terminated'),
(6, 'verified');

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
CREATE TABLE IF NOT EXISTS `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `department_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(50) COLLATE utf8mb4_turkish_ci NOT NULL,
  `start_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` timestamp NULL DEFAULT NULL,
  `description` varchar(150) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `comment` varchar(150) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `state_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `state_id` (`state_id`),
  KEY `user_id` (`user_id`),
  KEY `project_id` (`project_id`),
  KEY `department_id` (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`id`, `department_id`, `project_id`, `user_id`, `name`, `start_date`, `end_date`, `description`, `comment`, `state_id`) VALUES
(1, 1, 2, 1, 'Prepare hardware', '2023-01-11 20:41:11', '2023-01-26 06:56:23', 'Hardware components of the network should be prepared!', 'Need extra time. -Ahmet', 2),
(2, 1, 2, 1, 'Agreement with company', '2023-01-11 20:42:32', '2023-01-19 20:41:29', 'Metting time should be revised.', 'Hurry up!', 1),
(3, 1, 2, 4, 'Test ', '2023-01-23 13:10:00', NULL, 'test of the program', 'no error', 3);

-- --------------------------------------------------------

--
-- Table structure for table `task_state`
--

DROP TABLE IF EXISTS `task_state`;
CREATE TABLE IF NOT EXISTS `task_state` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state` varchar(50) COLLATE utf8mb4_turkish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `task_state`
--

INSERT INTO `task_state` (`id`, `state`) VALUES
(1, 'Waiting'),
(2, 'In Progress'),
(3, 'Completed'),
(4, 'Terminated');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(35) COLLATE utf8mb4_turkish_ci NOT NULL,
  `surname` varchar(25) COLLATE utf8mb4_turkish_ci NOT NULL,
  `username` varchar(25) COLLATE utf8mb4_turkish_ci NOT NULL,
  `password` varchar(50) COLLATE utf8mb4_turkish_ci NOT NULL,
  `photo` varchar(100) COLLATE utf8mb4_turkish_ci DEFAULT 'user_0.png',
  `department_id` int(11) NOT NULL,
  `user_type_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_type_id` (`user_type_id`),
  KEY `department_id` (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `surname`, `username`, `password`, `photo`, `department_id`, `user_type_id`) VALUES
(1, 'Ahmet', 'Ergin', 'Ahmet', 'c46583f20929c7b02ca72e0af669eff63b133885', 'ahmet.jpg', 1, 1),
(2, 'Tuna', 'Ergin', 'Tuna', 'c46583f20929c7b02ca72e0af669eff63b133885', 'userPhoto_0.png', 1, 2),
(3, 'boss', 'boss', 'boss', 'c46583f20929c7b02ca72e0af669eff63b133885', 'userPhoto_1.png', 1, 1),
(4, 'Tarık', 'Tarık', 'Tarık', 'c46583f20929c7b02ca72e0af669eff63b133885', 'userPhoto_2.png', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `user_type`
--

DROP TABLE IF EXISTS `user_type`;
CREATE TABLE IF NOT EXISTS `user_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(25) COLLATE utf8mb4_turkish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `user_type`
--

INSERT INTO `user_type` (`id`, `type`) VALUES
(1, 'boss'),
(2, 'employee');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `project_state` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `project_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `project_member`
--
ALTER TABLE `project_member`
  ADD CONSTRAINT `project_member_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `project_member_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `project_member_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `task_state` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `task_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `task_ibfk_3` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `task_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`user_type_id`) REFERENCES `user_type` (`id`),
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
