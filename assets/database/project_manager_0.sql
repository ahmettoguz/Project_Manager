-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 20, 2023 at 09:16 PM
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
CREATE DATABASE IF NOT EXISTS `project_manager` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_turkish_ci;
USE `project_manager`;

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
CREATE TABLE IF NOT EXISTS `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_turkish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `name`) VALUES
(1, 'IT');

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `name`, `description`, `photo`, `start_date`, `end_date`, `progress`, `department_id`, `state_id`) VALUES
(1, 'Network Project', 'Network construction of Ankara.', 'project_1.png', '2023-01-01 08:40:10', '2023-01-26 09:02:03', 67, 1, 1),
(2, 'Educational Computer Programming', 'Aim is to give basic computer programming education.', 'project_0.png', '2023-01-12 15:39:18', NULL, 30, 1, 2),
(3, 'Frontend Web Game', 'Best game ever!', 'project_0.png', '2023-01-12 16:57:33', '2023-01-10 06:44:16', 100, 1, 4),
(4, 'this project name is too long to show how to see', 'dummy project', 'project_0.png', '2023-01-17 06:21:30', '2023-01-25 06:20:26', 10, 1, 1);

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `project_member`
--

INSERT INTO `project_member` (`id`, `department_id`, `project_id`, `user_id`) VALUES
(1, 1, 1, 1),
(2, 1, 1, 2),
(3, 1, 2, 1),
(4, 1, 2, 3),
(5, 1, 1, 3);

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
  `progress_contribution` int(11) DEFAULT NULL,
  `name` varchar(50) COLLATE utf8mb4_turkish_ci NOT NULL,
  `start_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` timestamp NULL DEFAULT NULL,
  `description` varchar(150) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `comment` varchar(150) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `state_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`id`, `department_id`, `project_id`, `user_id`, `progress_contribution`, `name`, `start_date`, `end_date`, `description`, `comment`, `state_id`) VALUES
(1, 1, 1, NULL, 20, 'Prepare hardware', '2023-01-11 20:41:11', NULL, 'Hardware components of the network should be prepared!', 'Need extra time. -Ahmet', 3),
(2, 1, 1, NULL, 10, 'Agreement with company', '2023-01-11 20:42:32', '2023-01-19 20:41:29', NULL, NULL, 2);

-- --------------------------------------------------------

--
-- Table structure for table `task_state`
--

DROP TABLE IF EXISTS `task_state`;
CREATE TABLE IF NOT EXISTS `task_state` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state` varchar(50) COLLATE utf8mb4_turkish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `task_state`
--

INSERT INTO `task_state` (`id`, `state`) VALUES
(1, 'Waiting'),
(2, 'In Progress'),
(3, 'Completed');

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
  `mail` varchar(50) COLLATE utf8mb4_turkish_ci NOT NULL,
  `photo` varchar(100) COLLATE utf8mb4_turkish_ci DEFAULT 'user_0.png',
  `phone` varchar(15) COLLATE utf8mb4_turkish_ci NOT NULL,
  `department_id` int(11) NOT NULL,
  `user_type_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `surname`, `username`, `password`, `mail`, `photo`, `phone`, `department_id`, `user_type_id`) VALUES
(1, 'Ahmet', 'Ergin', 'Ahmet', 'c46583f20929c7b02ca72e0af669eff63b133885', 'ahmet@hotmail.com', 'ahmet.jpg', '05052082324', 1, 1),
(2, 'Tuna', 'Ergin', 'Tuna', 'c46583f20929c7b02ca72e0af669eff63b133885', 'tuna@hotmail.com', 'userPhoto_0.png', '05052082324', 1, 2),
(3, 'boss', 'boss', 'boss', 'c46583f20929c7b02ca72e0af669eff63b133885', 'boss@hotmail.com', 'userPhoto_1.png', '05052082324', 1, 1),
(4, 'Tarık', 'Tarık', 'Tarık', '1', 'tarık@hotmail.com', 'userPhoto_2.png', '05052082324', 1, 2);

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
