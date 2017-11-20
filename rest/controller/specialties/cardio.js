/*
* Controlador do módulo de Caridiologia Octopus Med
* 
* (C) João Carlos Pandolfi Santana - 15/10/2017
*/
var Especialty = require( '../specialty' );
var Mongo = require('../../libs/persistence/mongodb.js');

//Herança
var Cardio = Object.create(Especialty);

Cardio.add.anamnese = function(req,res){

	var url_components = req.path.split('/');
	var id_user = url_components[5];
	var hash 	= url_components[6];

	//console.log(req);

	if(Cardio.check_hash_id(id_user,hash)){
		console.log("New Anamnese TEST Id User: %s & Hash: %s",id_user,hash);
		Cardio.test(req,res);
	}
	else
		res.send(Cardio.error_message(666,"Failed Authentication"));

	/*
	var db = require('../libs/database');
	var sql = "CALL get_by_distance(?,?,?)";
	sql = db.format(sql, [lat, lng, max]);

	db.query(sql, function (err, results) {
		if(err) { res.send(500, "Server Error"); return; }
		res.send(JSON.stringify(results[0]));
	});
	*/
}


/*
* Busca Anamnese e retorna os dados
*/
Cardio.search.anamnese = function(req,res){
	console.log("Search Anamnese TEST");
	Cardio.test(req,res);
}


//Metodos

module.exports = Cardio; 

