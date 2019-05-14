/*
* Created by: João Carlos Pandolfi Santana
* Email: joaopandolfi@gmail.com
*/

const mysql = require('mysql');
const config = require('../../constants/databases');

//Debug
pool.on('connection', () => {
	console.log(`[connectionPool] new connection opened`)
})
pool.on('enqueue', () => {
	console.log(`[connectionPool] WARNING! there are callbacks enqueued, waiting for a free connection`)
})

module.exports = {
	format: mysql.format,

	query: (sql) => {
		return new Promise((resolve,reject) => {
			pool.getConnection((err, connection) =>  {
				if(err) { console.log(err); reject(true); return; }

				connection.query(sql, function(err, rows) {
					if(err) { console.log(err); reject(true); return; }

					connection.release();
					resolve( rows);
				});
			});
		})
	}
}