/*
* Indexa as rotas de controle dos medicamentos
* (C) João Carlos Pandolfi Santana - 19/01/2018
* joaopandolfi@gmail.com
*/


module.exports = function (app) {

	var Base_generic = require( './base_generic.js' );
	var c_drugs = require( '../../controller/generics/physical_exam');

	//Herança
	var Drugs = Object.create(Base_generic);
	
	Drugs.init(app);

	//Ministred Drugs
	Drugs.add_route("/gen/new/drug/", c_drugs.add, Drugs.sufix.end_route, Drugs.type.post)
	Drugs.add_route("/gen/search/drug/", c_drugs.search, Drugs.sufix.end_route, Drugs.type.post)
	Drugs.add_route("/gen/get/drug/", c_drugs.get, Drugs.sufix.id_route, Drugs.type.post)
	//Drugs.add_route("/gen/all/patient/", c_drugs.all, Drugs.sufix.end_route, Drugs.type.post)
	Drugs.add_route("/gen/update/drug/", c_drugs.update, Drugs.sufix.id_route, Drugs.type.post)
	
	//Other exam

	return Drugs.prepare();
};