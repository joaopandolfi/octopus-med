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

	fisico: {

	    title:{
	        type: 'label',
	        value: "Exame Físico"
	    },

	    geral:
	    {
	        //void: {id: -1, label: "Vazio"},
	        
	        title:{
	        type: 'label',
	        value: "Exame Físico Geral"
	        },
	        
	        estado: {
	        type: "text",
	        title: "Estado"
	        },
	        
	        //Tipos de edemas fisicos 
	        edemas: {// 1
	        type:"select",
	        title:"Edemas",
	        options:
	        [
	            {id: "", label: "Escolher"},
	            { id: 0, label: "Sem Edema" },
	            { id: 1, label: "+/++++" },
	            { id: 2, label: "++/++++" },
	            { id: 3, label: "+++/++++" },
	            { id: 4, label: "++++/++++" },
	        ],
	        },
	        
	        //Auscutas respiratorias
	        auscultas_resp:{ // 1
	        type: "select",
	        title: "Ascultas Respiratórias",
	        options:
	        [
	            { id: "", label: "Escolher" },
	            { id: 0, label: "Nenhum" },
	            { id: 1, label: "MV Fisiológico" },
	            { id: 2, label: "Creptações basais" },
	            { id: 3, label: "Creptações difusas" },
	            { id: 4, label: "Edema Agudo do Pulmão" },
	        ],
	        },
	        
	        refl_heptojugular:{
	        type:"radio",
	        title: "Reflexo Heptojugular",
	        options:
	        [
	            { id: 0, label: "Sim" },
	            { id: 1, label: "Não" },
	        ],
	        },
	        
	        turg_jugular:{
	        type: "radio",
	        title:"Turgência Jugular",
	        options:
	        [
	            { id: 0, label: "Sim" },
	            { id: 1, label: "Não" },
	        ],
	        },
	        
	        ascite:{
	        type: "radio",
	        title: "Ascite",
	        options:
	        [
	            { id: 0, label: "Sim" },
	            { id: 1, label: "Não" },
	        ],
	        },
	        
	        perfusao:{
	        type: "radio",
	        title:"Perfusão",
	        options:[
	            {id: 0 , label: "Normal"},
	            {id: 1, label: "Baixa"},
	        ]
	        },
	        
	        freq_respiratoria: {
	        type: "number",
	        title: "Frequência Repiratória"
	        },
	        
	        derrame_pleural:{
	        type: "radio",
	        title: "Derrame Pleural",
	        options:[
	            {id:0, label:"Sim"},
	            {id:1, label:"Nao"},
	        ]
	        },
	        
	        peso: {
	        type:"text",
	        title: "Peso (kg)"
	        },
	        altura: {
	        type: "text",
	        title: "Altura (m)"
	        },
	        imc:{
	        type: "text",
	        title:"IMC"
	        }  // peso/altura^2 
	    },

	    cardio:
	    {
	        title:{
	        type: 'label',
	        value: "Exame  Cardio"
	        },
	        
	        
	        
	        //Ritmo cardiovascular
	        ritmo: {// 1
	        type: "radio",
	        title:"Rítmo",
	        options:
	        [
	            { id: 0, label: "Regular" },
	            { id: 1, label: "Irregular" },
	        ],
	        },
	        
	        //Inpecao cardiovascular
	        inspecao:{ // 1
	        
	        type:"select",
	        title:"Inspeção",
	        options:
	        [
	            { id: 0, label: "Ictus Cordis Visivel" },
	            { id: 1, label: "Ictus de VD" },
	            { id: 2, label: "Movimento em bascula" },
	        ],
	        },
	        //Bulhas
	        bulhas:{ // 1
	        type:"select",
	        title:"bulhas",
	        options:
	        [
	            { id: 0, label: "B1 e B2" },
	            { id: 1, label: "B3" },
	            { id: 2, label: "B4" },
	            { id: 3, label: "B3 e B4" },
	        ],
	        },
	        
	        
	        auscuta: {
	        type: "text",
	        title:"Ascuta"
	        }
	        ,
	        
	        //Palpacao
	        palpacao: {// 1..*
	        
	        type:"checkbox",
	        title:"Palpação",
	        options:
	        [
	            { id: 0, label: "Ictus não palpável" },
	            { id: 1, label: "Ictus palpável" },
	            { id: 2, label: "Desviado E para Baixo" },
	            { id: 3, label: "LHC 5 EIEC" },
	        ],
	        },
	        
	        fc:{
	        type:"text",
	        title:"Frequência Cardiaca",
	        
	        },
	        
	        pressao_arterial:{
	        type:"text",
	        title:"Pressão Arterial"
	        },
	    },
	},

	bioquimico:
	{
	    title:{
	        type: 'label',
	        value: "Exame Bioquímico"
	    },

	    creatina:
	    {
	        title:{
	            type:"label",
	            value: "Creatina"
	        },

	        basal:{
	            type:"text",
	            title:"Basal"
	        },
	        ultima:{
	            type:"text",
	            title:"Ultima"
	        },
	        delta: {
	            type:"text",
	            title:"Delta"
	        },
	        clearence_atual:{
	            type:"text",
	            title:"Clearence Atual"
	        }

	    },

	    sangue:
	    {
	        title:{
	            type:"label",
	            value:"Exame de Sangue"
	        },

	        hemoglobina: {
	            type: "text",
	            title:"Hemoglobina"
	        },
	        linfocitos: {
	            type: "text",
	            title: "Linfócitos"
	        },
	        sodio: {
	            type:"text",
	            title:"Sódio"
	        },
	        outros: {
	            type: "text",
	            title: "Outros"
	        }, // Plain Text
	    }
	},

	complementar:
	{
	    title:{
	        type:"label",
	        value:"Complementar"
	    },
	    
	    eletro:{ // 0..*
	        type: "checkbox",
	        title:"Eletrocardiograma",
	        options:
	        [ 
	            {id: 0, label: "Bloqueio de Ramo Direito (BRD)"},
	            {id: 1, label: "Bloqueio de Ramo Esquerdo (BRE)"},
	            {id: 2, label: "Supra do Segmento ST"},
	            {id: 3, label: "Sobrecarga Atrial (SA)"},
	            {id: 4, label: "Sobrecargo de Ventrículo (SV)"},
	            {id: 5, label: "Flutter Atrial"},
	            {id: 6, label: "Fibrilação Atrial (FA)"},
	        ],
	    },

	    //Ecocardiograma
	    primeira_FE: {
	        type: "text",
	        title:"Primeira FE"
	    }, // texto numérico
	    primeiro_VE_diast: {
	        type: "text",
	        title:"Primeiro VE Diast"
	    },
	    primeiro_VE_sist: {
	        type: "text",
	        title: "Primeiro VE"
	    },

	    ultima_FE: {
	        type: "text",
	        title:"Ultima FE"
	    }, // texto numérico
	    ultima_VE_diast: {
	        type: "text",
	        title: "Ultima Ve Diast"
	    },
	    ultima_VE_sist: {
	        type: "text",
	        title: "Ultima Ve Sist"
	    },		

	    delta_FE: {
	        type: "text",
	        title: "delta Fe"
	    }, // diferença entre ultima_FE - primeira_FE
	    delta_VE: {
	        type:"text",
	        title:"delta VE"
	    }, // diferença entre ultima_VE_sist - primeira_FE_sist
	    ps_ap: {
	        type: "text",
	        title: "ps_ap",
	    }, // texto numérico
	}

}

//Dados medicos
Exame_fisico.data = {

	geral: {
		estado: "",
		edema: Exame_fisico.types.void,
		auscuta_resp: Exame_fisico.types.void,
		refl_heptojugular: 0, // 0 or 1
		turg_jugular: 0, //0 or 1
		ascite: 0, //0 or 1
		peso: 0.0,
		altura: 0.0,
		imc: 0.0 // peso/altura^2 
	},

	cardiovascular: {	
		ritmo: Exame_fisico.types.void,
		inspecao: Exame_fisico.types.void,	//Exame_fisico.types.cardiovascular.inspecao[0],
		bulhas: Exame_fisico.types.void,	//Exame_fisico.types.cardiovascular.bulhas[0]
		ausculta: "",
		palpacao: Exame_fisico.types.void,	//Exame_fisico.types.cardiovascular.palpacao[0]
		fc: 0,
		pressao_arterial: 0
	},

	bioquimico: {
		
		//Creatina
		creatina:{
			basal: 0.0,
			ultima: 0.0,
			delta: 0.0,
			clearence_atual: 0.0
		},

		//Sangue
		sangue:{
			hemoglobina: 0.0,
			linfocitos: 0.0,
			sodio: 0.0,
			outros: "" // Plain Text
		}
	},


	complementar:{

		//ECG
		eletro:[],

		//Ecocardiograma
		primeira_FE: "", // texto numérico
		primeiro_VE_diast: "",
		primeiro_VE_sist: "",

		ultima_FE: "", // texto numérico
		ultima_VE_diast: "",
		ultima_VE_sist: "",		

		delta_FE: "", // diferença entre ultima_FE - primeira_FE
		delta_VE: "", // diferença entre ultima_VE_sist - primeira_FE_sist
		ps_ap: "" // texto numérico
	}

}

module.exports = Exame_fisico;