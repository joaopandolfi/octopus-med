/*
* Modelo de anamnese
* 
* (C) João Carlos Pandolfi Santana - 12/11/2017
* joaopandolfi@gmail.com
*/
var Base = require( './base_consult.js' );

//Herança
var Anamnese = Object.create(Base);

Anamnese.data = {

	//Dados medicos
	qp: "",
	hda: "",
	hp: "",
	hf: "",
}

module.exports = Anamnese;