/*
* Created by: João Carlos Pandolfi Santana
* Email: joaopandolfi@gmail.com
*/

var express = require('express');
var Pool = require('pg').Pool;
const pg = require('pg');

var config = {
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'teste',
    port: 5432,
    }
var pool = new Pool(config);

// export pool

module.exports = pool;