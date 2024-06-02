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

DROP TABLE IF EXISTS `chats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data` datetime NOT NULL,
  `enviado_por` int NOT NULL,
  `enviado_para` int NOT NULL,
  `agendamento_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `enviado_por` (`enviado_por`),
  KEY `enviado_para` (`enviado_para`),
  KEY `agendamento_id` (`agendamento_id`),
  CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`enviado_por`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `chats_ibfk_2` FOREIGN KEY (`enviado_para`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `chats_ibfk_3` FOREIGN KEY (`agendamento_id`) REFERENCES `agendamentos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuario_medicamentos`
--

DROP TABLE IF EXISTS `usuario_medicamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_medicamentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `paciente_id` int NOT NULL,
  `descricao` text,
  `doutor_id` int NOT NULL,
  `data_limite` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `paciente_id` (`paciente_id`),
  KEY `doutor_id` (`doutor_id`),
  CONSTRAINT `usuario_medicamentos_ibfk_1` FOREIGN KEY (`paciente_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `usuario_medicamentos_ibfk_2` FOREIGN KEY (`doutor_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-01 16:10:43
