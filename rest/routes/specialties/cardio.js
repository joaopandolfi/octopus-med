module.exports = function (app) {

	var rx = require( '../../libs/regex_patterns' );
	var cardio = require( '../../controller/specialties/cardio' );
	
	//==> Routes
	var end_route = "{id_user}/{hash}/";
	end_route = end_route.replace("{id_user}",rx.base_64).replace("{hash}",rx.base_64);

	//New
	app.route("/esp/cardio/new/anamnese/"+end_route).all(cardio.add.anamnese)//post(cardio.new_anamnese);

	//Search
	app.route("/esp/cardio/search/anamnese/"+end_route).all(cardio.search.anamnese);

	//Update
	app.route("/esp/cardio/update/anamnese/"+end_route).all(cardio.update.anamnese);	

	return app;
};