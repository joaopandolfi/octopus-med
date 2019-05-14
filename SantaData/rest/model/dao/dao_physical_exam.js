/*
* Dao Exame Físico
* 
* (C) João Carlos Pandolfi Santana - 19/01/2018
* joaopandolfi@gmail.com
*/

var physical_exam = require('../physical_exam.js')

//Creating Class
var Dao = require( './dao.js' );
var Dao_physical_exam = Object.create(Dao);

Dao_physical_exam.callback_new = function(param,ret){
	var callback = param.callback
	var par = param.param

	//Checking error
	if(ret.success == 0){
		callback(param,ret)
		return
	}

	//Processing data result
	result = ret.data[0]
	keys = Object.keys(result)
	result = keys.map(function(k){return result[k]})
	
	/*
	//Setting return data
	ret.data = {iduser:result[0]}
	if(result.length == 0)
		ret.success = 0

	//Returning data
	console.log("# Inserted user: "+ret.data.iduser)		
	callback(par,ret)	
	*/
}


Dao_physical_exam.new = function(param, data, callback){
	//Defining parameter to callback in same class
	var par = {
		param: param,
		callback: callback
	}

	//TODO: JUST FOR TEST 
	callback(param,{success:1,data:{idphysical_exam:0}})

	//var query = "SELECT new_patient(?,?,?,?,?,?);"
	//Dao_physical_exam.mysql_query(query, data, Dao_physical_exam.callback_new, par);
}


Dao_physical_exam.get = function(param, data, callback){
	//Defining parameter to callback in same class
	var par = {
		param: param,
		callback: callback
	}

	//TODO: JUST FOR TEST 
	callback(param,{success:1,data:physical_exam.data})

	//var query = "SELECT new_patient(?,?,?,?,?,?);"
	//Dao_physical_exam.mysql_query(query, data, Dao_physical_exam.callback_new, par);
}


Dao_physical_exam.search = function(param, data, callback){
	//Defining parameter to callback in same class
	var par = {
		param: param,
		callback: callback
	}

	//TODO: JUST FOR TEST 
	callback(param,{success:1,data:[physical_exam,physical_exam]})

	//var query = "SELECT new_patient(?,?,?,?,?,?);"
	//Dao_physical_exam.mysql_query(query, data, Dao_physical_exam.callback_new, par);
}


Dao_physical_exam.update = function(param, data, callback){
	//Defining parameter to callback in same class
	var par = {
		param: param,
		callback: callback
	}

	//TODO: JUST FOR TEST 
	callback(param,{success:1,data:{}})

	//var query = "SELECT new_patient(?,?,?,?,?,?);"
	//Dao_physical_exam.mysql_query(query, data, Dao_physical_exam.callback_new, par);
}


module.exports = Dao_physical_exam
