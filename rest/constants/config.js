var fs = require('fs');

module.exports = {
	http_port: 3000,
	https_port: 8443,
	/*https_options: {
	  ca: [fs.readFileSync(PATH_TO_BUNDLE_CERT_1), fs.readFileSync(PATH_TO_BUNDLE_CERT_2)],
      cert: fs.readFileSync(PATH_TO_CERT),
      key: fs.readFileSync(PATH_TO_KEY)
	}*/
	credentials : {key: fs.readFileSync('./constants/sslcert/server.key', 'utf8'), cert: fs.readFileSync('./constants/sslcert/server.crt', 'utf8')}
}