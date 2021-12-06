-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 06, 2021 at 09:03 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `allen_chat`
--

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receipient_id` int(11) NOT NULL,
  `message` text CHARACTER SET utf8mb4 NOT NULL,
  `message_file` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `receipient_id`, `message`, `message_file`, `created_at`) VALUES
(70, 14, 15, 'Hi there👋🏻', '', '2021-12-06 18:46:40'),
(71, 14, 15, 'Allen here 😊', '', '2021-12-06 18:46:56'),
(72, 14, 15, 'How\'s school?', '', '2021-12-06 18:47:03'),
(73, 15, 14, 'Hi👋🏻', '', '2021-12-06 18:48:19'),
(74, 15, 14, 'It\'s nice to meet you Allen 😊', '', '2021-12-06 18:48:41'),
(75, 15, 14, 'Very cool  😎', '', '2021-12-06 18:49:38'),
(76, 15, 14, 'How\'s everything?', '', '2021-12-06 18:49:45');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `user_img` text NOT NULL,
  `coverphoto` text NOT NULL,
  `bio` text CHARACTER SET utf8mb4 NOT NULL,
  `active` varchar(11) NOT NULL,
  `hash` text NOT NULL,
  `date_joined` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `full_name`, `username`, `email`, `password`, `user_img`, `coverphoto`, `bio`, `active`, `hash`, `date_joined`) VALUES
(14, 'Allen Jones', '', 'aljay3334@gmail.com', '$2a$12$syo4f5DSxQd72QYd1dDIcOL1ud9uO.xF96ceeTVogQv2R0YHMnifC', 'uploads/IMAGE-1638814261817.jpg', 'uploads/coverphoto.jpg', 'I love computer programming 😍', '', '', '2021-12-06 19:07:33'),
(15, 'Michael', '', 'michael@gmail.com', '$2a$12$aXCX2jIOcl.mk5Za5AUQI.0LtMoM7Op.uo1mmk8zWGU0xOHv8t16W', 'uploads/IMAGE-1638814570609.jpg', 'uploads/coverphoto.jpg', 'My bio', '', '', '2021-12-06 18:16:10'),
(17, 'Latif Issaka', '', 'latif@gmail.com', '$2a$12$zofaCqn8D1bsoz112Og7/.xAobaBr7KADcUqdptnfj9fXCCcS2dG2', 'uploads/avatar.jpg', 'uploads/coverphoto.jpg', 'My bio', '', '', '2021-12-06 18:18:15'),
(19, 'Jacobs ', '', 'jacobs@gmail.com', '$2a$12$LZ3l12.jpNEQiLGBpYPJxO8mmHn/Aj87qKPVl6oEn9dqt.pFeDpu6', 'uploads/avatar.jpg', 'uploads/coverphoto.jpg', 'My bio', '', '', '2021-12-06 18:21:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `messages_ibfk_1` (`receipient_id`),
  ADD KEY `sender_id` (`sender_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`receipient_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
