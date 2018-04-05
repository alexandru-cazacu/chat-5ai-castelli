-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Apr 05, 2018 alle 22:18
-- Versione del server: 10.1.28-MariaDB
-- Versione PHP: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chat-project`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `chat-user`
--

CREATE TABLE `chat-user` (
  `ID` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_chat` int(11) NOT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struttura della tabella `chats`
--

CREATE TABLE `chats` (
  `ID` int(11) NOT NULL,
  `uid` varchar(1024) NOT NULL,
  `link` varchar(1024) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `chats`
--

INSERT INTO `chats` (`ID`, `uid`, `link`, `name`) VALUES
(2, '12347898', 'awesomeLink', 'Super cool chat'),
(5, 'a550fa04-4318-4712-bb2a-8559f671daf3', 'awesomeLink', 'Super cool chat'),
(6, '57cb9057-28b2-4b70-a4ca-98b235cbdb9a', '57cb9057-28b2-4b70-a4ca-98b235cbdb9a', 'Super cool chat');

-- --------------------------------------------------------

--
-- Struttura della tabella `messages`
--

CREATE TABLE `messages` (
  `ID` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_chat` int(11) NOT NULL,
  `content` text NOT NULL,
  `type` enum('Text','Image','Video') NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `messages`
--

INSERT INTO `messages` (`ID`, `id_user`, `id_chat`, `content`, `type`, `timestamp`) VALUES
(1, 11, 2, 'Hello', 'Text', '2018-03-31 22:00:00');

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `surname` varchar(256) NOT NULL,
  `birthday` date NOT NULL,
  `sex` enum('Male','Female','Other') NOT NULL,
  `mail` varchar(256) NOT NULL,
  `username` varchar(256) NOT NULL,
  `password` varchar(1024) NOT NULL,
  `last_seen` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=REDUNDANT;

--
-- Dump dei dati per la tabella `users`
--

INSERT INTO `users` (`ID`, `name`, `surname`, `birthday`, `sex`, `mail`, `username`, `password`, `last_seen`) VALUES
(1, 'Aldo', 'Malerba', '1997-08-10', 'Male', 'malerba.hello@gmail.com', 'aldoMalerba', '$2a$10$5juDwb.j6CesRoNhv5ZKCuxj.4BPVLYFRi.J/ppKXFvm..jMLYF0m', NULL),
(8, 'Name', 'Surname', '1997-08-10', 'Male', 'mail@host.com', 'Test', '$2a$10$bKN1ZSU.olycuLmEBDyGXOkDyKe72OhXG7JxPx6uoNLz9izV5jeXm', NULL),
(10, 'Name', 'Surname', '1997-08-10', 'Male', 'mail@host.com', 'Test2', 'SuperSecrety', NULL),
(11, 'Alexandru', 'Cazacu', '1998-06-08', 'Male', 'alexandru.cazacu.9889@gmail.com', 'alex', 'alex', NULL),
(13, 'Antonio', 'Barensfeld', '1998-06-08', 'Male', 'antonio.barensfeld@gmail.com', 'anto', '$2a$10$GJNaG8HiDAv36N438e.ZeexD4zjck1ZODVPEOYrk2M0SEMaIlalYC', NULL),
(14, 'Aquino', 'Visso', '1998-06-08', 'Male', 'aquino.visso@gmail.com', 'aqui', '$2a$10$LLXhWxEH1xd59O60eZqSe.JGZdgkYqkJoJ8GR9GGXNrUC3rfVZtni', NULL),
(15, 'Federino', 'Panarese', '1998-06-08', 'Male', 'federico.panarese@gmail.com', 'fede', '$2a$10$cefvfQOmFhTxfP4rh1i33.kwBi5N.QFpJqf4vmn6/6lEqZQo7L0Gu', NULL),
(16, 'Silger', 'Gacaj', '1998-06-08', 'Male', 'silger.gacaj@gmail.com', 'silg', '$2a$10$FDsYfTPznEFEEYX4qG2/9e2uvYpnFW5.PVGG3jvMWSAU2tbZeh0/O', NULL);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `chat-user`
--
ALTER TABLE `chat-user`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_chat` (`id_chat`);

--
-- Indici per le tabelle `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`ID`);

--
-- Indici per le tabelle `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_chat` (`id_chat`);

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `chat-user`
--
ALTER TABLE `chat-user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `chats`
--
ALTER TABLE `chats`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT per la tabella `messages`
--
ALTER TABLE `messages`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT per la tabella `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `chat-user`
--
ALTER TABLE `chat-user`
  ADD CONSTRAINT `chat-user_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`ID`),
  ADD CONSTRAINT `chat-user_ibfk_2` FOREIGN KEY (`id_chat`) REFERENCES `chats` (`ID`);

--
-- Limiti per la tabella `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`ID`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`id_chat`) REFERENCES `chats` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
