/*
* Modelo de intervencao
* 
* (C) João Carlos Pandolfi Santana - 25/01/2018
* joaopandolfi@gmail.com
*/
var Base = require( './base_consult.js' );

var Interventions = Object.create(Base);

Interventions.types = {
	  
	void: {id: -1, label: "Vazio"},

	// Tipos de intervenções
	 angio:
    {
        type: "select",
        title: "Angio",
        required: "true",
        options: 
        [
            {id: 0,label: "Cirurgia de Revascularização do Miocárdio (CRM) prévia"},
            {id: 1,label: "Intervenção Coronária Percutanea (ICP) prévia"},
        ]
    },

    implantes: 
    {
        type: "select",
        title: "Implantes",
        required: "true",
        options: 
        [
            {id: 0,label: "Marcapasso Definitivo (MPD)"},
            {id: 1,label: "Cardiodesfibrilador Implantável (CDI)"},
            {id: 2,label: "Tratamento por Ressincronização Cardíaca (TRC)"},
        ]
    }
}

module.exports = Interventions