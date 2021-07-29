-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 24, 2017 at 11:05 AM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 7.0.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `final_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `qa`
--

CREATE TABLE `qa` (
  `question_id` int(11) NOT NULL,
  `session_id` int(11) NOT NULL,
  `scenario_id` int(11) NOT NULL,
  `question_description` varchar(100) NOT NULL,
  `question_marks` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `qa`
--

INSERT INTO `qa` (`question_id`, `session_id`, `scenario_id`, `question_description`, `question_marks`) VALUES
(1, 1, 1, 'what is media query?', 2),
(2, 1, 1, 'What is SASS?', 2),
(3, 1, 2, 'What is query handling?', 2),
(4, 1, 3, 'testing Question', 3),
(5, 2, 1, 'what is props ?', 4),
(6, 2, 1, 'asdasdasd', 4),
(7, 1, 1, 'whats is k? ', 1),
(8, 2, 1, 'kkk', 3),
(10, 1, 1, 'a', 2),
(12, 4, 1, 'what is media query ?', 6);

-- --------------------------------------------------------

--
-- Table structure for table `qamcq`
--

CREATE TABLE `qamcq` (
  `question_id` int(11) NOT NULL,
  `session_id` int(11) NOT NULL,
  `scenario_id` int(11) NOT NULL,
  `question_description` varchar(100) NOT NULL,
  `question_marks` int(11) NOT NULL,
  `option_a` varchar(20) NOT NULL,
  `option_b` varchar(20) NOT NULL,
  `option_c` varchar(20) NOT NULL,
  `option_d` varchar(20) NOT NULL,
  `correctanswer` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `qamcq`
--

INSERT INTO `qamcq` (`question_id`, `session_id`, `scenario_id`, `question_description`, `question_marks`, `option_a`, `option_b`, `option_c`, `option_d`, `correctanswer`) VALUES
(9, 1, 1, 'dsdasds', 2, 'a', 'b', 'c', 'd', 'a'),
(11, 2, 1, 'what is props ?', 3, 'gh', 'ij', 'kl', 'mn', 'gh'),
(13, 4, 1, 'yyyy ?', 6, 'as', 'df', 'gh', 'qw', 'a');

-- --------------------------------------------------------

--
-- Table structure for table `result`
--

CREATE TABLE `result` (
  `result_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `session_id` int(11) NOT NULL,
  `scenario_id` int(11) NOT NULL,
  `answer` longtext NOT NULL,
  `answer_marks` int(11) NOT NULL,
  `remark` longtext NOT NULL,
  `trainee_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `result`
--

INSERT INTO `result` (`result_id`, `question_id`, `session_id`, `scenario_id`, `answer`, `answer_marks`, `remark`, `trainee_id`) VALUES
(1, 1, 1, 1, 'asdasd', 2, 'dada', 'apeksha'),
(2, 2, 1, 1, 'asas', 3, 'adad', 'apeksha'),
(3, 3, 1, 2, 'query handling is fa-fa awesome!!', 0, '', 'apeksha'),
(4, 1, 1, 1, 'asdasdss', 0, '', 'shantanu'),
(5, 2, 1, 1, 'ssss', 0, '', 'shantanu'),
(6, 3, 1, 2, 'tttt', 0, '', 'shantanu'),
(7, 5, 2, 1, '', 0, 'valar morghulis', 'arnab'),
(8, 4, 1, 3, 'a', 0, '', 'shantanu'),
(12, 5, 2, 1, 'a', 0, '', 'shantanu'),
(13, 6, 2, 1, '', 0, '', 'shantanu'),
(14, 8, 2, 1, '', 0, '', 'shantanu');

-- --------------------------------------------------------

--
-- Table structure for table `result_mcq`
--

CREATE TABLE `result_mcq` (
  `result_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `session_id` int(11) NOT NULL,
  `scenario_id` int(11) NOT NULL,
  `option_answered` varchar(20) NOT NULL,
  `trainee_id` varchar(20) NOT NULL,
  `marks_allotted` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `result_mcq`
--

INSERT INTO `result_mcq` (`result_id`, `question_id`, `session_id`, `scenario_id`, `option_answered`, `trainee_id`, `marks_allotted`) VALUES
(4, 9, 1, 1, 'optiona', 'shantanu', 2);

-- --------------------------------------------------------

--
-- Table structure for table `scenarios`
--

CREATE TABLE `scenarios` (
  `session_id` int(11) NOT NULL,
  `session_name` varchar(50) NOT NULL,
  `scenario_id` int(11) NOT NULL,
  `scenario_name` varchar(50) NOT NULL,
  `scenario_duration` int(11) NOT NULL,
  `scenario_description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `scenarios`
--

INSERT INTO `scenarios` (`session_id`, `session_name`, `scenario_id`, `scenario_name`, `scenario_duration`, `scenario_description`) VALUES
(1, 'SASS', 1, 'media', 1000, 'media query\n'),
(1, 'SASS', 2, 'queryhandling', 20, 'handle the query'),
(1, 'SASS', 3, 'test', 300, 'testing purpose'),
(2, 'React', 1, 'props', 2, 'what is props ?'),
(3, 'Angular JS', 1, 'Directives', 30, 'Valar Morghulis'),
(3, 'Angular JS', 2, 'Controller', 200, 'Details about controller'),
(4, 'media-query', 1, 'mediaquery syntax', 9000, 'adadasd');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` int(11) NOT NULL,
  `session_name` varchar(100) NOT NULL,
  `trainer_id` varchar(20) NOT NULL,
  `date_created` date NOT NULL,
  `session_duration` int(11) NOT NULL,
  `is_active` int(11) NOT NULL DEFAULT '0',
  `is_started` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `session_name`, `trainer_id`, `date_created`, `session_duration`, `is_active`, `is_started`) VALUES
(1, 'SASS', 'prateek', '2017-08-29', 2, 1, 1),
(2, 'React', 'prateek', '2017-08-29', 3, 1, 1),
(3, 'Angular JS', 'vilas', '2017-09-01', 3, 0, 0),
(4, 'media-query', 'prateek', '2017-10-23', 2, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `trainee_session`
--

CREATE TABLE `trainee_session` (
  `trainee_id` varchar(20) NOT NULL,
  `session_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `trainee_session`
--

INSERT INTO `trainee_session` (`trainee_id`, `session_id`) VALUES
('apeksha', 1),
('apeksha', 2),
('arnab', 1),
('arnab', 2),
('shantanu', 1),
('shantanu', 2),
('shantanu', 4),
('shraddha', 1),
('shraddha', 2),
('shrutir', 3),
('sidhartha', 1),
('sidhartha', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `emp_id` int(20) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `email_id` varchar(50) NOT NULL,
  `role` enum('admin','trainer','trainee','') NOT NULL DEFAULT 'trainee',
  `date_created` date NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `password`, `emp_id`, `first_name`, `last_name`, `email_id`, `role`, `date_created`, `is_active`) VALUES
('admin', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 17701, 'Admin', 'Admin', 'admin@cybage.com', 'admin', '2017-08-24', 1),
('apeksha', 'ebbfbd38250257082f99955287fece2e76c02c5dab8aa4478c5ef06369d99521', 17703, 'Apeksha', 'Rahangdale', 'apekshar@cybage.com', 'trainee', '2017-08-24', 1),
('arnab', 'e8e7da962b34c8413ce456a5daaef7bbf977f1f51521f22579315ac6008e4c8d', 17704, 'Arnab', 'Debnath', 'arnabde@cybage.com', 'trainee', '2017-08-24', 1),
('prateek', '0095290b43f41da602fcf5060297a9228325b7b0bdd187a37fbac51fa6aba1ec', 17702, 'Prateek', 'Magarde', 'prateekmag@cybage.com', 'trainer', '2017-08-24', 1),
('qwerty', '65e84be33532fb784c48129675f9eff3a682b27168c0ea744b2cf58ee02337c5', 123, 'qwerty', 'qwerty', 'qwerty@gmail.com', 'trainer', '2017-09-02', 1),
('shantanu', 'ce67882283dec1398041369232bee4e9f8793eddbb0d369ea099a13b042dfc8c', 17705, 'Shantanu', 'Nanwatkar', 'shantanun@cybage.com', 'trainee', '2017-08-24', 1),
('shraddha', '2e38ac88f23d1c16a7eddbffc7709a90abc38b79700540418b2bfbd72c6391e1', 17706, 'Shraddha', 'Gurav', 'shraddhagu@cybage.com', 'trainee', '2017-08-24', 1),
('shrutir', '655cff8860fbca19589be7506a8a5e2783fe84063b9a0318fbc574a1915badee', 17649, 'shruti', 'nair', 'shrutir@gmail.com', 'trainee', '2017-09-01', 1),
('sidhartha', '3a78e755d5f99f53f6f1f4a28c3d1ce378ca35d8d926da2441492b81cc260830', 17707, 'Sidhartha ', 'Verma ', 'sidharthav@cybage.com', 'trainee', '2017-08-24', 1),
('vilas', 'b30f6aeafb8a01d57e1103ce716d520f9a4fb8f40eae7692223dab743d228f9c', 17709, 'vilas', 'deshmukh', 'vilasd@gmail.com', 'trainer', '2017-09-01', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `qa`
--
ALTER TABLE `qa`
  ADD PRIMARY KEY (`question_id`),
  ADD UNIQUE KEY `question_id` (`question_id`),
  ADD UNIQUE KEY `question_id_2` (`question_id`),
  ADD UNIQUE KEY `question_id_3` (`question_id`),
  ADD UNIQUE KEY `question_id_4` (`question_id`),
  ADD KEY `scenario_id` (`scenario_id`),
  ADD KEY `session_id` (`session_id`);

--
-- Indexes for table `qamcq`
--
ALTER TABLE `qamcq`
  ADD PRIMARY KEY (`question_id`),
  ADD UNIQUE KEY `question_id` (`question_id`),
  ADD KEY `session_id` (`session_id`),
  ADD KEY `scenario_id` (`scenario_id`);

--
-- Indexes for table `result`
--
ALTER TABLE `result`
  ADD PRIMARY KEY (`result_id`),
  ADD KEY `result_questionid_qa_fk` (`question_id`),
  ADD KEY `result_traineeid_users_fk` (`trainee_id`),
  ADD KEY `session_id` (`session_id`,`scenario_id`),
  ADD KEY `result_scenarioid_scenarios_fk` (`scenario_id`);

--
-- Indexes for table `result_mcq`
--
ALTER TABLE `result_mcq`
  ADD PRIMARY KEY (`result_id`),
  ADD KEY `question_id` (`question_id`,`session_id`,`scenario_id`,`trainee_id`),
  ADD KEY `result_mcq_sessionid_sessions_fk` (`session_id`),
  ADD KEY `result_mcq_traineeid_users_fk` (`trainee_id`);

--
-- Indexes for table `scenarios`
--
ALTER TABLE `scenarios`
  ADD PRIMARY KEY (`session_id`,`scenario_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`),
  ADD KEY `trainer_id` (`trainer_id`),
  ADD KEY `trainer_id_2` (`trainer_id`);

--
-- Indexes for table `trainee_session`
--
ALTER TABLE `trainee_session`
  ADD PRIMARY KEY (`trainee_id`,`session_id`),
  ADD KEY `trainee_session_sessionid_session_fk` (`session_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `password` (`password`),
  ADD UNIQUE KEY `empid` (`emp_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `qa`
--
ALTER TABLE `qa`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `qamcq`
--
ALTER TABLE `qamcq`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `result`
--
ALTER TABLE `result`
  MODIFY `result_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `result_mcq`
--
ALTER TABLE `result_mcq`
  MODIFY `result_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `session_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `qa`
--
ALTER TABLE `qa`
  ADD CONSTRAINT `qa_session_id_sessions_fk` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`session_id`);

--
-- Constraints for table `qamcq`
--
ALTER TABLE `qamcq`
  ADD CONSTRAINT `qamcq_session_id_sessions_fk` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`session_id`);

--
-- Constraints for table `result`
--
ALTER TABLE `result`
  ADD CONSTRAINT `result_questionid_qa_fk` FOREIGN KEY (`question_id`) REFERENCES `qa` (`question_id`),
  ADD CONSTRAINT `result_sessionid_sessions_fk` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`session_id`),
  ADD CONSTRAINT `result_traineeid_users_fk` FOREIGN KEY (`trainee_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `result_mcq`
--
ALTER TABLE `result_mcq`
  ADD CONSTRAINT `result_mcq_questionid_qa_fk` FOREIGN KEY (`question_id`) REFERENCES `qamcq` (`question_id`),
  ADD CONSTRAINT `result_mcq_sessionid_sessions_fk` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`session_id`),
  ADD CONSTRAINT `result_mcq_traineeid_users_fk` FOREIGN KEY (`trainee_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `session_trainer_users_fk` FOREIGN KEY (`trainer_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `trainee_session`
--
ALTER TABLE `trainee_session`
  ADD CONSTRAINT `trainee_session_sessionid_session_fk` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`session_id`),
  ADD CONSTRAINT `trainee_session_traineeid_users_fk` FOREIGN KEY (`trainee_id`) REFERENCES `users` (`user_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
