/*
* Indexa as rotas de autenticação
* (C) João Carlos Pandolfi Santana - 13/1/2018
*/


module.exports = function (app) {

	var Base_generic = require( '../generics/base_generic' );
	var c_autenticator = require( '../../controller/autenticator' );
	var c_config = require( '../../controller/config' );

	//Herança
	var Autenticator = Object.create(Base_generic);
	

	Autenticator.init(app);

	Autenticator.add_route("/auth/login/", c_autenticator.login_route, Autenticator.sufix.none, Autenticator.type.all)
	Autenticator.add_route("/auth/renew/hash/", c_autenticator.renew_route, Autenticator.sufix.none, Autenticator.type.all)
	Autenticator.add_route("/auth/logout/", c_autenticator.logout_route, Autenticator.sufix.none, Autenticator.type.all)
	
	Autenticator.add_route("/sys/test/db/mongo/", c_config.test_route, Autenticator.sufix.none, Autenticator.type.all)
	Autenticator.add_route("/sys/test/counter/db/mongo/", c_config.test_counters, Autenticator.sufix.none, Autenticator.type.all)
	Autenticator.add_route("/sys/config/db/mongo/", c_config.config_mongo, Autenticator.sufix.none, Autenticator.type.all)
	Autenticator.add_route("/sys/config/init/db/mongo/", c_config.initialize_mongo, Autenticator.sufix.none, Autenticator.type.all)
	
	return Autenticator.prepare();
};