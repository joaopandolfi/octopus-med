/*
* Controlador de usuários
* 
* (C) João Carlos Pandolfi Santana - 16/01/2018
*/

// Database manager
var Dao_user = require('../../model/dao/dao_user.js');

//Base class
var Base = require( '../generic.js' );
var User = Object.create(Base);

/*
* Registra novo usuario
* @receives name,email,login,pass,hash,type_user
* @return id_user {Id do usuario}
*/
User.new_user = function(req,res){

	var var_req = req.body;
	var_req = User.decode_data(var_req)

	//Check authentication
	if(!User.check_requisition(req) || Object.keys(var_req).length == 0){
		res.status(404).send(User.error_message("Invalid request"));
		return
	}

	data = [var_req.name, var_req.email,var_req.login,var_req.pass,"-void-hash-",parseInt(var_req.type_user)]

	
	User.generic_dao_request(res,data,Dao_user.new_user)
}


module.exports = User;
