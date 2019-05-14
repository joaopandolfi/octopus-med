/*
* Indexa as rotas de controle das consultas
* (C) João Carlos Pandolfi Santana - 20/02/2018
* joaopandolfi@gmail.com
*/


module.exports = function (app) {

	var Base_generic = require( './base_generic.js' );
	var c_consult = require( '../../controller/generics/consult');

	//Herança
	var Consult = Object.create(Base_generic);
	

	Consult.init(app);

	//Physical exam
	Consult.add_route("/gen/new/consult/", c_consult.add, Consult.sufix.end_route, Consult.type.post)
	//Consult.add_route("/gen/search/consult/", c_consult.search, Consult.sufix.end_route, Consult.type.post)
	Consult.add_route("/gen/get/consult/", c_consult.get, Consult.sufix.id_route, Consult.type.post)
	Consult.add_route("/gen/all/consult/", c_consult.all, Consult.sufix.end_route, Consult.type.post) // DISABLE
	Consult.add_route("/gen/patient/consult/", c_consult.patient, Consult.sufix.id_route, Consult.type.post) // DISABLE
	Consult.add_route("/gen/timeline/consult/", c_consult.timeline, Consult.sufix.id_route, Consult.type.post)
	//Consult.add_route("/gen/update/consult/", c_consult.update, Consult.sufix.id_route, Consult.type.post)
	
	//Other exam

	return Consult.prepare();
};