/*
* Dao Classe base
* 
* (C) João Carlos Pandolfi Santana - 18/01/2018
* joaopandolfi@gmail.com
*/

//Config
var config = require('../../constants/config.js');

//Databases
var Mysql = require('../../libs/persistence/mysql.js');
var Mongodb = require('../../libs/persistence/mongodb.js');
var Pg = require('../../libs/persistence/postgre.js');

var Dao = {

	db:{
		mysql: Mysql,
		mongo: Mongodb
	},

	format_response: function(data){
		return {
			success: 1,
			data: data
		}
	},

	format_error: function(error_code, message){
		return {
			success: 0,
			error: error_code,
			message: message
		}
	},
/*
	pg_query: async function pg_query(query, data, callback, parm) {
      
       try {
 			var result = await Pg.query(query,data);
       		callback(param, Dao.format_response(result))

      }
      catch(err){
    		result = Dao.format_error(500,"Database error")
			console.log(result)
			callback(param, result)
      }

	},
*/
	
	mongo_insert: function(collection, data, callback, param){
		try{
			Mongodb.insert.next(collection, function(err, id){
				if (err) throw err;
				data._cid = id;
				Mongodb.insert.obj(collection,data,function(result){
					callback(param,result)
				});
			});
		}
		catch(e){
			result = Dao.format_error(500,"Database error")
			console.log(result)
			callback(param, result)
		}
	},

	sql_query: (query, data) => {
        return new Promise((resolve,reject) => {
            let sql = "";
            try{
                sql = Mysql.format(query, data);
            }catch(e){
                result = Dao.format_error(500,"Database error");
                console.log(result);
                return reject(result);
            }

            return Mysql.query(sql)
            .then(results => {
                return resolve(Dao.format_response(results));
            })
            .catch(results => {
                return reject(Dao.format_error(500,"Internal server error"));
            });
        });
	}
}



module.exports = Dao
