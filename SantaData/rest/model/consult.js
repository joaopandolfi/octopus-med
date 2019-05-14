/*
* Modelo de consultas
* 
* (C) João Carlos Pandolfi Santana - 20/02/2018
* joaopandolfi@gmail.com
*/

var Consult = {
	model: {

	},
	
	mapData: function(data){
		return data;
	},

	timelineMapData: function(vars){
		return {
			idpatient: vars.data.idpatient,
			//TODO: Organizar esses dados e enviar para o pessoal do Front
			//Pagination - POST
			// Numero pagina: 1
			// Gap: 15
			pagination: vars.data.pagination
		}
	}
}

module.exports = Consult;