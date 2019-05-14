/*
* Classe de controle das consultas
* 
* (C) João Carlos Pandolfi Santana - 20/02/2018
* joaopandolfi@gmail.com
*/

// Database manager
var Dao_consult = require('../../model/dao/dao_consult.js');
var Model_consult = require('../../model/consult.js');

//Creating Class
var Generic = require( '../generic' );
var Consult = Object.create(Generic);

Consult.add = function(req, res){
	var result = Generic.prepare_request(req,res);

	//Getting and preparing data
	var data = Model_consult.mapData(result.data)

	Consult.generic_dao_request(res,data, Dao_consult.new)
}

Consult.get = function(req,res){
	var result = Generic.prepare_request(req,res);

	//Getting and preparing data
	var data = {_cid:Generic.url_data.q_id}

	Consult.generic_dao_request(res,data, Dao_consult.get)
}

/*
* Recupera as consultas ordenadas pelo tempo de um único paciente
*/
Consult.timeline = function(req,res){
	var result = Generic.prepare_request(req,res);

	//Getting and preparing data
	//ID do paciente
	data = Model_consult.timelineMapData(result.data)

	Consult.generic_dao_request(res,data, Dao_consult.get)
}

/*
* Recupera todos as consultas do banco
*/
Consult.all = function(req,res){
	var result = Generic.prepare_request(req,res);

	//Getting and preparing data
	//data = {_cid:Generic.url_data.q_id}
	data = {}

	Consult.generic_dao_request(res,data, Dao_consult.all)
}

/*
* Recupera a ultima consulta do paciente
*/
Consult.patient = function(req,res){
	var result = Generic.prepare_request(req,res);

	//Getting and preparing data
	//data = {_cid:Generic.url_data.q_id}
	data = {}

	Consult.generic_dao_request(res,data, Dao_consult.all)
}


module.exports = Consult;