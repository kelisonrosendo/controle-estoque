-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.19-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para controle-estoque
CREATE DATABASE IF NOT EXISTS `controle-estoque` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `controle-estoque`;

-- Copiando estrutura para tabela controle-estoque.estoque
CREATE TABLE IF NOT EXISTS `estoque` (
  `codigo` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(50) NOT NULL DEFAULT '',
  `codigo_produto` int(11) NOT NULL,
  `valor` double NOT NULL DEFAULT 0,
  `quantidade` int(11) NOT NULL,
  `data` datetime NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `FK_PRODUTOS` (`codigo_produto`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela controle-estoque.estoque: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `estoque` DISABLE KEYS */;
REPLACE INTO `estoque` (`codigo`, `tipo`, `codigo_produto`, `valor`, `quantidade`, `data`) VALUES
	(1, 'entrada', 2, 1299.55, 1, '2021-07-08 21:16:50'),
	(2, 'saida', 2, 1599, 3, '2021-07-08 21:17:55'),
	(3, 'saida', 3, 200, 1, '2021-07-08 21:26:37'),
	(4, 'saida', 4, 250, 1, '2021-07-08 22:02:50'),
	(5, 'saida', 5, 1399.3, 2, '2021-07-08 23:56:37');
/*!40000 ALTER TABLE `estoque` ENABLE KEYS */;

-- Copiando estrutura para tabela controle-estoque.produtos
CREATE TABLE IF NOT EXISTS `produtos` (
  `codigo` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(50) NOT NULL DEFAULT '0',
  `descricao` varchar(255) NOT NULL DEFAULT '',
  `valor` double NOT NULL DEFAULT 0,
  `quantidade` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela controle-estoque.produtos: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
REPLACE INTO `produtos` (`codigo`, `tipo`, `descricao`, `valor`, `quantidade`) VALUES
	(2, 'eletronico', 'Smartphone', 1299.55, 0),
	(3, 'movel', 'Cadeira', 200, 1),
	(4, 'movel', 'Mesa', 230, 2),
	(5, 'eletrodomestico', 'Furadeira', 1250, 3);
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
