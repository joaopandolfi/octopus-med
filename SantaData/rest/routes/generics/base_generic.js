/*
* Indexa as rotas genericas
* (C) João Carlos Pandolfi Santana - 10/1/2018
*/

//==> Routes
var end_route = "{id_user}/{hash}/";
var id_route = "{id}/";
var prepare_route = "{ambulatory}/{session}/";

var rx = require( '../../libs/regex_patterns' );

end_route = end_route.replace("{id_user}",rx.base_64).replace("{hash}",rx.base_64)
id_route = id_route.replace("{id}",rx.id) + end_route
prepare_route = prepare_route.replace("{ambulatory}",rx.url_name).replace("{session}",rx.url_name)

var Generic = {
	app: null,

	sufix: {
		end_route: end_route,
		id_route: id_route,
		prepare_route: prepare_route,
		none:""
	},

	type: {
		all:1,
		post:2,
		get: 3
	},


	init: function(app){
		Generic.app = app;
	},

	add_route: function(prefix,callback,sufix,type){
		switch(type){
			case 1:
				Generic.app.route(prefix+sufix).all(callback)
			break;

			case 2:
				Generic.app.route(prefix+sufix).post(callback)
			break

			case 3:
				Generic.app.route(prefix+sufix).get(callback)
			break
		}
	},

	prepare: function(){
		return Generic.app;
	} 
}

module.exports = Generic