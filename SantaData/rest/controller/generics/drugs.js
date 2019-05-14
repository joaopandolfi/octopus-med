/*
* Classe de controle dos medicamentos
* 
* (C) João Carlos Pandolfi Santana - 19/01/2018
* joaopandolfi@gmail.com
*/

// Database manager
var Dao_drugs = require('../../model/dao/drugs.js');

//Creating Class
var Generic = require( '../generic' );
var Drugs = Object.create(Generic);

//TODO: ENCAPSULE THAT SHIT PLEASE

Drugs.add = function(req, res){
	var var_req = req.body;
	var_req = Generic.decode_data(var_req)
	
	//Check authentication
	if(!Generic.check_requisition(req)){
		res.send(Generic.error_message(500,"Bad request"));
		return
	}

	data = []

	Drugs.generic_dao_request(res,data, Dao_Drugs.new)
}


/*
* Search drugs by idexam
*/
Drugs.get = function(req, res){
	var var_req = req.body;
	var_req = Generic.decode_data(var_req)
	
	//Check authentication
	if(!Generic.check_requisition(req)){
		res.send(Generic.error_message(500,"Bad request"));
		return
	}

	data = []

	Drugs.generic_dao_request(res,data, Dao_Drugs.get)
}

/*
* Search drugs by idpatient
*/
Drugs.search = function(req, res){
	var var_req = req.body;
	var_req = Generic.decode_data(var_req)

	//Check authentication
	if(!Generic.check_requisition(req)){
		res.send(Generic.error_message(500,"Bad request"));
		return
	}

	data = []

	Drugs.generic_dao_request(res,data, Dao_Drugs.search)
}


Drugs.update = function(req, res){
	var var_req = req.body;
	var_req = Generic.decode_data(var_req)

	//Check authentication
	if(!Generic.check_requisition(req)){
		res.send(Generic.error_message(500,"Bad request"));
		return
	}

	data = []

	Drugs.generic_dao_request(res,data, Dao_Drugs.update)
}

module.exports = Drugs