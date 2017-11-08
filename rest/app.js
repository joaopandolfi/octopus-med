/*
*  Octopus Med
* 
* Created by: João Carlos Pandolfi Santana
* Email: joaopandolfi@gmail.com
*/

var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
const config = require("./constants/config.js");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) { res.send('OK'); });

app = require('./routes/defines/specialties')(app);

var server = app.listen(config.port, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log("Octopus Med listening at http://%s:%s", host, port);
});