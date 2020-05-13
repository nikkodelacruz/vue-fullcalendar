-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 13, 2020 at 03:59 PM
-- Server version: 5.7.24
-- PHP Version: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booking`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `schedule_id` int(11) NOT NULL,
  `procedure_id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `time_slot` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `customer_id`, `doctor_id`, `schedule_id`, `procedure_id`, `branch_id`, `time_slot`, `date`, `status`) VALUES
(13, 158, 3, 8, 1, 1, '12:00 PM - 1:00 PM', '2020-05-15', ''),
(15, 160, 3, 8, 1, 1, '11:00 AM - 12:00 PM', '2020-05-15', ''),
(16, 161, 3, 8, 1, 1, '2:00 PM - 3:00 PM', '2020-05-15', ''),
(22, 164, 3, 8, 1, 1, '1:00 PM - 2:00 PM', '2020-05-15', ''),
(29, 168, 4, 4, 1, 1, '6:00 AM - 7:00 AM', '2020-05-01', ''),
(30, 168, 4, 5, 1, 1, '6:00 AM - 7:00 AM', '2020-05-21', ''),
(31, 169, 7, 11, 1, 2, '8:00 AM - 9:00 AM', '2020-05-20', ''),
(32, 169, 7, 10, 3, 2, '2:00 PM - 4:00 PM', '2020-05-18', ''),
(33, 170, 4, 4, 1, 2, '8:00 AM - 9:00 AM', '2020-05-01', ''),
(34, 171, 4, 4, 1, 1, '7:00 AM - 8:00 AM', '2020-05-01', ''),
(35, 172, 7, 11, 3, 2, '9:00 AM - 11:00 AM', '2020-05-20', '');

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `id` int(100) NOT NULL,
  `branch_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`id`, `branch_name`) VALUES
(1, 'Branch 1'),
(2, 'Branch 2');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(100) NOT NULL,
  `full_name` varchar(50) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `contact_number` varchar(50) NOT NULL,
  `birth_date` date NOT NULL,
  `email_address` varchar(100) NOT NULL,
  `source` varchar(50) NOT NULL,
  `remarks` text NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `full_name`, `gender`, `contact_number`, `birth_date`, `email_address`, `source`, `remarks`, `password`) VALUES
(154, 'John Doe', 'Male', '09123', '1990-09-12', 'johndoe@gmail.com', 'Internet', 'Lorem ipsum', ''),
(155, 'John Doe', 'Male', '09123', '1990-09-12', 'johndoe@gmail.com', 'Internet', 'Lorem ipsum', ''),
(156, 'John Doe', 'Male', '09123', '1990-09-12', 'johndoe@gmail.com', 'Internet', 'Lorem ipsum', ''),
(157, 'John Doe', 'Male', '09123', '1990-09-12', 'johndoe@gmail.com', 'Internet', 'Lorem ipsum', ''),
(158, 'John Doe', 'Male', '09123', '1990-09-12', 'johndoe@gmail.com', 'Internet', 'Lorem ipsum', ''),
(159, 'John Doe', 'Male', '09123', '1990-09-12', 'johndoe@gmail.com', 'Internet', 'Lorem ipsum', ''),
(160, 'John Doe', 'Male', '09123', '1990-09-12', 'johndoe@gmail.com', 'Internet', 'Lorem ipsum', ''),
(161, 'John Doe', 'Male', '09123', '1990-09-12', 'johndoe@gmail.com', 'Internet', 'Lorem ipsum', ''),
(162, 'John Doe', 'Male', '09123', '1990-09-12', 'johndoe@gmail.com', 'Internet', 'Lorem ipsum', ''),
(163, 'John Doe', 'Male', '09123', '1990-09-12', 'johndoe@gmail.com', 'Internet', 'Lorem ipsum', ''),
(164, 'John Doe', 'Male', '09123', '1990-09-12', 'johndoe@gmail.com', 'Internet', 'Lorem ipsum', ''),
(165, 'John Doe', 'Male', '09123', '1990-09-12', 'johndoe@gmail.com', 'Internet', 'Lorem ipsum', ''),
(166, 'John Doe', 'Male', '09123', '1990-09-12', 'johndoe@gmail.com', 'Internet', 'Lorem ipsum', ''),
(167, 'John Doe', 'Male', '09123', '1990-09-12', 'johndoe@gmail.com', 'Internet', 'Lorem ipsum', ''),
(168, 'John Doe', 'Male', '09123', '1990-09-12', 'johndoe@gmail.com', 'Internet', 'Lorem ipsum', ''),
(169, 'John Doe', 'Male', '09123', '1990-09-12', 'johndoe@gmail.com', 'Internet', 'Lorem ipsum', ''),
(170, 'John Doe', 'Male', '09123', '1990-09-12', 'johndoe@gmail.com', 'Internet', 'Lorem ipsum', ''),
(171, 'John Doe', 'Male', '09123', '1990-09-12', 'johndoe@gmail.com', 'Internet', 'Lorem ipsum', ''),
(172, 'John Doe', 'Male', '09123', '1990-09-12', 'johndoe@gmail.com', 'Internet', 'Lorem ipsum', '');

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `id` int(100) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`id`, `name`) VALUES
(3, 'Doctor A'),
(4, 'Doctor B'),
(7, 'Doctor C');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_schedule`
--

CREATE TABLE `doctor_schedule` (
  `id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `date_available` date NOT NULL,
  `time_duration` json NOT NULL,
  `time_left` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `doctor_schedule`
--

INSERT INTO `doctor_schedule` (`id`, `doctor_id`, `date_available`, `time_duration`, `time_left`) VALUES
(2, 3, '2020-05-13', '{\"end\": \"18:00:00\", \"start\": \"12:00:00\"}', '00:00:00'),
(3, 3, '2020-05-08', '{\"end\": \"17:00:00\", \"start\": \"08:00:00\"}', '00:30:00'),
(4, 4, '2020-05-01', '{\"end\": \"09:00:00\", \"start\": \"06:00:00\"}', '02:00:00'),
(5, 4, '2020-05-21', '{\"end\": \"10:00:00\", \"start\": \"06:00:00\"}', '04:00:00'),
(7, 4, '2020-05-30', '{\"end\": \"10:00:00\", \"start\": \"08:00:00\"}', '03:00:00'),
(8, 3, '2020-05-15', '{\"end\": \"18:00:00\", \"start\": \"11:00:00\"}', '04:00:00'),
(10, 7, '2020-05-18', '{\"end\": \"17:00:00\", \"start\": \"10:00:00\"}', '07:00:00'),
(11, 7, '2020-05-20', '{\"end\": \"15:00:00\", \"start\": \"07:00:00\"}', '09:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `procedures`
--

CREATE TABLE `procedures` (
  `id` int(11) NOT NULL,
  `duration` time NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `procedures`
--

INSERT INTO `procedures` (`id`, `duration`, `name`) VALUES
(1, '01:00:00', 'laser 1'),
(2, '06:30:00', 'laser 2'),
(3, '02:00:00', 'Laser 3');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointment_id` (`customer_id`),
  ADD KEY `doctor_id` (`doctor_id`),
  ADD KEY `procedure_id` (`procedure_id`),
  ADD KEY `schedule_id` (`schedule_id`),
  ADD KEY `branch_id` (`branch_id`);

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctor_schedule`
--
ALTER TABLE `doctor_schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctor_id` (`doctor_id`);

--
-- Indexes for table `procedures`
--
ALTER TABLE `procedures`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=173;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `doctor_schedule`
--
ALTER TABLE `doctor_schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `procedures`
--
ALTER TABLE `procedures`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`),
  ADD CONSTRAINT `appointments_ibfk_3` FOREIGN KEY (`procedure_id`) REFERENCES `procedures` (`id`),
  ADD CONSTRAINT `appointments_ibfk_4` FOREIGN KEY (`schedule_id`) REFERENCES `doctor_schedule` (`id`),
  ADD CONSTRAINT `appointments_ibfk_5` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`);

--
-- Constraints for table `doctor_schedule`
--
ALTER TABLE `doctor_schedule`
  ADD CONSTRAINT `doctor_schedule_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
