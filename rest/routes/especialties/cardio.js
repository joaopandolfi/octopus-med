module.exports = function (app) {

	var rx = require( '../../libs/regex_patterns' );
	var cardio = require( '../../controller/especialties/cardio' );

	//base Route
	var base_route  = "/esp/cardio/{req}";
	var requisitions= {
		new: {anamnese: "new/anamnese/"},
		search: {anamnese: "search/anamnese/"}
	};

	//==> Routes
	
	//New
	app.route("/esp/cardio/new/anamnese/").all(cardio.add.anamnese)//post(cardio.new_anamnese);

	//Search
	app.route("/esp/cardio/search/anamnese/").all(cardio.add.anamnese);

	//Update
	app.route("/esp/cardio/update/anamnese/").all(cardio.update.anamnese);	

	return app;
};