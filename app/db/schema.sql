-- Drops the database if it exists currently --
DROP DATABASE IF EXISTS pet_speak_health_db;
-- Creates the database --
CREATE DATABASE pet_speak_health_db;
--uses specified database--
use pet_speak_health_db;
-- create the client table --
CREATE TABLE Client (
  id INT AUTO_INCREMENT PRIMARY KEY,
  last_name VARCHAR(30) NOT NULL,
  first_name varchar(30) NOT NULL,
  address VARCHAR(60) NOT NULL,
  city VARCHAR(40) NOT NULL,
  state VARCHAR(20) NOT NULL,
  zipcode INT(10) NOT NULL,
  cell_phone INT(10) NULL,
  house_phone INT(10) NULL,
  work_phone INT(10) NULL,
  email VARCHAR(50) NULL
);
-- create the pets table --
CREATE TABLE Pets (
  pet_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  animal_type VARCHAR(30) NOT NULL,
  birthdate DATE NOT NULL,
  breed VARCHAR(40) NOT NULL,
  color VARCHAR(100) NULL,
  client_id INT NOT NULL,
  FOREIGN KEY (client_id) REFERENCES Client(id)
);
-- create the table that hold each pet's medical records--
CREATE TABLE Medical_Records (
  pet_id INT NOT NULL,
  vaccine_records ENUM(
    'Rabies',
    'DAPP',
    'Bordetella',
    'Leptospirosis',
    'Lyme',
    'Influenza'
  ),
  medication_list MEDIUMTEXT NULL,
  physical_exam MEDIUMTEXT NULL,
  client_education MEDIUMTEXT NULL,
  FOREIGN KEY (pet_id) REFERENCES Pets(pet_id)
);