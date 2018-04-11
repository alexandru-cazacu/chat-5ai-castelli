-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Creato il: Mar 30, 2018 alle 19:48
-- Versione del server: 10.1.19-MariaDB
-- Versione PHP: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
  `admin` tinyint(1) NOT NULL,
  `last-seen` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struttura della tabella `chats`
--

CREATE TABLE `chats` (
  `ID` int(11) NOT NULL,
  `uid` varchar(1024) NOT NULL,
  `link` varchar(1024) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `timestamp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `lastname` varchar(256) NOT NULL,
  `birthday` date NOT NULL,
  `sex` enum('Male','Female','Others') NOT NULL,
  `mail` varchar(256) NOT NULL,
  `username` varchar(256) NOT NULL,
  `password` varchar(1024) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=REDUNDANT;

--
-- Dump dei dati per la tabella `users`
--

INSERT INTO `users` (`ID`, `name`, `lastname`, `birthday`, `sex`, `mail`, `username`, `password`) VALUES
(1, 'Aldo', 'Malerba', '1997-08-10', 'Male', 'malerba.hello@gmail.com', 'aldoMalerba', '$2a$10$5juDwb.j6CesRoNhv5ZKCuxj.4BPVLYFRi.J/ppKXFvm..jMLYF0m');

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT per la tabella `messages`
--
ALTER TABLE `messages`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT per la tabella `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
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
-- Limiti per la tabella `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `FKcjt7myj1b3ebf2s4tu46rem8y` FOREIGN KEY (`ID`) REFERENCES `messages` (`ID`),
  ADD CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`ID`) REFERENCES `messages` (`id_chat`);

--
-- Limiti per la tabella `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
