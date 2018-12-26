-- MySQL Script generated by MySQL Workbench
-- Sex 14 Set 2018 15:40:17 -03
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `hospital`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospital` (
  `idhospital` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  PRIMARY KEY (`idhospital`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `usuario` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  `username` VARCHAR(45) NULL,
  `password` VARCHAR(100) NULL,
  PRIMARY KEY (`idusuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `paciente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `paciente` (
  `idpaciente` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `dtEntrance` DATETIME NULL,
  `cod` VARCHAR(45) NULL,
  PRIMARY KEY (`idpaciente`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `uti`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `uti` (
  `iduti` INT NOT NULL AUTO_INCREMENT,
  `idhospital` INT NULL COMMENT '	',
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`iduti`),
  INDEX `fk_uti_1_idx` (`idhospital` ASC),
  CONSTRAINT `fk_uti_1`
    FOREIGN KEY (`idhospital`)
    REFERENCES `hospital` (`idhospital`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `leito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `leito` (
  `idleito` INT NOT NULL AUTO_INCREMENT,
  `idhospital` INT NULL,
  `iduti` INT NULL,
  `number` VARCHAR(45) NULL,
  `free` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`idleito`),
  INDEX `fk_leito_1_idx` (`idhospital` ASC),
  INDEX `fk_leito_2_idx` (`iduti` ASC),
  CONSTRAINT `fk_leito_1`
    FOREIGN KEY (`idhospital`)
    REFERENCES `hospital` (`idhospital`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_leito_2`
    FOREIGN KEY (`iduti`)
    REFERENCES `uti` (`iduti`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intervencoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `intervencoes` (
  `idintervencoes` INT NOT NULL AUTO_INCREMENT,
  `idpaciente` INT NULL,
  `idleito` INT NULL,
  `dado` TEXT NULL,
  `dtAlteracao` DATETIME NULL,
  PRIMARY KEY (`idintervencoes`),
  INDEX `fk_intervencoes_1_idx` (`idpaciente` ASC),
  INDEX `fk_intervencoes_2_idx` (`idleito` ASC),
  CONSTRAINT `fk_intervencoes_1`
    FOREIGN KEY (`idpaciente`)
    REFERENCES `paciente` (`idpaciente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_intervencoes_2`
    FOREIGN KEY (`idleito`)
    REFERENCES `leito` (`idleito`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hospital__usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospital__usuario` (
  `idhospital__usuario` INT NOT NULL AUTO_INCREMENT,
  `idusuario` INT NULL,
  `idhospital` INT NULL,
  PRIMARY KEY (`idhospital__usuario`),
  INDEX `fk_hospital__usuario_1_idx` (`idhospital` ASC),
  INDEX `fk_hospital__usuario_2_idx` (`idusuario` ASC),
  CONSTRAINT `fk_hospital__usuario_1`
    FOREIGN KEY (`idhospital`)
    REFERENCES `hospital` (`idhospital`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_hospital__usuario_2`
    FOREIGN KEY (`idusuario`)
    REFERENCES `usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `leito__paciente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `leito__paciente` (
  `idleito__paciente` INT NOT NULL AUTO_INCREMENT,
  `idleito` INT NULL,
  `idpaciente` INT NULL,
  `ocupado` TINYINT NULL,
  `dtOcupacao` DATETIME NULL,
  `dtLiberacao` DATETIME NULL,
  PRIMARY KEY (`idleito__paciente`),
  INDEX `fk_leito__paciente_1_idx` (`idleito` ASC),
  INDEX `fk_leito__paciente_2_idx` (`idpaciente` ASC),
  CONSTRAINT `fk_leito__paciente_1`
    FOREIGN KEY (`idleito`)
    REFERENCES `leito` (`idleito`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_leito__paciente_2`
    FOREIGN KEY (`idpaciente`)
    REFERENCES `paciente` (`idpaciente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
