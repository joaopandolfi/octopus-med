/*
* Modelo de Evidencias
* 
* (C) João Carlos Pandolfi Santana - 25/01/2018
* joaopandolfi@gmail.com
*/
var Base = require( './base_consult.js' );

var Evidencias= Object.create(Base);

Evidencias.types = {
	void :{id: -1, label: "Vazio"},

    // Registro de Evidencias
    ev_estado: // 1
    {
        type: "select",
        title: "Estado",
        required: "true",
        options: 
        [
            {id: 0,label: "Primeira consulta"},
            {id: 1,label: "Em tratamento"},
            {id: 2,label: "Desistente/Desaparecido"},
            {id: 3,label: "Reinternação"},
        ]
    },
        
    // Tempo do acompanhamento Ambulatorial
    amb_start_time: 
    {
        type: "number",
        title: "Tempo do acompanhamento Ambulatorial"
    },
        
    // Data Primeira Consulta
    date_consult: 
    {
        type: "date",
        title: "Data Primeira Consulta",
    },
        
    // Etiologia
    ev_etiologia: // 0..*
    {
        type: "checkbox",
        title: "Etiologia",
        required: "true",
        options:[
            {id: 0,label: "A Esclarecer"},
            {id: 1,label: "Doença Arterial Coronariana (DAC)"},
            {id: 2,label: "Hipertensão Arterial Sistêmica (HAS)"},
            {id: 3,label: "Cardiomiopatia Dilatada Idiopática"},
            {id: 4,label: "Cardiomiopatia Chagásica"},
            {id: 5,label: "Valvulopatias"},
            {id: 6,label: "Alcoólica"},
            {id: 7,label: "Pós Quimioterapia"},
        ]
    },
        
    // Co-morbidades
    ev_comorbidades: // 0..*
    {
        type: "checkbox",
        title: "Co-morbidades",
        required: "true",
        options:
        [
            {id: 0,label: "Hipertensão Arterial Sistemica (HAS)"},
            {id: 1,label: "Diabetes Mélitus (DM)"},
            {id: 2,label: "Dislipidemia (DLP)"},
            {id: 3,label: "Tabagismo (TBG)"},
            {id: 4,label: "Doença Arterial Coronariana (DAC)"},
            {id: 5,label: "Fibrilação atrial (FA)"},
            {id: 6, label: "Uso de Anti-coagulante Oral"},
            {id: 7,label: "Insuficiência Renal Crônica (IRC)"},
            {id: 8,label: "Tireóide (hipo ou hipertireoidismo)"},
        ]
    },
        
    // Eventos Adversos
    ev_adversos: // 0..*
    {
        type: "checkbox",
        title: "Eventos adversos",
        required: "true",
        options:
        [
            {id: 0,label: "Infarto Agudo do Miocárdio (IAM)"},
            {id: 1,label: "Acidente Vascular Cerebral (AVC)"},
            {id: 2,label: "Internação (INT)"},
        ]
    },
        
    // Obito
    ev_obito: // 1
    {
        type: "radio",
        title: "Óbito",
        required: "true",
        options:
        [
            {id: 0,label: "Sim"},
            {id: 1,label: "Nao"},
        ]
    }

}

Evidencias.data = {

	// Tempo do acompanhamento Ambulatorial
	amb_start_time: "", //

	// Data Primeira Consulta
	date_consult: "00/00/0000",

	ev_estado: Evidencias.types.void, // 1
	ev_etiologia: [],// 0..*
	ev_comorbidades: [],// 0..*
	ev_adversos:[], // 0..*
	ev_obito:Evidencias.types.void // 1
}


module.exports = Evidencias;