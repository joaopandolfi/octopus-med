/*
* Controlador do módulo de Caridiologia Octopus Med
* 
* (C) João Carlos Pandolfi Santana - 15/10/2017
*/
var Especialty = require( '../specialty' );

//Herança
var Cardio = Object.create(Especialty);

Cardio.add.anamnese = function(req,res){
/*
	var url_components = req.path.split('/');
	var lat = url_components[4];
	var lng = url_components[5];
	var max = url_components[6];

	var db = require('../libs/database');
	var sql = "CALL get_by_distance(?,?,?)";
	sql = db.format(sql, [lat, lng, max]);

	db.query(sql, function (err, results) {
		if(err) { res.send(500, "Server Error"); return; }
		res.send(JSON.stringify(results[0]));
	});
	*/
	console.log("New Anamnese TEST");
	Cardio.test(req,res);
}

Cardio.search.anamnese = function(req,res){
	console.log("Search Anamnese TEST");
	Cardio.test(req,res);
}


//Metodos

module.exports = Cardio; 

