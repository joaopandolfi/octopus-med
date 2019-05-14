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
const config = require("./constants/config.js");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//=== Configuring server
app.get('/', function (req, res) { res.send('OK'); });

app = require('./routes/defines/specialties')(app);


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