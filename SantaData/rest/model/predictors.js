/*
* Modelo de preditores
* 
* (C) João Carlos Pandolfi Santana - 25/01/2018
* joaopandolfi@gmail.com
*/
var Base = require( './base_consult.js' );

var Preditores_Morte = Object.create(Base);

Preditores_Morte.types = {
	void :{id: -1, label: "Vazio"},

	geral: {
		// Morte súbita recuperada
		morte_subita: [
			{id: 0,label: "Sim"},
			{id: 1,label: "Nao"}
		],

		// Episódio de taquicardia ventricular sustentada
		ep_taq:[
			{id: 0,label: "Sim"},
			{id: 1,label: "Nao"}
		],

		// Disfunção ventricular com fração de ejeção ≤ 35% e o paciente se encontra sintomático.
		disf_vent:[
			{id: 0,label: "Sim"},
			{id: 1,label: "Nao"}
		]
	},	

	outros:{

		// Integração Identificação
		int_id:[
			{id: 0,label: "Acima de 65 anos"},
			{id: 1,label: "Abaixo de 65 anos"}
		],

		// Integração Evidências
		int_ev:[
			{id: 0,label: "Etiologia Chagásica"},
			{id: 1,label: "Etiologia Isquemica"}
		],

		// Integração Anamnese
		int_anamnese:[
			{id: 0,label: "Falta de aderência ao tratamento"},
			{id: 1,label: "Maior intensidade dos sintomas"},
			{id: 2,label: "Parada cardio-respiratória revertida"},
			{id: 3,label: "Redução de função cognitiva"},
			{id: 4,label: "Caquexia"},
			{id: 5,label: "Anorexia"},
			{id: 6,label: "Síncope"},
			{id: 7,label: "Apnéia do sono*"},
			{id: 8,label: "Doença pulmonar associada"},
			{id: 9,label: "Depressão"}
		],

		// Integração Exame Clínico
		int_exame_fisico:[
			{id: 0,label: "Má perfusão"},
			{id: 0,label: "Congestão"}, // MV 
			{id: 0,label: "Hipotensão"}, // Pressão Abaixo de 120/80mmHg
			{id: 0,label: "Taquicardia"}, // Ritmo Acima de 100bpm
			{id: 0,label: "Presença de B3"}
		]

		// Integração Capacidade Física

		// Integração Estrutural e Funcional dos Exames Complementares

		// Integração Eletrofisiológica dos Exames Complementares

		// Integração Hemodinâmica dos Exames Complementares

		// Integração Exames Laboratoriais

		// 

	}

}

module.exports = Preditores_Morte