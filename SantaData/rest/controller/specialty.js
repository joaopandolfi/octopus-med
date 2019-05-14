/*
* Classe base de especialidades Octopus Med
* 
* (C) João Carlos Pandolfi Santana - 15/10/2017
*/

var Base = require( './base_controller.js' );

var Especialty = Object.create(Base);

Especialty.add = { anamnese: Especialty.test};
Especialty.search = { anamnese: Especialty.test};
Especialty.update = { anamnese: Especialty.test};

module.exports = Especialty;