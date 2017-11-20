/*
* Classe base de especialidades Octopus Med
* 
* (C) João Carlos Pandolfi Santana - 15/10/2017
*/

var test = function(req,res){
	res.send({test:"ok"});
}

var Especialty = {
	query_format: {
		error: 0, 
		message: "Sucess", 
		results:{}
	},
	
	add: {
		anamnese: test
	},

	search: {
		anamnese: test
	},

	update: {
		anamnese: test
	},

	//TODO: Implementar
	check_hash_id: function(user_id, hash){

		return true;
	},

	error_message: function(code, message){
		return {success: 0, error:{code:code,message:message}};
	},

	test: test 
}


module.exports = Especialty;