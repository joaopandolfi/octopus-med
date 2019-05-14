/*
* Modelo base de consulta
* 
* (C) João Carlos Pandolfi Santana - 12/11/2017
* joaopandolfi@gmail.com
*/

var Base_consult = {

	//Cabecalho
	id: "",
	id_user: "",
	id_pacient: "",
	id_anamnese: "",
	date: "",
	timestamp: "",
	ip_user: "",
	type_user: "",

	//Dados medicos
	data:{},

	/*
	* Texto livre
	* Usado para input no MV e para montagem legivel dos dados ao medico
	*/
	free_text: "",

	//Arquivos
	files: [{id:"",title:"", type:""}]
}

module.exports = Base_consult;