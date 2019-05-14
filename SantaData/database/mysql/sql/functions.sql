-- -----------------------------------------------------
-- Registra usuario e retorna o ID
-- @NOTE: Disable foreign key checks
-- @receives name,email,login,pass,hash,type_user
-- @returns id_user
-- -----------------------------------------------------
DROP FUNCTION IF EXISTS new_user;

DELIMITER //
CREATE FUNCTION new_user(name_p VARCHAR(45), 
				email_p VARCHAR(45), 
        login_p VARCHAR(45), 
				pass_p VARCHAR(45), 
				hash_p VARCHAR(45),
        type_user VARCHAR(45)) 

RETURNS INT
  BEGIN

  SET FOREIGN_KEY_CHECKS=0;
  INSERT INTO people (name) VALUES(
    name_p
  );
  
  SELECT LAST_INSERT_ID() INTO @id_people;

  INSERT INTO user (idpeople,email,login,pass,hash,type_user) VALUES(
    @id_people,
    email_p,
    login_p,
    pass_p,
    hash_p,
    type_user
  );

  SELECT LAST_INSERT_ID() INTO @id_user;

  RETURN @id_user;
  END //
DELIMITER ;


-- -----------------------------------------------------
-- Registra Paciente e retorna o ID
-- @NOTE: Disable foreign key checks
-- @returns id_patient
-- -----------------------------------------------------
DROP FUNCTION IF EXISTS new_patient;

DELIMITER //
CREATE FUNCTION new_patient(iduser_p VARCHAR(45), 
        nome_p VARCHAR(45), 
        cpf_p VARCHAR(20), 
        rg_p VARCHAR(20), 
        nr_prontuario_p INT, 
        nr_mv_p INT, 
        data_nasc_p DATE,
        idade_p INT,
        etnia_p CHAR(1),
        sexo_p CHAR(1),
        tel1_p VARCHAR(20),
        tel2_p VARCHAR(20),
        tel_emerg_p VARCHAR(20),
        cel_p VARCHAR(20),
        endereco_p TEXT,
        nr_same_p INT,
        nr_sus_p INT) 

RETURNS INT
  BEGIN

  SET FOREIGN_KEY_CHECKS=0;
  INSERT INTO people (name,cpf,rg,dtnasc,tel1,tel2,tel_emerg,cel,address,etiny,sexo) VALUES(
    nome_p,
    cpf_p,
    rg_p,
    data_nasc_p,
    tel1_p,
    tel2_p,
    tel_emerg_p,
    cel_p,
    endereco_p,
    etnia_p,
    sexo_p
  );
  
  SELECT LAST_INSERT_ID() INTO @id_people;

  INSERT INTO patient (idpeople,iduser,prontuary_number,mv_number,nr_same,nr_sus) VALUES(
    @id_people,
    iduser_p,
    nr_prontuario_p,
    nr_mv_p,
    nr_same_p,
    nr_sus_p
  );

  SELECT LAST_INSERT_ID() INTO @id_patient;

  RETURN @id_patient;
  END //
DELIMITER ;
