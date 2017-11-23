/*
* Anamnese de cardiologia
* 
* (C) João Carlos Pandolfi Santana - 12/11/2017
* joaopandolfi@gmail.com
*/
var Anamnese = require( '../anamnese.js' );

//Herança
var Cardio = Object.create(Anamnese);


module.exports = {Anamnese: Cardio}