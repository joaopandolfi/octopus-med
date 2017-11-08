/*
* Indexa as especialidades
* (C) João Carlos Pandolfi Santana - 15/10/2017
*/

module.exports = function (app) {

	app = require('../specialties/cardio')(app);

	return app;
};