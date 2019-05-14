/*
* Dao paciente
* 
* (C) João Carlos Pandolfi Santana - 18/01/2018
* joaopandolfi@gmail.com
*/


var patient = require('../patient.js')

//Creating Class
var Dao = require( './dao.js' );
var Dao_patient = Object.create(Dao);

Dao_patient.new = (data)=>{
	return new Promise((resolve,reject)=>{
		var query = "SELECT new_patient ?;"
		Dao_patient.sql_query(query, [data])
			.then(result => {
				
				//Processing data result
				result = result.data[0]
				keys = Object.keys(result)
				result = keys.map((k)=>{return result[k]})
				
				//Setting return data
				result.data = {idpatient:result[0]}
				if(!result.length)
					return reject(result)

				//Returning data
				console.log(`[Dao-patient][Debug] Inserted patient: ${result.data.idpatient}`)
				resolve(result)	
			})
			.catch(e => { reject(e)})
	});
}


Dao_patient.search = (data) => {
	return new Promise((resolve,reject)=>{
		var query = "SELECT * FROM full_patient WHERE name LIKE ?;"

		Dao_patient.sql_query(query, data)
			.then(result =>{
				if(!result.success)
					return reject(result)	
				
				resolve(result)	
			})
			.catch(e=>{reject(e)})
	});
}


Dao_patient.get = function(param, data, callback){
	return new Promise((resolve,reject)=>{
		var query = "SELECT * FROM full_patient WHERE idpatient = ?;"
		Dao_patient.sql_query(query, data)
		.then(result =>{
			if(!result.success)
				return reject(result)	
			
			resolve(result)	
		})
		.catch(e=>{reject(e)})
	});
}

Dao_patient.all = function(param, data, callback){
	return new Promise((resolve,reject)=>{
		var query = "SELECT * FROM full_patient ;"
		Dao_patient.sql_query(query, data)
		.then(result =>{
			if(!result.success)
				return reject(result)	
			
			resolve(result)	
		})
		.catch(e=>{reject(e)})
	});
}

module.exports = Dao_patient