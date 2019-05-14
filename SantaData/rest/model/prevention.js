/*
* Modelo de prevencao
* 
* (C) João Carlos Pandolfi Santana - 25/01/2018
* joaopandolfi@gmail.com
*/
var Base = require( './base_consult.js' );

var Prevencao_Agravo = Object.create(Base);

Prevencao_Agravo.types = {
	void :{id: -1, label: "Vazio"},

	// Cessar tabagismo
	tabagismo: {},

	// Cessar drogas ilícitas
	uso_drogas: {},

	// Interromper Anti-inflamatórios Não-esteroidais
	aine: {},

	// Vacinação atualizada
	vac_pneumococo:[
			{id: 0,label: "Em dia"},
			{id: 1,label: "Não vacinou"}
	],

	vac_influenza:[ 
			{id: 0,label: "Em dia"},
			{id: 1,label: "Não vacinou"}
	]
}

Prevencao_Agravo.data = {
	// Todo ano
	date_vac_influ: "00/00/0000",

	// De 5 em 5 anos
	date_vac_pneumococo: "00/00/0000",

	// Cessar tabagismo
	tabagismo: {},

	// Cessar drogas ilícitas
	uso_drogas: {},

	// Interromper Anti-inflamatórios Não-esteroidais
	aine: {},

	// Vacinação atualizada
	vac_pneumococo: Prevencao_Agravo.types.void,

	vac_influenza:Prevencao_Agravo.types.void

}


module.exports = Prevencao_Agravo