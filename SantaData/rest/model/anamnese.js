/*
* Modelo de anamnese
* 
* (C) João Carlos Pandolfi Santana - 25/01/2018
* joaopandolfi@gmail.com
*/
var Base = require( './base_consult.js' );

//Herança
var Anamnese = Object.create(Base);

Anamnese.types = {
	void: {id: -1, label: "Vazio"},

	// Queixa principal
    qp_type: { // 1
    type: "select",
    title: "Queixa Principal",
    required: "true",
    options: [
        {id: "", label: "Escolher"},
        {id: 0, label: "Dor torácica"},
        {id: 1, label: "Dispneia"},
        {id: 2, label: "Síncope"},
        {id: 3, label: "Palpitações"},
    ]
    },
    
    // História da Doença Atual
    hda: {
    type: "textarea",
    title: "História da doença atual"
    },
    
    // História patológica
    
    // Passado
    hist_pat: { // 0..*
    type: "checkbox",
    title: "História patológica",
    options: [
        {id: 0,label: "Redução de função cognitiva"},
        {id: 1,label: "Caquexia"},//repete
        {id: 2,label: "Anorexia"},
        {id: 3,label: "Síncope"},
        {id: 4,label: "Apnéia do sono*"},
        {id: 5,label: "Doença pulmonar associada"},
        {id: 6,label: "Depressão"},//repete
    ]
    },
    
    commom_childhood: { // 0..*
    type: "checkbox",
    title: "Doenças comuns na infãncia",
    options: [
        {id: 0,label: "Sarampo"},
        {id: 1,label: "Varicela"},
        {id: 2,label: "Coqueluxe"},
        {id: 3,label: "Caxumba"},
        {id: 4,label: "Febre reumática"},
        {id: 5,label: "Amgdalite"},                         
    ]
    },
    
    commom_adult: { // 0..*
    type: "checkbox",
    title: "Doenças comuns na vida adulta",
    options: [
        {id: 0,label: "Pneumonia"},
        {id: 1,label: "Hepatite"},
        {id: 2,label: "Malária"},
        {id: 3,label: "Pleurite"},
        {id: 4,label: "Tuberculose"},
        {id: 5,label: "Hipertensão arterial"},
        {id: 6,label: "Diabetes"},
        {id: 7,label: "Artrose"},
        {id: 8,label: "Osteoporose"},
        {id: 9,label: "Litíase renal"},
        {id: 10,label: "Gota"},                                                                                               
    ]
    },
    
    commom_cardiac_associated: { // 0..*
    type: "checkbox",
    title: "Doenças comuns associadas com a cardiologia",
    options: [
        {id: 0,label: "Parada cardio-respiratória revertida"},
        {id: 1,label: "Caquexia"},
        {id: 2,label: "Anorexia"},
        {id: 3,label: "Pleurite"},
        {id: 4,label: "Síncope"},
        {id: 5,label: "Apnéia do sono"},
        {id: 6,label: "Doença pulmonar associada"},
        {id: 7,label: "Depressão"},
        {id: 8,label: "Osteoporose"},
        {id: 9,label: "Litíase renal"},
        {id: 10,label: "Gota"},                                                                                               
    ]
    },
    
    allergy: { // 0..*
    type: "checkbox",
    title: "Tem alergia?",
    options: [
        {id: 0,label: "Frutos do mar"},
        {id: 1,label: "Poeira e outros pós"},
        {id: 2,label: "Dipirona"},                        
    ]
    },
    
    another_allergy: { // 0..*
    type: "text",
    title: "Outras",
    },
    
    surgery: { // 0..* Pensar em como fazer essas cirurgias - MED
    type: "checkbox",
    title: "Já fez alguma cirurgia?",
    options: [
        {id: 0,label: "Neurocirurgia"},
        {id: 1,label: "Cirurgia física"},
        {id: 2,label: "Cirurgia respiratória"},
    ]
    },
    
    surgery_description: { // 0..*
    type: "text",
    title: "Descrição das cirurgias",
    },
    
    trauma: { // 0..*
    type: "radio",
    title: "Algum trauma físico?",
    options: [
        {id: 0,label: "Sim"},
        {id: 1,label: "Não"},
    ]
    },
    
    blood_transfusion: { // 0..*
    type: "number",
    title: "Quantas transfusões de sangue",
    },
    
    blood_transfusion_date: { // Verificar como irá fazer - TECH
    type: "date",
    title: "data",
    },
    
    meds_in_use: { // Verificar os nomes dos medicamentos - MED
    type: "checkbox",
    title: "Medicamentos em uso",
    options:[
        {id: 0,label: "Depressão"},        
        {id: 1,label: "Hipertensão"},              
    ]
    },
    
    meds_description: { // 0..*
    type: "text",
    title: "Descrição dos medicamentos",
    },
                    
    
    // Historia Fisiológica
    primogênito: {
    type: "radio",
    title: "É primogênito?",
    options: [
        {id: 0,label: "Sim"},
        {id: 1,label: "Não"},              
    ]
    },

    brothers: {
    type: "radio",
    title: "Tem irmãos?",
    options: [
        {id: 0,label: "Sim"},
        {id: 1,label: "Não"},              
    ]
    },
    
    amount_brothers: {
    type: "number",
    title: "Quantidade de irmãos",
    },
    
    sexuality: {
    type: "radio",
    title: "Sexualidade",
    options: [
        {id: 0,label: "HSM"},
        {id: 1,label: "MSH"},
        {id: 2,label: "HSH"},
        {id: 3,label: "MSM"},
        {id: 4,label: "HSHM"},
        {id: 5,label: "MSHM"},              
    ]
    },
    
    urinary_volumn: {
    type: "select",
    title: "Volume urinário",
    options:
    [
        {id: "",label: "Normal"},  
        {id: 0,label: "Oligúria"},
        {id: 1,label: "Poliúria"},
        {id: 2,label: "Anúria"},
    ]     
    },
    
    urinary_frequency: {
    type: "checkbox",
    title: "Frequência urinária",
    options:
    [
        {id: 0,label: "Polaciúria"},
        {id: 1,label: "Urgência"},
        {id: 2,label: "Nictúria"},
        {id: 3,label: "Eetenção urinária"},
        {id: 4,label: "Incontinência urinária"},
    ]     
    },      
    
    urinary_aspect: {
    type: "checkbox",
    title: "Aspecto da urina",
    options:
    [
        {id: 0,label: "Avermelhada"},
        {id: 1,label: "Turva"},
        {id: 2,label: "Aumento de espuma"},
        {id: 3,label: "Mau Cheiro"},
    ]     
    },
    
    urinary_changes: {
    type: "checkbox",
    title: "Outras alterações da urina",
    options:
    [
        {id: 0,label: "Dislúria"},
        {id: 1,label: "Hesitação"},
    ]
    },
    
    menarche: { 
    type: "number",
    title: "Idade da menarca",
    },
    
    menstruation_cycle: { 
    type: "number",
    title: "Ciclo mentrual (em dias)",
    },
    
    menopause: { 
    type: "number",
    title: "Idade da menopausa",
    },
            
            contraceptive: {
    type: "radio",
    title: "Usa anticoncenpcionais?",
    options:
    [
        {id: 0, label: "Sim"},
        {id: 1, label: "Não"},
    ]
    },
    
    ligadura_trompa: {
    type: "radio",
    title: "Trompas ligadas",
    options:
    [
        {id: 0, label: "Sim"},
        {id: 1, label: "Não"},
    ]
    },
    
    data_ligadura_trompa: {
    type: "date",
    title: "Data da ligadura",
    },
    
    pregnancy: {
    type: "number",
    title: "Quantas gravidezes?",        
    },
    
    child_birth: {
    type: "number",
    title: "Quantos partos"          
    },
    
    abort:  {
    type: "number",
    title: "Quantos abortos"          
    },
    
    dead_birth:  {
    type: "number",
    title: "Quantos natimortos"          
    },
    
    // Historia familiar
    hist_fam: { // 0..*
    type: "checkbox",
    title: "História familiar",
    options: [
        {id: 0,label: "Enxaqueca"},
        {id: 1,label: "Diabetes"},
        {id: 2,label: "Hipertensão Arterial Sistemica (HAS)"},
        {id: 3,label: "Tuberculose"},
        {id: 4,label: "Cancer"},
        {id: 5,label: "Doenca Arterial Coronariana (DAC)"},
        {id: 6,label: "Acidente Vascular Cerebral (AVC)"},
        {id: 7,label: "Dislipidemias"},
        {id: 8,label: "Varizes"},
    ]
    },
    
    kind_familiar: {
    type: "checkbox",
    title: "Qual familiar tem?",
    options:
    [
        {id: 0,label: "Pai"},
        {id: 1,label: "Mãe"},
        {id: 2,label: "Irmão(a)"},
        {id: 3,label: "Meio irmão(a)"},
        {id: 4,label: "Tio(a) paterno(a)"},
        {id: 5,label: "Tio(a) materno(a)"},
        {id: 6,label: "Avô(ó) paterno(a)"},
        {id: 7,label: "Avô(ó) materno(a)"},
    ]
    },
    
    age_familiar: {
    type: "number",
    title: "Idade do familiar(es)"          
    },
    
    // História psico-social
    title: {
    type: "label",
    value: "História psico-social"
    },

    san_basico: { // 1
    type: "radio",
    title: "Saneamento básico",
    required: "true",
    options: [
        {id: 0,label: "Sim"},
        {id: 1,label: "Não"},
    ]
    },            
    
    socio_econ: { // 1
    type: "select",
    title: "Estado socioeconômico",
    options: [
        {id: "", label: "Escolher"},
        {id: 0,label: "Baixa Renda"},
        {id: 1,label: "Moderada"},
        {id: 2,label: "Renda Alta"},
    ]
    },
    
    religion: { // 1
    type: "select",
    title: "Religião",
    options: [
        {id: "", label: "Escolher"},
        {id: 0,label: "Evangélica"},
        {id: 1,label: "Católica"},
        {id: 2,label: "Espírita"},
        {id: 3,label: "Testemunha de Jeová"},
        {id: 4,label: "Ateu"},
        {id: 5,label: "Outra"},
    ]
    },
    
    escolar: { // 1
    type: "select",
    title: "Escolaridade",
    options: [
        {id: "", label: "Escolher"},
        {id: 0,label: "Ensino Fundamental"},
        {id: 1,label: "Ensino Médio"},
        {id: 2,label: "Ensino Superior"},
    ]
    },
    
    relacao_fam: { // 1
    type: "select",
    title: "Relação familiar",
    required: "true",
    options: [
        {id: "", label: "Escolher"},
        {id: 0,label: "Boa"},
        {id: 1,label: "Mediana"},
        {id: 2,label: "Ruim"},
    ]
    },
    
    // Estilo de vida
    estilo_de_vida: {
    type: "label",
    value: "Estilo de vida",
    },

    alimentacao: { // 0..*
    type: "checkbox",
    title: "Alimentação",
    options: [
        {id: 0,label: "Alimentação quantitativa e qualitativamente adequada"},
        {id: 1,label: "Consumo de calorias acima das necessidades"},
        {id: 2,label: "Alimentação com alto teor de gordura"},
        {id: 3,label: "Baixa ingestão de líquidos"},
        {id: 4,label: "Reduzida ingesta de fibras"},
        {id: 5,label: "Reduzida ingesta de verduras e fruta"},
        {id: 6,label: "Reduzida ingesta de carboidratos   "},
        {id: 7,label: "Reduzida ingesta de proteínas "},
        {id: 8,label: "Reduzido consumo de gordura"},
        {id: 9,label: "Alimentação láctea exclusiva"},
    ]
    },
    
    ativ_fisica: { // 1
    type: "select",
    title: "Atividade física",
    required: "true",
    options: [
        {id: "", label: "Escolher"},
        {id: 0,label: "Pessoas sedentárias"},
        {id: 1,label: "Atividades físicas moderadas"},
        {id: 2,label: "Atividades físicas intensas e constantes"},
        {id: 3,label: "Atividades físicas ocasionais"},
    ]
    },
    
    // Fumo e sua caracterizacao
    fumo: {
    type: "label",
    value: "Fumo e sua caracterização"
    },

    tabagismo: { // 1
    type: "radio",
    title: "Tabagismo",
    required: "true",
    options: [
        {id: 0,label: "Sim"},
        {id: 1,label: "Nao"},
        
    ]
    },
    
    tabag_tipo: { // 0..*
    type: "checkbox",
    title: "Tipo de fumo",
    options: [
        {id: 0,label: "Cigarro"},
        {id: 1,label: "Cachimbo"},
        {id: 2,label: "Charuto"},
        {id: 3,label: "Cigarro de palha"},
    ]
    },
    
    tabag_freq: { // Vezes na semana, mes ou ano
    type: "number",
    title: "Frequencia de fumo (por semana, mês ou ano)"
    },
    
    tabag_quant: { // Numero cigarros por dia
    type: "number",
    title: "Quanto fuma por dia"
    },

    tabag_date: { // Data que comecou fumar
    type: "date",
    title: "Ano que começou a fumar"
    },

    tabag_tempo: { // Tempo que fuma
    type: "number",
    title: "Tempo que fuma",
    required: "true"
    },
    
    tabag_charge:{ // Numero de cigarros por ano
    type: "number",
    title: "Por ano são"
    },
            
    // Alcool e sua caracterizacao
    alcool: {
    type: "label",
    value: "Álcool e sua caracterização",
    },

    etilismo: { // 1
    type: "radio",
    title: "Etilismo",
    required: "true",
    options: [
        {id: 0,label: "Sim"},
        {id: 1,label: "Nao"},
    ]
    },
    
    etil_tipo: { // 0..*
    type: "checkbox",
    title: "Tipo de bebidas",
    options: [
        {id: 0,label: "Cerveja"},
        {id: 1,label: "Vinho"},
        {id: 2,label: "Licor"},
        {id: 3,label: "Vodka"},
        {id: 4,label: "Uisque"},
        {id: 5,label: "Cachaca"},
        {id: 6,label: "Gin"},
    ]
    },
    
    etil_freq: { // Vezes na semana, mes ou ano
    type: "number",
    title: "Ferquência que bebe (por semana, mes ou ano)"
    },
    
    etil_quant: { // Litros por dia
    type: "number",
    title: "Quantidade que bebe por dia"
    },

    etil_date: { // Data que comecou beber
    type: "date",
    title: "Data que começou a beber"
    },

    etil_tempo: { // Tempo que bebe
    type: "number",
    title: "Tempo que bebe"
    },
    
    etil_charge:{ // Numero de litros por ano
    type: "number",
    title: "Por ano são"
    },
    
    // Uso de drogas
    drogas: {
    type: "label",
    value: "uso de drogas",
    },

    uso_drogas: { // 1
    type: "radio",
    title: "Faz uso de drogas",
    options: [
        {id: 0,label: "Sim"},
        {id: 1,label: "Nao"},
    ]
    },
    
    drogas_tipo: { // 0..*
    type: "checkbox",
    title: "Tipo de drogas que utiliza",
    options: [
        {id: 0,label: "Maconha"},
        {id: 1,label: "Cocaina"},
        {id: 2,label: "Crack"},
        {id: 3,label: "Heroína"},
        {id: 4,label: "Ecstasy"},
        {id: 5,label: "LSD"},
        {id: 6,label: "Oxi"},
        {id: 7,label: "Chá de cogumelo"},
                    {id: 8,label: "Inalantes"},              
    ]
    },
    
    drogas_freq: { // Vezes na semana, mes ou ano
    type: "number",
    title: "Frequência que utiliza (por semana, mês ou ano)"
    },
    
    drogas_quant: { // Numero por dia
    type: "number",
    title: "Quantidade que usa (por dia)"
    },

    drogas_date: { // Data que comecou
    type: "number",
    title: "Data que começou a usar"
    },

    drogas_tempo: { // Tempo desde o inicio
    type: "number",
    title: "Tempo que usa"
    },
    
    drogas_charge:{ // Numero de litros por ano
    type: "number",
    title: "Por ano são"
    }
}


Anamnese.data = {
	// Queixa principal
    qp_type: Anamnese.types.void,
    
    // História da Doença Atual
    hda: "",
    
    // História patológica
    
    // Passado
    hist_pat: [],//Anamnese.types.void
    
    commom_childhood: [],//Anamnese.types.void
    
    commom_adult: [],//Anamnese.types.void
    
    commom_cardiac_associated: [],//Anamnese.types.void
    
    allergy: [],//Anamnese.types.void
    
    another_allergy: "",
    
    surgery: [],//Anamnese.types.void
    
    surgery_description: "",
    
    trauma: [],//Anamnese.types.void
    
    blood_transfusion: [],//Anamnese.types.void
    
    blood_transfusion_date: "",
    
    meds_in_use: [],//Anamnese.types.void
    
    meds_description: "",
                    
    
    // Historia Fisiológica
    primogênito: Anamnese.types.void,

    brothers: Anamnese.types.void,
    
    amount_brothers: "",
    
    sexuality: Anamnese.types.void,
    
    urinary_volumn: Anamnese.types.void,
    
    urinary_frequency: Anamnese.types.void,      
    
    urinary_aspect: Anamnese.types.void,
    
    urinary_changes: [],//Anamnese.types.void
    
    menarche: 0,
    
    menstruation_cycle: 0,
    
    menopause: 0,
            
    contraceptive: Anamnese.types.void,
    
    ligadura_trompa: Anamnese.types.void,
    
    data_ligadura_trompa: "",
    
    pregnancy: 0,
    
    child_birth: 0,
    
    abort:  0,
    
    dead_birth: 0,
    
    // Historia familiar
    hist_fam: [],//Anamnese.types.void
    
    kind_familiar: [],//Anamnese.types.void
    
    age_familiar: 0,
    
    // História psico-social
    title: "",

    san_basico: Anamnese.types.void,            
    
    socio_econ: Anamnese.types.void,
    
    religion: Anamnese.types.void,
    
    escolar: Anamnese.types.void,
    
    relacao_fam: Anamnese.types.void,
    
    // Estilo de vida
    estilo_de_vida: "",

    alimentacao: [],//Anamnese.types.void
    
    ativ_fisica: Anamnese.types.void,
    
    // Fumo e sua caracterizacao
    fumo: "",

    tabagismo: Anamnese.types.void,
    
    tabag_tipo: [],//Anamnese.types.void,
    
    tabag_freq: 0,
    
    tabag_quant: 0,

    tabag_date: 0,

    tabag_tempo: 0,
    
    tabag_charge:0,
            
    // Alcool e sua caracterizacao
    alcool: "",

    etilismo: Anamnese.types.void,
    
    etil_tipo: [],//Anamnese.types.void,
    
    etil_freq: 0,
    
    etil_quant: 0,

    etil_date: "",

    etil_tempo: 0,
    
    etil_charge:0,
    
    // Uso de drogas
    drogas: "",

    uso_drogas: Anamnese.types.void,
    
    drogas_tipo: [],//Anamnese.types.void,
    
    drogas_freq: 0,
    
    drogas_quant: 0,

    drogas_date: 0,

    drogas_tempo: 0,
    
    drogas_charge:0,

}


module.exports = Anamnese;