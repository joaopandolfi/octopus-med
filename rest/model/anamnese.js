/*
* Modelo de anamnese
* 
* (C) João Carlos Pandolfi Santana - 12/11/2017
* joaopandolfi@gmail.com
*/

var Anamnese = {

	//Cabecalho
	id_user: "",
	id_pacient: "",
	id_anamnese: "",
	date: "",
	timestamp: "",
	ip_user: "",
	type_user: "",

	//Dados medicos
	hip_diagnostico: "",
	hist_paciente: "",
	
	/*
	* Texto livre
	* Usado para input no MV e para montagem legivel dos dados ao medico
	*/
	free_text: "",

	//Arquivos
	files: [{id:"",title:"", type:""}]
}

module.exports = Anamnese;