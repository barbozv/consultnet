  DROP DATABASE IF EXISTS consultnet;

  CREATE DATABASE IF NOT EXISTS consultnet;

  USE consultnet;

DROP TABLE IF EXISTS `pacientes`;

CREATE TABLE `pacientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `data_nascimento` date DEFAULT NULL,
  `cpf` varchar(14) DEFAULT NULL, 
   PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `medicos`;

CREATE TABLE `medicos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `crm` varchar(14) DEFAULT NULL,
   PRIMARY KEY (`id`)
); 



DROP TABLE IF EXISTS `agendamentos`;
CREATE TABLE `agendamentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data` datetime NOT NULL,
  `pacientes_nome` varchar(100) NOT NULL,
  `medicos_nome` varchar(100) NOT NULL,
  `motivo` text,
  PRIMARY KEY (`id`),
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `atendimentos`;

CREATE TABLE `atendimentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pacientes_nome` varchar(100) NOT NULL,
  `medicos_nome` varchar(100) NOT NULL,
  `data` datetime NOT NULL,
  `diagnostico` text,
  `tratamento` text,
  PRIMARY KEY (`id`)
);