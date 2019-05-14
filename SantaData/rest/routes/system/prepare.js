/*
* Indexa as rotas de preparação
* (C) João Carlos Pandolfi Santana - 24/1/2018
*/


module.exports = function (app) {

	var Base_generic = require( '../generics/base_generic' );
	var c_prepare = require( '../../controller/generics/prepare' );

	//Herança
	var Prepare = Object.create(Base_generic);
	

	Prepare.init(app);

	Prepare.add_route("/prepare/",c_prepare.session, Prepare.sufix.prepare_route, Prepare.type.all)
	Prepare.add_route("/amb/prepare/",c_prepare.ambulatory, Prepare.sufix.prepare_route, Prepare.type.all)
/*
	Prepare.add_route("/prepare/anamnese/", c_prepare.anamnese, Prepare.sufix.none, Prepare.type.all)
	Prepare.add_route("/prepare/evidences/", c_prepare.evidences, Prepare.sufix.none, Prepare.type.all)
	Prepare.add_route("/prepare/interventions/", c_prepare.interventions, Prepare.sufix.none, Prepare.type.all)
	Prepare.add_route("/prepare/medicines/", c_prepare.medicines, Prepare.sufix.none, Prepare.type.all)
	Prepare.add_route("/prepare/predictors/", c_prepare.predictors, Prepare.sufix.none, Prepare.type.all)
	Prepare.add_route("/prepare/prevention/", c_prepare.prevention, Prepare.sufix.none, Prepare.type.all)
	Prepare.add_route("/prepare/exams/", c_prepare.exams, Prepare.sufix.none, Prepare.type.all)
*/	
	return Prepare.prepare();
};