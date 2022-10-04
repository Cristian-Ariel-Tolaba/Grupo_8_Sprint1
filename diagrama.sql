-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema `VinoYSeFue`
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema `VinoYSeFue`
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `VinoYSeFue` DEFAULT CHARACTER SET utf8 ;
USE `VinoYSeFue` ;

-- -----------------------------------------------------
-- Table `VinoYSeFue`.`Products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `VinoYSeFue`.`Products` (
  `idProducts` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `price` DECIMAL NOT NULL,
  `discount` DECIMAL NOT NULL,
  `description` TEXT(300) NOT NULL,
  `images` INT NOT NULL,
  `category` INT NOT NULL,
  `payment_methods` INT NOT NULL,
  PRIMARY KEY (`idProducts`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `VinoYSeFue`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `VinoYSeFue`.`Users` (
  `idUsers` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `surname` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `rol` INT NOT NULL,
  `image` INT NULL,
  PRIMARY KEY (`idUsers`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `VinoYSeFue`.`Rols`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `VinoYSeFue`.`Rols` (
  `idRols` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idRols`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `VinoYSeFue`.`Categorys`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `VinoYSeFue`.`Categorys` (
  `idCategorys` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCategorys`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `VinoYSeFue`.`Images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `VinoYSeFue`.`Images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` TEXT(300) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `VinoYSeFue`.`Images-Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `VinoYSeFue`.`Images-Users` (
  `idImages-Users` INT NOT NULL,
  `name` TEXT(300) NOT NULL,
  PRIMARY KEY (`idImages-Users`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `VinoYSeFue`.`Cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `VinoYSeFue`.`Cart` (
  `idtable1` INT NOT NULL AUTO_INCREMENT,
  `products` INT NOT NULL,
  `user` INT NOT NULL,
  PRIMARY KEY (`idtable1`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`methods`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `VinoYSeFue`.`methods` (
  `idmethods` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idmethods`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
