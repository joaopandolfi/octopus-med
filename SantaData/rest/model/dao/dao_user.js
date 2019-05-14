/*
* Dao Usuario
* 
* (C) João Carlos Pandolfi Santana - 18/01/2018
* joaopandolfi@gmail.com
*/

//Creating Class
var Dao = require( './dao.js' );
var Dao_user = Object.create(Dao);


Dao_user.new_user = (data) => {
	return new Promise((resolve,reject)=>{
		var query = "SELECT new_user(?,?,?,?,?,?);"
		Dao_user.sql_query(query, data)
		.then(result =>{

			//Processing data result
			result = ret.data[0]
			keys = Object.keys(result)
			result = keys.map(function(k){return result[k]})
			
			//Setting return data
			ret.data = {iduser:result[0]}
			if(result.length == 0)
				reject(result)

			//Returning data
			console.log(`[Dao-user][Debug] Inserted user: ${ret.data.iduser}`)		
			resolve(ret)	
		})
		.catch(error=>{reject(error);})
	});
	
}


Dao_user.login = (data) => {
	return new Promise((resolve,reject)=>{
		var query = "SELECT * FROM login WHERE login=? AND pass=? ;"
		Dao_user.sql_query(query, data)
			.then(result =>{resolve(result)})
			.catch(e =>{reject(e)})
	});
}

module.exports = Dao_user