-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 15, 2023 at 08:12 AM
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
(1, 'Web Company', 'default_icon.png');

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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `name`, `description`, `photo`, `start_date`, `end_date`, `progress`, `department_id`, `state_id`) VALUES
(1, 'Network Project', 'Network construction of Ankara.', 'projectId_1.png', '2023-01-01 08:40:10', '2023-01-26 09:02:03', 67, 1, 1),
(2, 'Educational Computer Programming', 'Aim is to give basic computer programming education.', 'projectId_2.png', '2023-01-11 21:00:00', NULL, 30, 1, 2),
(3, 'Frontend Web Game', 'Best game ever!', 'projectId_3.png', '2023-01-12 16:57:33', '2023-01-10 06:44:16', 100, 1, 4),
(5, 'Internship Program', 'Aim is to develop internships to work later on their internsip.', 'project_default.png', '2023-01-25 12:22:13', '2023-01-31 12:21:18', 0, 2, 1),
(6, 'Data Analysis Of The Pages', 'Trace script will follow the actions of the users and report of that actions will be displayed.', 'project_default.png', '2023-02-09 21:00:00', '2023-01-30 21:00:00', 21, 1, 2),
(7, 'Database Management', 'Aim is to transfer data from servers.', 'projectId_7.png', '2023-02-01 21:00:00', '2023-03-21 21:00:00', 56, 1, 3),
(8, 'Web Design', 'Aim is to design the front-end pages of the project_manager project.', 'projectId_8', '2023-02-10 21:00:00', '2023-03-17 21:00:00', 67, 1, 1),
(9, 'Population Chart', 'This project aims to user js charts and display the rates of population in that charts.', 'projectId_9', '2023-01-29 21:00:00', '2023-04-28 21:00:00', 9, 1, 5),
(10, 'R Data Analysis', 'Data analysis of the statistics with R language.', 'projectId_10', '2023-01-29 21:00:00', '2023-02-02 21:00:00', 18, 1, 3),
(11, 'Project Manager', 'Aim is to develop web application. By using that you can manage your project tasks in company any department scale.', 'projectId_11', '2023-02-14 21:00:00', '2023-02-19 21:00:00', 65, 1, 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `project_member`
--

INSERT INTO `project_member` (`id`, `department_id`, `project_id`, `user_id`) VALUES
(1, 1, 1, 1),
(2, 1, 1, 2),
(3, 1, 2, 1),
(4, 1, 2, 3),
(5, 1, 7, 1),
(6, 1, 7, 2),
(7, 1, 7, 4),
(8, 1, 7, 3),
(10, 1, 9, 6),
(11, 1, 9, 1),
(12, 1, 9, 5),
(13, 1, 9, 2),
(14, 1, 9, 4),
(15, 1, 9, 3),
(16, 1, 10, 1),
(17, 1, 10, 3),
(18, 1, 10, 5),
(22, 1, 8, 6),
(23, 1, 8, 5),
(24, 1, 6, 1),
(25, 1, 6, 2),
(26, 1, 11, 1),
(27, 1, 11, 3);

-- --------------------------------------------------------

--
-- Table structure for table `project_state`
--

DROP TABLE IF EXISTS `project_state`;
CREATE TABLE IF NOT EXISTS `project_state` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state` varchar(50) COLLATE utf8mb4_turkish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `project_state`
--

INSERT INTO `project_state` (`id`, `state`) VALUES
(1, 'In progress'),
(2, 'Waiting'),
(3, 'In maintenance'),
(4, 'Completed'),
(5, 'Terminated');

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
CREATE TABLE IF NOT EXISTS `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `department_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_turkish_ci NOT NULL,
  `start_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` timestamp NULL DEFAULT NULL,
  `description` varchar(150) COLLATE utf8mb4_turkish_ci NOT NULL,
  `comment` varchar(150) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `state_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `state_id` (`state_id`),
  KEY `user_id` (`user_id`),
  KEY `project_id` (`project_id`),
  KEY `department_id` (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`id`, `department_id`, `project_id`, `user_id`, `name`, `start_date`, `end_date`, `description`, `comment`, `state_id`) VALUES
(1, 1, 2, 6, 'Prepare hardware', '2023-01-11 20:41:11', '2023-01-26 06:56:23', 'Hardware components of the network should be prepared!', 'Need extra time. -Ahmet', 2),
(2, 1, 2, 4, 'Agreement with company', '2023-01-11 20:42:32', '2023-02-15 20:41:29', 'Metting time should be revised.', 'Hurry up!', 1),
(3, 1, 2, 4, 'Test ', '2023-01-23 13:10:00', NULL, 'test of the program', 'no error', 3),
(4, 1, 7, 5, 'Construct Table', '2023-01-29 12:30:19', '2023-01-31 12:28:31', 'Create tables.', 'No comment now.', 1),
(5, 1, 7, 4, 'Fix nulls.', '2023-01-29 12:30:19', '2023-01-31 12:28:31', 'Fix null values in the table.', 'Wait creation of the tables.', 3),
(6, 1, 8, 3, 'Control due dates.', '2023-02-14 07:24:47', '2023-02-23 07:23:39', 'Due dates of the tasks will be checked.', NULL, 1),
(8, 1, 8, 3, 'First task.', '2023-02-13 21:00:00', '2023-02-23 21:00:00', 'This is the first task that assigned by graphical user interface.', '', 3),
(9, 1, 11, 1, 'Edit task', '2023-02-14 21:00:00', '2023-02-19 21:00:00', 'Edit task page will be added.', '', 1),
(10, 1, 11, 1, 'Display task', '2023-02-14 21:00:00', '2023-02-19 21:00:00', 'Open project\'s tasks page from project page.', '', 1),
(11, 1, 11, 1, 'Language Icon', '2023-02-14 21:00:00', '2023-02-19 21:00:00', 'Remove language icon ', '', 1),
(12, 1, 11, 1, 'Downloading pages', '2023-02-14 21:00:00', '2023-02-19 21:00:00', 'Downloading resources and display them before page open.', '', 1),
(13, 1, 11, 1, 'User edit', '2023-02-14 21:00:00', '2023-02-19 21:00:00', 'Priviliges in user edit page.', '* boss and owner can change user department.\n* owner can change user type of user\n* boss can add user and delete', 1);

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
(1, 'In Progress'),
(2, 'Waiting'),
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
  `expertise` varchar(50) COLLATE utf8mb4_turkish_ci NOT NULL,
  `photo` varchar(100) COLLATE utf8mb4_turkish_ci DEFAULT 'user_0.png',
  `department_id` int(11) DEFAULT NULL,
  `user_type_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_type_id` (`user_type_id`),
  KEY `department_id` (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `surname`, `username`, `password`, `expertise`, `photo`, `department_id`, `user_type_id`) VALUES
(1, 'Ahmet', 'Ergin', 'Ahmet', 'c46583f20929c7b02ca72e0af669eff63b133885', 'Web Programming', 'user_1_218.png', 1, 1),
(2, 'Tuna', 'Ergin', 'Tuna', 'c46583f20929c7b02ca72e0af669eff63b133885', 'Media', 'userPhoto_0.png', 1, 2),
(3, 'Boss', 'Ergin', 'Boss', 'c46583f20929c7b02ca72e0af669eff63b133885', 'Project Management', 'userPhoto_1.png', 1, 1),
(4, 'Tarıkkkkq', 'Ergin', 'Tarık', 'c46583f20929c7b02ca72e0af669eff63b133885', 'Animations', 'user_4_844.png', 1, 2),
(5, 'Zeynep', 'Ergin', 'Zeyno', 'c46583f20929c7b02ca72e0af669eff63b133885', 'Design', 'userPhoto_5.png', 1, 2),
(6, 'Sena', 'Ergin', 'Sena', 'c46583f20929c7b02ca72e0af669eff63b133885', 'Analysis', 'userPhoto_6.png', 1, 2),
(7, 'Owner', 'Ergin', 'Owner', 'c46583f20929c7b02ca72e0af669eff63b133885', 'Having Company.', 'userPhoto_3.png', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `user_type`
--

DROP TABLE IF EXISTS `user_type`;
CREATE TABLE IF NOT EXISTS `user_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(25) COLLATE utf8mb4_turkish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `user_type`
--

INSERT INTO `user_type` (`id`, `type`) VALUES
(1, 'boss'),
(2, 'employee'),
(3, 'owner');

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
