/*
* Created by: João Carlos Pandolfi Santana
* Email: joaopandolfi@gmail.com
*/

const mysql = require('mysql');
const credentials = {connectionLimit: 10, host: 'localhost', user: 'user', password: 'pass', database: 'db'};
var pool = mysql.createPool(credentials);

module.exports = {
	format: mysql.format,

	query: function (sql, callback) {
		pool.getConnection(function(err, connection) {
			if(err) { console.log(err); callback(true); return; }

			connection.query(sql, function(err, rows) {
				if(err) { console.log(err); callback(true); return; }

				connection.release();
				callback(false, rows);
			});
		});
	}
}