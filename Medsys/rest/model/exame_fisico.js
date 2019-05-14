/*
* Modelo de exame fisico
* 
* (C) João Carlos Pandolfi Santana - 24/11/2017
* joaopandolfi@gmail.com
*/
var Base = require( './base_consult.js' );

//Herança
var Exame_fisico = Object.create(Base);

Exame_fisico.types = {
	void: {id: -1, label: "Vazio"},

	geral: {
		//Tipos de edemas fisicos
		edemas: [
			{id: 0,label: "Sem Edema"},
			{id: 1,label: "+/++++"},
			{id: 2,label: "++/++++"},
			{id: 3,label: "+++/++++"},
			{id: 4,label: "++++/++++"}
		],

		//Auscutas respiratorias
		auscutas_resp:[
			{id: 0,label: "Nenhum"},
			{id: 1,label: "MV Fisiológico"},
			{id: 2,label: "Creptações basais"},
			{id: 3,label: "Creptações difusas"}
		]
	},

	cardiovascular:{
		//Ritmo cardiovascular
		ritmo:[
			{id: 0, label: "Regular"},
			{id: 1, label: "Irregular"}
		],

		//Inpecao cardiovascular
		inspecao:[
			{id: 0, label: "Ictus Cordis Visivel"},
			{id: 1, label: "Ictus de VD"},
			{id: 2, label: "Movimento em bascula"}
		],

		//Bulhas
		bulhas:[
			{id: 0, label: "B1 e B2"},
			{id: 1, label: "B3"},
			{id: 2, label: "B4"},
			{id: 3, label: "B3 e B4"},
		],

		//Palpacao
		palpacao:[
			{id: 0, label: "Ictus palpável"},
			{id: 1, label: "Desviado E q Baixo"},
			{id: 2, label: "LHC 5 EIEC"}
		]
	}
}

//Dados medicos
Exame_fisico.data = {

	geral: {
		estado: "",
		edema: Exame_fisico.types.geral.edemas[0],
		auscuta_resp: Exame_fisico.types.geral.auscutas_resp[0],
		refl_heptojugular: 0, // 0 or 1
		turg_jugular: 0, //0 or 1
		ascite: 0, //0 or 1 --> TODO: checar se esta escrito corretamente
		peso: 0.0,
		altura: 0.0,
		imc: 0.0 // peso/altura^2 
	},

	cardiovascular: {	
		ritmo: Exame_fisico.types.cardiovascular.ritmo[0],
		inspecao: Exame_fisico.types.void,	//Exame_fisico.types.cardiovascular.inspecao[0],
		bulhas: Exame_fisico.types.void,	//Exame_fisico.types.cardiovascular.bulhas[0]
		auscuta: "",
		palpacao: Exame_fisico.types.void,	//Exame_fisico.types.cardiovascular.palpacao[0]
		fc: 0,
		pressao_arterial: 0
	},

	bioquimico: {
		
		creatina:{

		}
	},

	complementar:{

	}

}

module.exports = Exame_fisico;