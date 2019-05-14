/*
* Evidencias
* 
* (C) João Carlos Pandolfi Santana - 19/01/2018
* joaopandolfi@gmail.com
*/

var Base = require( './base_consult.js' );

//Herança
var Evidencias = Object.create(Base);

Evidencias.types = {
	// Registro de Evidencias
	ev_estado:[
				{id: 0,label: ""},
				{id: 1,label: ""},
				{id: 2,label: ""},
				{id: 3,label: ""}
			],

	// Etiologia
	ev_etiologia:[
				
				{id: 0,label: "A Esclarecer"}
				{id: 1,label: "Doença Arterial Coronariana (DAC)"},
				{id: 2,label: "Hipertensão Arterial Sistêmica (HAS)"},
				{id: 3,label: "Cardiomiopatia Dilatada Idiopática"},
				{id: 4,label: "Cardiomiopatia Chagásica"}
				{id: 5,label: "Valvulopatias"}
				{id: 6,label: "Alcoólica"}
				{id: 7,label: "Pós Quimioterapia"}
			],

	// Co-morbidades
	ev_comorbidades:[
				{id: 0,label: "Hipertensão Arterial Sistemica (HAS)"},
				{id: 1,label: "Diabetes Mélitus (DM)"},
				{id: 2,label: "Dislipidemia (DLP)"},
				{id: 3,label: "Tabagismo (TBG)"}
				{id: 4,label: "Doença Arterial Coronariana (DAC)"}
				{id: 5,label: "Fibrilação atrial (FA)"}
				{id: 6, label: "Uso de Anti-coagulante Oral"}
				{id: 7,label: "Insuficiência Renal Crônica (IRC)"}
				{id: 8,label: "Tireóide (hipo ou hipertireoidismo)"}

			],

	// Eventos Adversos
	ev_adversos:[
				{id: 0,label: "Infarto Agudo do Miocárdio (IAM)"},
				{id: 1,label: "Acidente Vascular Cerebral (AVC)"},
				{id: 2,label: "Internação (INT)"},
			],

	// Obto
	ev_obto:[
				{id: 0,label: "Sim"},
				{id: 1,label: "Nao"},
			]
}

Evidencias.data = {
	ev_estado:[], //Evidencias.estado[0]
	ev_etiologia:[],
	ev_comorbidades:[],
	ev_adversos:[],
	ev_obto:[]
}


module.exports = drogas;