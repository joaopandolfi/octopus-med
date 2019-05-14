/*
* Indexa as rotas de controle dos exames
* (C) João Carlos Pandolfi Santana - 19/1/2018
* joaopandolfi@gmail.com
*/


module.exports = function (app) {

	var Base_generic = require( './base_generic.js' );
	var c_physical_exam = require( '../../controller/generics/physical_exam');

	//Herança
	var Exams = Object.create(Base_generic);
	

	Exams.init(app);

	//Physical exam
	Exams.add_route("/gen/new/exam/physical/", c_physical_exam.add, Exams.sufix.end_route, Exams.type.post)
	Exams.add_route("/gen/search/exam/physical/", c_physical_exam.search, Exams.sufix.end_route, Exams.type.post)
	Exams.add_route("/gen/get/exam/physical/", c_physical_exam.get, Exams.sufix.id_route, Exams.type.post)
	//Exams.add_route("/gen/all/patient/", c_physical_exam.all, Exams.sufix.end_route, Exams.type.post)
	Exams.add_route("/gen/update/exam/physical/", c_physical_exam.update, Exams.sufix.id_route, Exams.type.post)
	
	//Other exam

	return Exams.prepare();
};