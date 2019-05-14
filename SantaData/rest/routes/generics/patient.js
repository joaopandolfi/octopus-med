/*
* Indexa as rotas de controle dos pacientes
* (C) João Carlos Pandolfi Santana - 10/1/2018
*/


module.exports = function (app) {

	var Base_generic = require( './base_generic.js' );
	var c_patient = require( '../../controller/generics/patient' );

	//Herança
	var Patient = Object.create(Base_generic);
	

	Patient.init(app);

	Patient.add_route("/gen/new/patient/", c_patient.add, Patient.sufix.end_route, Patient.type.post)
	Patient.add_route("/gen/search/patient/", c_patient.search, Patient.sufix.end_route, Patient.type.post)
	Patient.add_route("/gen/get/patient/", c_patient.get, Patient.sufix.id_route, Patient.type.post)
	Patient.add_route("/gen/all/patient/", c_patient.all, Patient.sufix.end_route, Patient.type.post)
	Patient.add_route("/gen/update/patient/", c_patient.update, Patient.sufix.id_route, Patient.type.post)
	
	return Patient.prepare();
};