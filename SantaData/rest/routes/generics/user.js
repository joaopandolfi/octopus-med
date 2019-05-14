/*
* Indexa as rotas de controle do usuario
* (C) João Carlos Pandolfi Santana - 16/1/2018
*/


module.exports = function (app) {

	var Base_generic = require( './base_generic.js' );
	var user = require( '../../controller/generics/user' );

	//Herança
	var User = Object.create(Base_generic);
	

	User.init(app);

	User.add_route("/gen/new/user/", user.new_user, User.sufix.end_route, User.type.post)
	
	//User.add_route("/gen/search/pacient/", user.search, User.sufix.id_route, User.type.all)
	//User.add_route("/gen/update/pacient/", user.update, User.sufix.id_route, User.type.all)
	
	return User.prepare();
};