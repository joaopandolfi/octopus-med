/*
* Classe de controle dos patientes
* 
* (C) João Carlos Pandolfi Santana - 18/01/2018
*/

// Database manager
var Dao_patient = require('../../model/dao/dao_patient.js');
var Model_patient = require('../../model/patient.js');

//Creating Class
var Generic = require( '../generic' );
var Patient = Object.create(Generic);

Patient.add = function(req, res){

	var var_req = req.body;
	var_req = Generic.decode_data(var_req)


	//Check authentication
	if(!Patient.check_requisition(req)){
		res.send(Patient.error_message(500,"Bad request"));
		return
	}

	//Getting and preparing data
	data = Model_patient.mapData(var_req)

	Patient.generic_dao_request(res,data, Dao_patient.new)
}


Patient.search = function(req, res){
	var var_req = req.body;
	var_req = Generic.decode_data(var_req)

	//Check authentication
	if(!Patient.check_requisition(req) || var_req.name == null){
		res.send(Patient.error_message(500,"Bad request"));
		return
	}

	//Getting and preparing data
	regex = "%{data}%"
	data = [regex.replace("{data}",var_req.name)]

	Patient.generic_dao_request(res,data, Dao_patient.search)
}

Patient.get = function(req, res){
	var var_req = req.body;
	var_req = Generic.decode_data(var_req)

	//Check authentication
	if(!Patient.check_requisition(req)){
		res.send(Patient.error_message(500,"Bad request"));
		return
	}

	//Getting and preparing data
	data = [Patient.url_data.q_id]

	Patient.generic_dao_request(res,data, Dao_patient.get)
}


Patient.all = function(req, res){
	var var_req = req.body;
	var_req = Generic.decode_data(var_req)

	//Check authentication
	if(!Patient.check_requisition(req)){
		res.send(Patient.error_message(500,"Bad request"));
		return
	}

	//Getting and preparing data
	data = []

	Patient.generic_dao_request(res,data, Dao_patient.all)
}

module.exports = Patient;