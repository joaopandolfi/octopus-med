/*
* Controlador da preparação dos formulários
* 
* (C) João Carlos Pandolfi Santana - 25/01/2018
*/

// Database manager
//var Dao_prepare = require('../../model/dao/dao_prepare.js');

// Models
var Anamnese = require("../../model/anamnese.js")
var Predictors = require("../../model/predictors.js")
var Prevention = require("../../model/prevention.js")
var Interventions = require("../../model/interventions.js")
var Medicines = require("../../model/medicines.js")
var Evidences = require("../../model/evidences.js")
var Exams = require("../../model/physical_exam.js")

//Base class
var Base = require( '../generic.js' );
var Prepare = Object.create(Base);

//TODO: Refatorar para ficar generico e buscar do Mongo
Prepare.types = {
	cardio:{
		anamnese: Anamnese.types,
		evidences: Evidences.types,
		interventions: Interventions.types,
		medicines: Medicines.types,
		predictors: Predictors.type,
		prevention: Prevention.types,
		exams: Exams.types
	}
}


/*
* Funções genéricas
*/

Prepare.response = (res,data)=>{
	res.send(JSON.stringify(Prepare.format_response(data)));
}

/*
* Get Session data
* @Get /{ambulatory}/{session}/
**/
Prepare.session = (req,res)=>{
	Prepare.get_prepare_data(req);
	try{
		var type = Prepare.types[Prepare.url_data_prepare.ambulatory][Prepare.url_data_prepare.session]
	}catch(e){
		type = Prepare.error_message(404,"Route error")
	}
	Prepare.response(res,type)
}

/*
* Get Ambulatory data
**/
Prepare.ambulatory = (req,res)=>{
	Prepare.get_prepare_data(req);
	var ambulatoryes = Object.getKeys(Prepare.types)
	var result = {}
	ambulatoryes.forEach(
		(amb)=>{
			result[amb] = Object.getKeys(Prepare.types[amb])
		}
	)

	Prepare.response(res,result)
}

module.exports = Prepare;
