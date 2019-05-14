/*
* Classe de controle dos exames fisicos
* 
* (C) João Carlos Pandolfi Santana - 19/01/2018
* joaopandolfi@gmail.com
*/

// Database manager
var Dao_physical_exam = require('../../model/dao/dao_physical_exam.js');

//Creating Class
var Generic = require( '../generic' );
var Physical_exam = Object.create(Generic);

//TODO: ENCAPSULE THAT SHIT PLEASE

Physical_exam.add = function(req, res){
	var var_req = req.body;
	var_req = Generic.decode_data(var_req)
	
	//Check authentication
	if(!Generic.check_requisition(req)){
		res.send(Generic.error_message(500,"Bad request"));
		return
	}

	data = []

	Physical_exam.generic_dao_request(res,data, Dao_physical_exam.new)
}


/*
* Search physical exams by idexam
*/
Physical_exam.get = function(req, res){
	var var_req = req.body;
	var_req = Generic.decode_data(var_req)
	
	//Check authentication
	if(!Generic.check_requisition(req)){
		res.send(Generic.error_message(500,"Bad request"));
		return
	}

	data = []

	Physical_exam.generic_dao_request(res,data, Dao_physical_exam.get)
}

/*
* Search physical exams by idpatient
*/
Physical_exam.search = function(req, res){
	var var_req = req.body;
	var_req = Generic.decode_data(var_req)

	//Check authentication
	if(!Generic.check_requisition(req)){
		res.send(Generic.error_message(500,"Bad request"));
		return
	}

	data = []

	Physical_exam.generic_dao_request(res,data, Dao_physical_exam.search)
}


Physical_exam.update = function(req, res){
	var var_req = req.body;
	var_req = Generic.decode_data(var_req)

	//Check authentication
	if(!Generic.check_requisition(req)){
		res.send(Generic.error_message(500,"Bad request"));
		return
	}

	data = []

	Physical_exam.generic_dao_request(res,data, Dao_physical_exam.update)
}

module.exports = Physical_exam