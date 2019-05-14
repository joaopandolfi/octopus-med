/*
* Arquivo de configuração das databases
* 
* (C) João Carlos Pandolfi Santana - 25/01/2018
*/

var Config_databases = {
	Mysql:{
		production:"",
		test:{
			connectionLimit: 10,
			multipleStatements: true,
			host: 'localhost',
			user: 'root',
			password: '#Esqu1m0',
			database: 'stadatadb',
			port: 3306,
		  },
		user: "",
		pass: ""
	},
	Mongo: {
		collections: [
		"user",
		"medicines",
		"consult",
		"test"
		],
		counters: [
		"test",
		"idconsult",
		"idmedicine",
		"iduser"
		]
	}
}


module.exports = Config_databases