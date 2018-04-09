-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Apr 09, 2018 alle 22:18
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
(41, 'b9ca3ec9-a520-4ecf-8611-a6ebc1d82c9e', 'b9ca3ec9-a520-4ecf-8611-a6ebc1d82c9e', 'Test serio 1');

-- --------------------------------------------------------

--
-- Struttura della tabella `chat_user`
--

CREATE TABLE `chat_user` (
  `ID` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_chat` int(11) NOT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `chat_user`
--

INSERT INTO `chat_user` (`ID`, `id_user`, `id_chat`, `admin`) VALUES
(103, 1, 41, 0),
(104, 13, 41, 0),
(105, 14, 41, 0),
(106, 16, 41, 0),
(107, 11, 41, 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `messages`
--

CREATE TABLE `messages` (
  `ID` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_chat` int(11) NOT NULL,
  `content` text NOT NULL,
  `type` enum('Text','Image','Video') NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(11, 'Alexandru', 'Cazacu', '1998-06-08', 'Male', 'alexandru.cazacu@o.it', 'alex', '$2a$10$CDPXnQYthWCLblJGkJD/..qceH8Iv.JaBiPJd0cr7WH8YelVmFQ8a', NULL),
(13, 'Antonio', 'Barensfeld', '1998-06-08', 'Male', 'antonio.barensfeld@gmail.com', 'anto', '$2a$10$GJNaG8HiDAv36N438e.ZeexD4zjck1ZODVPEOYrk2M0SEMaIlalYC', NULL),
(14, 'Aquino', 'Visso', '1998-06-08', 'Male', 'aquino.visso@gmail.com', 'aqui', '$2a$10$LLXhWxEH1xd59O60eZqSe.JGZdgkYqkJoJ8GR9GGXNrUC3rfVZtni', NULL),
(15, 'Federino', 'Panarese', '1998-06-08', 'Male', 'federico.panarese@gmail.com', 'fede', '$2a$10$cefvfQOmFhTxfP4rh1i33.kwBi5N.QFpJqf4vmn6/6lEqZQo7L0Gu', NULL),
(16, 'Silger', 'Gacaj', '1998-06-08', 'Male', 'silger.gacaj@gmail.com', 'silg', '$2a$10$FDsYfTPznEFEEYX4qG2/9e2uvYpnFW5.PVGG3jvMWSAU2tbZeh0/O', NULL);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`ID`);

--
-- Indici per le tabelle `chat_user`
--
ALTER TABLE `chat_user`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_chat` (`id_chat`);

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
-- AUTO_INCREMENT per la tabella `chats`
--
ALTER TABLE `chats`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT per la tabella `chat_user`
--
ALTER TABLE `chat_user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT per la tabella `messages`
--
ALTER TABLE `messages`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `chat_user`
--
ALTER TABLE `chat_user`
  ADD CONSTRAINT `chat_user_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `chat_user_ibfk_3` FOREIGN KEY (`id_chat`) REFERENCES `chats` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`id_chat`) REFERENCES `chats` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
