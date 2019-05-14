-- -----------------------------------------------------
-- View `login`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `login` ;
DROP TABLE IF EXISTS `login`;
CREATE  OR REPLACE VIEW `login` AS
SELECT u.iduser , u.type_user, u.login, u.pass, p.name, p.picture FROM user AS u
INNER JOIN people as p ON u.idpeople = p.idpeople;

-- -----------------------------------------------------
-- View `full_patient`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `full_patient` ;
DROP TABLE IF EXISTS `full_patient`;
CREATE  OR REPLACE VIEW `full_patient` AS 
SELECT pa.idpatient, pa.idpeople, pa.iduser,pa.prontuary_number as nr_prontuario, pa.mv_number as nr_mv, pa.nr_same, pa.nr_sus,
 pe.name, pe.cpf, pe.picture, pe.dtnasc, pe.etiny, pe.tel1, pe.tel2, pe.tel_emerg, pe.cel, pe.address 
 FROM  patient as pa 
INNER JOIN people as pe ON pa.idpeople = pe.idpeople;
