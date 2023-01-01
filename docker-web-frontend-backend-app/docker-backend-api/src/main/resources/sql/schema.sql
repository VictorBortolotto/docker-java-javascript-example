create database docker_example_app;

use docker_example_app;

CREATE TABLE products (
  id bigint NOT NULL AUTO_INCREMENT,
  color varchar(400) DEFAULT NULL,
  price double NOT NULL,
  description varchar(400) NOT NULL,
  length double DEFAULT NULL,
  name varchar(400) NOT NULL,
  scale varchar(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
)