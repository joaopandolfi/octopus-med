var fs = require('fs');

module.exports = {
	http_port: 3000,
	https_port: 8443,
	credentials : {
		key: fs.readFileSync('./constants/sslcert/server.key', 'utf8'), 
		cert: fs.readFileSync('./constants/sslcert/server.crt', 'utf8')
	}
}