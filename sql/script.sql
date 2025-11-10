-- Caso ocorra algum problema no login, executar o código abaixo, para arrumar a senha do usuário root:
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

-- Esse script vale para o MySQL 8.x. Se seu MySQL for 5.x, precisa executar essa linha comentada:
-- CREATE DATABASE IF NOT EXISTS simplex;
CREATE DATABASE IF NOT EXISTS blog DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE blog;

CREATE TABLE post (
  id int NOT NULL AUTO_INCREMENT,
  titulo varchar(100) NOT NULL,
  tags varchar(100) NOT NULL,
  autor varchar(100) NOT NULL,
  data datetime NOT NULL,
  descricao text NOT NULL,
  conteudo mediumtext NOT NULL,
  PRIMARY KEY (id)
);
