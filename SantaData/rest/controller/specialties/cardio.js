/*
* Controlador do módulo de Caridiologia Octopus Med
* 
* (C) João Carlos Pandolfi Santana - 15/10/2017
*/
var Especialty = require( '../specialty' );
var Mongo = require('../../libs/persistence/mongodb.js');
var Mysql = require('../../libs/persistence/mysql.js');

//Herança
var Cardio = Object.create(Especialty);

Cardio.add = {

	anamnese: function(req,res){

		var url_components = req.path.split('/');
		var id_user = url_components[5];
		var hash 	= url_components[6];

		//console.log(req);

		if(Cardio.check_hash_id(id_user,hash)){
			console.log("New Anamnese TEST Id User: %s & Hash: %s",id_user,hash);
			Cardio.test(req,res);

			//Normalize Object
			/**/

			//Insert on Octopus BD
			/*Mongo.insert.obj(collection,obj,callback)*/

			//Insert on MV
			/*
			var sql = "CALL get_by_distance(?,?,?)";
			sql = Mysql.format(sql, [lat, lng, max]);

			Mysql.query(sql, function (err, results) {
				if(err) { res.send(500, "Server Error"); return; }
				res.send(JSON.stringify(results[0]));
			});
			*/

		}else
			res.send(Cardio.error_message(666,"Failed Authentication"));
	}
}


/*
* Busca Anamnese e retorna os dados
*/
Cardio.search  = {
	anamnese: function(req,res){
		console.log("Search Anamnese TEST");
		Cardio.test(req,res);
	}
}


/*
* Rota de update
*/
Cardio.update = {
	anamnese: function(req,res){
		console.log("Update Anamnese TEST");
		Cardio.test(req,res);
	}
}

//Metodos

module.exports = Cardio; 

