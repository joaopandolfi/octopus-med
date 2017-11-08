module.exports = function (app) {

	var rx = require( '../../libs/regex_patterns' );
	var cardio = require( '../../controller/specialties/cardio' );
	
	//==> Routes
	
	//New
	app.route("/esp/cardio/new/anamnese/").all(cardio.add.anamnese)//post(cardio.new_anamnese);

	//Search
	app.route("/esp/cardio/search/anamnese/").all(cardio.search.anamnese);

	//Update
	app.route("/esp/cardio/update/anamnese/").all(cardio.update.anamnese);	

	return app;
};