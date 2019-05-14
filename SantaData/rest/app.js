/*
*  Octopus Med
* 
* Created by: João Carlos Pandolfi Santana
* Email: joaopandolfi@gmail.com
*/

var express = require('express');
var https = require('https');
var http = require('http');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var morgan = require('morgan');
const config = require("./constants/config.js");

var app = express();

// SECURITY
app.use(helmet());

// LOGS
app.use(morgan("common"));

//==== CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var env = process.env.NODE_ENV;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//=== Configuring server
app.get('/', function (req, res) { res.send('OK'); });

//=== Setting routes
app = require('./routes/defines/system')(app);
app = require('./routes/defines/specialties')(app);
app = require('./routes/defines/generic')(app);


//=== Initializing Servers
var httpServer = http.createServer(app);
var httpsServer = https.createServer(config.credentials, app);

httpServer.listen(config.http_port, function () {
	var host = httpServer.address().address;
	var port = httpServer.address().port;

	console.log("Octopus Med listening at http://%s:%s", host, port);
});

httpsServer.listen(config.https_port, function () {
	var host = httpsServer.address().address;
	var port = httpsServer.address().port;

	console.log("Octopus Med listening at https://%s:%s", host, port);
});