<h1 align="center">Aplicação de cadastro de produto para exemplificação do funcionamento de containers Docker</h1>
<br></br>
<p align="justify" style="font-size: 20px;">
    Este projeto é uma exemplificação que tem como objetivo mostrar o funcionamento do Docker e seus containers por meio de um artigo no Medium, onde serão executadas dentro de containers as aplicações de banco MySQL, backend em Java-Spring e frontend em JavaScript, HTML e CSS após isso será possível realizar o cadastro de um produto em uma aplicação e executar as operações básicas de um CRUD (Create, Read, Update and Delete) através dos métodos HTTP (POST, GET, PATCH, PUT, DELETE).
</p>
<br></br>
<hr></hr>

<h2 align="center" style="border: none">LICENÇAS</h2>

[![License Badge](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/VictorBortolotto/docker-java-javascript-example/blob/master/LICENSE)

<br></br>
<hr></hr>

<h2 align="center" style="border: none">
TECNOLOGIAS UTILIZADAS
</h2>

<ul style="list-style: none; padding: 0px; font-size: 20px">
    <li>JAVA</li>
    <li>Spring Boot</li>
    <li>MySQL</li>
    <li>JavaScript</li>
    <li>HTML</li>
    <li>CSS</li>
    <li>Docker</li>
</ul>

<br></br>
<hr></hr>

<br></br>

<h2 align="center" style="border: none">
COMANDOS ÚTEIS DOCKER
</h2>

```bash

Comandos úteis para o docker

#Criar uma imagem
docker build -t <nome-da-imagem> .

#Listando imagens existentes
docker images

#Criação de network
docker network create <nome-network>

#Removendo uma network
docker network rm <nome-da-network>

#Listar networks
docker network ls

#Verificar se um ou mais containers estão rodando
docker ps

#Parar um container
docker stop <nome-do-container> ou <id-container>

#Reiniciar um container
docker start <nome-do-container> ou <id-container>

#Verificar logs de containers rodando em background
docker logs <nome-container>

#Acessar um outro bash 
docker exec -it <nome-container> bash

#Limpar terminal (Linux)
clear

#Verficar últimos comandos utilizados (Linux)
history

```

<br></br>

<hr></hr>

<br></br>

<h2 align="center" style="border: none">
RODANDO DOCKER-EXAMPLE-APP
</h2>

```bash
Rodando docker-example-app

#Acessar a pasta
cd docker-example-app

#Instalar dependências do pom.xml
mvn clean install -u

#Criar arquivo jar
mvnw package && java -jar target/docker-example-app.jar

#Criando imagem Docker
docker build -t docker-example-app

#Rodando docker
docker run -p 8080:8080 docker-exmaple-app

#Rodar apenas com Spring-Boot sem Docker
mvn spring-boot:run

#Rota de acesso
http://localhost:8080/docker
```

<br></br>

<hr></hr>

<h2 align="center" style="border: none">
RODANDO DOCKER-WEB-FRONTEND-BACKEND-APP
</h2>

<br></br>

<h2 align="left">
CRIANDO E RODANDO O BANCO DE DADOS MYSQL
</h2>

```bash
#Criando a network
docker network create docker-network

#Comando para criar, configurar e executar imagem do banco (Pode se executar sem o -d)
docker container run --name mysqldb --network docker-network -e MYSQL_USER=mysql_admin -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_PASSWORD=123456 -e MYSQL_DATABASE=docker_example_app -d mysql:8.0

#Verificar logs (Caso tenha ccriado o banco utilizando o -d)
docker logs mysqldb

#Acessar bash para depois acessar o banco pelo mysql
docker exec -it mysqldb bash

Comandos específicos do banco:

#Acessar o banco
mysql -u mysql_admin -p 
senha: 123456

#Verificar databases
show databases;

#Acessar databases
use docker_example_app;

#Verificar tabelas
show tables;

#Comando select 
select * from products;
```
<br></br>

<h2 align="left" style="border: none">
RODANDO O BACKEND
</h2>

```bash
#Acessar a pasta
cd docker-web-frontend-backend-app & cd docker-backend-api

#Instalar dependências do pom.xml
mvn clean install -u

#Criar arquivo jar
mvnw package && java -jar target/docker-backend-api.jar

#Criando imagem Docker
docker build -t docker-backend .

#Rodando docker
docker run --name docker-backend-container --network docker-network -p 8080:8080 docker-exmaple-app

#Rodar apenas com Spring-Boot sem Docker (lembrar de adicionar localhost:3306 no application.properties na pasta resources)
mvn spring-boot:run
```

<br></br>

<h2 align="left" style="border: none">
RODANDO A FRONTEND
</h2>

```bash
#Acessar a pasta
cd docker-web-frontend-backend-app & cd docker-frontend

#Instalar dependências
npm i

#Criando imagem Docker
docker build -t docker-frontend .

#Rodando docker
docker run --name docker-frontend-container --network docker-network -p 3000:3000 docker-frontend

#Rodar apenas sem Docker 
cd src & node index.js

#Rota de acesso
http://localhost:3000/docker
```

<hr></hr>

</br> 
<h2 style="border: none">Victor Augusto Campos Bortolotto</h2>
<img style="width: 100px; height: 100px" src="https://avatars.githubusercontent.com/u/50971139?v=4" alt=""/>

</br>

[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/victor-augusto-campos-bortolotto/)](https://www.linkedin.com/in/victor-augusto-campos-bortolotto/) 
[![Gmail Badge](https://img.shields.io/badge/-victorcamposbortolottowork@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:victorcamposbortolottowork@gmail.com)](mailto:victorcamposbortolottowork@gmail.com)

