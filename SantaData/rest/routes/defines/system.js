/*
* Indexa as rotas do sistema
* (C) João Carlos Pandolfi Santana - 13/01/2018
*/

module.exports = function (app) {

	app = require('../system/autenticator')(app);
	app = require('../system/prepare')(app);

	return app;
};