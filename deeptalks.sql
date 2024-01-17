-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 08, 2024 at 03:18 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `deeptalks`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category`, `created_at`, `updated_at`) VALUES
(1, 'Love life', '2024-01-08 03:44:52', '2024-01-08 04:09:37'),
(2, 'Programming', '2024-01-08 04:09:44', '2024-01-08 04:09:44'),
(3, 'Friends', '2024-01-08 04:09:58', '2024-01-08 04:09:58');

-- --------------------------------------------------------

--
-- Table structure for table `channels`
--

CREATE TABLE `channels` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `thumbnail` text NOT NULL,
  `private` tinyint(1) NOT NULL DEFAULT 1,
  `code` varchar(6) NOT NULL,
  `auto_accept_post` tinyint(1) NOT NULL DEFAULT 1,
  `allow_members_add` tinyint(1) NOT NULL DEFAULT 1,
  `auto_accept_joined_members` tinyint(1) NOT NULL DEFAULT 1,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `channels`
--

INSERT INTO `channels` (`id`, `name`, `description`, `user_id`, `thumbnail`, `private`, `code`, `auto_accept_post`, `allow_members_add`, `auto_accept_joined_members`, `date_created`, `date_updated`) VALUES
('channel-1704687633639-ozpFh9CCg4', 'C# programming', 'All\r\nAbout\r\nC#\r\nProgramming', 13, '/img/profile/1704687633636-computer.webp', 2, 'ABGmJZ', 2, 2, 1, '2024-01-08 12:20:33', '2024-01-08 12:20:33'),
('channel-1704695775463-M2cBEjvDpF', 'Java progamming', 'all\r\nabout\r\njava', 16, '/img/profile/1704695775460-computer.webp', 2, 'jLyrle', 1, 2, 1, '2024-01-08 14:36:15', '2024-01-08 14:36:15');

-- --------------------------------------------------------

--
-- Table structure for table `channels_category`
--

CREATE TABLE `channels_category` (
  `id` int(11) NOT NULL,
  `channel_id` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `channels_category`
--

INSERT INTO `channels_category` (`id`, `channel_id`, `category_id`) VALUES
(2, 'channel-1704687633639-ozpFh9CCg4', 2),
(3, 'channel-1704695775463-M2cBEjvDpF', 2);

-- --------------------------------------------------------

--
-- Table structure for table `channels_member`
--

CREATE TABLE `channels_member` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `channel_id` varchar(255) NOT NULL,
  `type` tinyint(2) NOT NULL DEFAULT 1,
  `status` int(11) NOT NULL DEFAULT 1,
  `date_created` datetime DEFAULT current_timestamp(),
  `date_updated` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `channels_member`
--

INSERT INTO `channels_member` (`id`, `user_id`, `channel_id`, `type`, `status`, `date_created`, `date_updated`) VALUES
(1, 13, 'channel-1704687633639-ozpFh9CCg4', 2, 2, '2024-01-08 12:20:33', '2024-01-08 12:20:33'),
(2, 15, 'channel-1704687633639-ozpFh9CCg4', 2, 2, '2024-01-08 12:51:35', '2024-01-08 12:51:35'),
(3, 16, 'channel-1704695775463-M2cBEjvDpF', 2, 2, '2024-01-08 14:36:15', '2024-01-08 14:36:15'),
(4, 15, 'channel-1704695775463-M2cBEjvDpF', 2, 2, '2024-01-08 14:36:24', '2024-01-08 14:36:24');

-- --------------------------------------------------------

--
-- Table structure for table `channel_threads`
--

CREATE TABLE `channel_threads` (
  `id` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `channel_id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `pin` int(11) NOT NULL DEFAULT 1,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `channel_threads`
--

INSERT INTO `channel_threads` (`id`, `user_id`, `channel_id`, `title`, `content`, `status`, `pin`, `date_created`, `date_updated`) VALUES
('c-thread-1704687700225-tzkaaMmHwE', 13, 'channel-1704687633639-ozpFh9CCg4', 'Share your thought', 'Maganda paba ang c# progamming ?', 2, 1, '2024-01-08 12:21:40', '2024-01-08 12:21:40'),
('c-thread-1704695816583-LSnugFnVJ9', 15, 'channel-1704695775463-M2cBEjvDpF', 'goods paba ang java?', 'share nio nmn idea dyan', 2, 1, '2024-01-08 14:36:56', '2024-01-08 14:37:21'),
('c-thread-1704695894302-EWCkayUozJ', 15, 'channel-1704687633639-ozpFh9CCg4', 'hahaha', 'hahahah', 2, 1, '2024-01-08 14:38:14', '2024-01-08 14:38:14');

-- --------------------------------------------------------

--
-- Table structure for table `channel_thread_replies`
--

CREATE TABLE `channel_thread_replies` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `channel_thread_id` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `pin` int(11) NOT NULL DEFAULT 1,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `channel_thread_replies`
--

INSERT INTO `channel_thread_replies` (`id`, `user_id`, `channel_thread_id`, `content`, `pin`, `date_created`, `date_updated`) VALUES
(1, 16, 'c-thread-1704695816583-LSnugFnVJ9', 'goods pa', 1, '2024-01-08 14:37:36', '2024-01-08 14:37:36'),
(2, 16, 'c-thread-1704695816583-LSnugFnVJ9', 'hahahaha', 2, '2024-01-08 14:37:40', '2024-01-08 14:37:52');

-- --------------------------------------------------------

--
-- Table structure for table `channel_thread_views`
--

CREATE TABLE `channel_thread_views` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `channel_thread_id` varchar(255) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `channel_thread_views`
--

INSERT INTO `channel_thread_views` (`id`, `user_id`, `channel_thread_id`, `date_created`) VALUES
(1, 13, 'c-thread-1704687700225-tzkaaMmHwE', '2024-01-08 12:28:48'),
(2, 16, 'c-thread-1704695816583-LSnugFnVJ9', '2024-01-08 14:37:30'),
(3, 15, 'c-thread-1704695816583-LSnugFnVJ9', '2024-01-08 14:37:49'),
(4, 15, 'c-thread-1704695894302-EWCkayUozJ', '2024-01-08 14:38:15');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `c_id` varchar(255) NOT NULL,
  `content` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT 1,
  `status` int(11) NOT NULL DEFAULT 1,
  `date_created` int(11) NOT NULL DEFAULT current_timestamp(),
  `date_updated` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `replies`
--

CREATE TABLE `replies` (
  `id` int(11) NOT NULL,
  `thread_id` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `pin` int(11) NOT NULL DEFAULT 1,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `replies`
--

INSERT INTO `replies` (`id`, `thread_id`, `user_id`, `content`, `pin`, `date_created`, `date_updated`) VALUES
(1, 'thread-1704695672945-dETHtno2jK', 15, 'ok kami', 1, '2024-01-08 14:35:08', '2024-01-08 14:35:08'),
(3, 'thread-1704695672945-dETHtno2jK', 16, 'ahahaha', 2, '2024-01-08 14:35:28', '2024-01-08 14:35:31');

-- --------------------------------------------------------

--
-- Table structure for table `threads`
--

CREATE TABLE `threads` (
  `id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT 2,
  `user_id` varchar(255) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `threads`
--

INSERT INTO `threads` (`id`, `title`, `content`, `status`, `user_id`, `date_created`, `date_updated`) VALUES
('thread-1704687466421-KP9d7e6AKS', 'Kamusta ang love life?', 'Share naman dian mga buhay nio. Hahahah', 2, '13', '2024-01-08 12:17:46', '2024-01-08 12:17:46'),
('thread-1704687511107-5RJSgXnSdH', 'Buhay paba mga future IT?', 'Share nio nmn mga buhay mga lods!!', 2, '13', '2024-01-08 12:18:31', '2024-01-08 12:18:31'),
('thread-1704695672945-dETHtno2jK', 'Kamusta kau mga kaibigan?', 'share nmn kau dian asa kau', 2, '16', '2024-01-08 14:34:32', '2024-01-08 14:34:32'),
('thread-1704695921336-Nw5Nl17KOT', 'my threads', 'new threads', 2, '16', '2024-01-08 14:38:41', '2024-01-08 14:38:41');

-- --------------------------------------------------------

--
-- Table structure for table `threads_category`
--

CREATE TABLE `threads_category` (
  `id` int(11) NOT NULL,
  `threads_id` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `threads_category`
--

INSERT INTO `threads_category` (`id`, `threads_id`, `category_id`) VALUES
(1, 'thread-1704687466421-KP9d7e6AKS', 1),
(2, 'thread-1704687511107-5RJSgXnSdH', 2),
(3, 'thread-1704695672945-dETHtno2jK', 3),
(4, 'thread-1704695921336-Nw5Nl17KOT', 2);

-- --------------------------------------------------------

--
-- Table structure for table `thread_views`
--

CREATE TABLE `thread_views` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `thread_id` varchar(255) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `thread_views`
--

INSERT INTO `thread_views` (`id`, `user_id`, `thread_id`, `date_created`) VALUES
(1, 13, 'thread-1704687511107-5RJSgXnSdH', '2024-01-08 12:21:05'),
(2, 16, 'thread-1704695672945-dETHtno2jK', '2024-01-08 14:34:35'),
(3, 15, 'thread-1704695672945-dETHtno2jK', '2024-01-08 14:35:04');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `fullName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'active',
  `profile_pic` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `fullName`, `email`, `username`, `password`, `role`, `status`, `profile_pic`, `created_at`, `updated_at`) VALUES
(1, 'admin2', 'admin@gmail.com', 'admin', '$argon2d$v=19$m=12,t=3,p=1$OHk2NWRlZWVsZG4wMDAwMA$8uapQf0DpY0Hg64ZxyL9uw', 'admin', 'active', '/img/profile/1704695598417-download (4).jpg', '2023-12-28 15:17:15', '2024-01-08 06:33:31'),
(13, 'Dick Lomibao', 'dicklomibao@gmail.com', 'dicklomibao', '$argon2id$v=19$m=65536,t=3,p=4$/kEmJnbQYUhLbdAjIeCQkw$FWU+6xUVegxYI4ull5tL9t+wRK1DPeWvKESdsfQ3hG0', 'client', 'active', '/img/profile/1704686513160-download (3).jpg', '2024-01-08 03:57:42', '2024-01-08 04:01:53'),
(14, 'Recia mea', 'recia123@gmail.com', 'recia123', '$argon2id$v=19$m=65536,t=3,p=4$kqpSI4V6vOxmFKAV8ZpAWA$dmlwP9wQqUgQMfaOo1uqlkwLqxgai23IT3aV7dW9bJY', 'client', 'active', '/img/profile/1704686381431-profile-picture.jpeg', '2024-01-08 03:59:41', '2024-01-08 04:37:55'),
(15, 'Mark andaya', 'markandaya@gmail.com', 'markandaya', '$argon2id$v=19$m=65536,t=3,p=4$ZqgPnDGYUqcN0eup/+aYSQ$mFl2VFfQiEfDZtkXK08bAFKmTm9Z7rX7YtlUA0GLQjY', 'client', 'active', '/img/profile/1704686565424-profile-picture.jpeg', '2024-01-08 04:02:45', '2024-01-08 05:33:59'),
(16, 'Ashley Fernandez', 'ashley@gmail.com', 'ashleyashley', '$argon2id$v=19$m=65536,t=3,p=4$YZZi39Aw5ivF0cLvCNDEbg$IfDVctlDSpow1AABc5pdWLrGG8OEDinw3//RRLp/yOM', 'client', 'active', '/img/profile/1704695401372-download (4).jpg', '2024-01-08 06:30:01', '2024-01-08 06:32:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `channels`
--
ALTER TABLE `channels`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `channels_category`
--
ALTER TABLE `channels_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `channels_member`
--
ALTER TABLE `channels_member`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `channel_threads`
--
ALTER TABLE `channel_threads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `channel_thread_replies`
--
ALTER TABLE `channel_thread_replies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `channel_thread_views`
--
ALTER TABLE `channel_thread_views`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `replies`
--
ALTER TABLE `replies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `threads`
--
ALTER TABLE `threads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `threads_category`
--
ALTER TABLE `threads_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `thread_views`
--
ALTER TABLE `thread_views`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `channels_category`
--
ALTER TABLE `channels_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `channels_member`
--
ALTER TABLE `channels_member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `channel_thread_replies`
--
ALTER TABLE `channel_thread_replies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `channel_thread_views`
--
ALTER TABLE `channel_thread_views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `replies`
--
ALTER TABLE `replies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `threads_category`
--
ALTER TABLE `threads_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `thread_views`
--
ALTER TABLE `thread_views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
