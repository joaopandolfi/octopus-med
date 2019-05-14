/*
* Classe base de rotas genericas Octopus Med
* 
* (C) João Carlos Pandolfi Santana - 19/12/2017
*/
var Base = require( './base_controller.js' );

var Generic = Object.create(Base);

/*
* Decode data from route
* @receive req {received route class}
* @return req {class undecoded}
*/
Generic.decode_data = function(req){
	try{
		req = atob(req.data)
		req = JSON.parse(req)
	}
	catch(e){
		return {}
	}

	return req
}

/*
* Make a generic dao request
* @receives res {res class}
* @receives data {data to dao}
* @receives Dao_func {Dao function to be called}
*/
Generic.generic_dao_request = function(res,data,Dao_func){
	//Calling Dao Function
	Dao_func(data)
	.then(result =>{res.send(JSON.stringify(result))})
	.catch(e => {res.status(e.error).send(Generic.error_message(e.message));})
}

module.exports = Generic;