/*
* Modelo de dados do paciente
* 
* (C) João Carlos Pandolfi Santana - 24/11/2017
* joaopandolfi@gmail.com
*/

var Paciente = {

	//Cabecalho
	id:"",
	date_register; "",
	date_last_update: "",
	id_register: "", //Id do usuario que registrou o paciente

	//Dados paciente
	nome: "",
	nr_prontuario: 0,
	nr_mv: 0,
	data_nasc: "",
	idade: 0,
	sexo: "",
	etnia: 0, //[Branco, Negro, Pardo, Amarelo]
	tel1: "",
	tel2: "",
	tel_emerg: "",
	cel: "",
	endereco: "",
	loc: {lat:0,lng:0}

}

module.exports = Paciente;