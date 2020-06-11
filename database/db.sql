CREATE DATABASE db_InstitucionEduc;

use db_InstitucionEduc;

CREATE  TABLE Alumnos(
    id INT (11) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    numControl VARCHAR(20) NOT NULL,
    semestre VARCHAR(10) NOT NULL,
    carrera VARCHAR(100) NOT NULL
);

ALTER TABLE Alumnos 
ADD primary key (id);

ALTER  TABLE  Alumnos
MODIFY id int (11) not null auto_increment, auto_increment =2;

describe Alumnos;

CREATE TABLE Materias (
id int(11) NOT  NULL,
cvlMaestro varchar (150) not null,
cvlMateria varchar (255) not null,
NombreMateria varchar (30) ,
Grupo varchar (30),
DiaHorario datetime,
Aula varchar (30)
);


alter TABLE Materias ADD primary key(id);

alter TABLE Materias modify id int(11) not null auto_increment, auto_increment =2;

describe Materias;