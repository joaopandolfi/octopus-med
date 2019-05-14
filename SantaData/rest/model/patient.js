/*
* Modelo de dados do paciente
* 
* (C) João Carlos Pandolfi Santana - 24/11/2017
* joaopandolfi@gmail.com
*/

var Paciente = {

	//Cabecalho
	model:{ 
		id:"",
		date_register: "",
		date_last_update: "",
		id_register: "", //Id do usuario que registrou o paciente

		//Dados paciente
		nome: "",
		cpf: "",
		rg: "",
		nr_prontuario: 0,
		nr_mv: 0,
		data_nasc: "",
		idade: 0,
		sexo: "",
		etnia: 0, //[Branco, Negro, Pardo, Amarelo]
		tel1: "",
		tel2: "",
		tel_emerg: "",
		cel: "",
		endereco: "",
		nr_same: "",
		nr_sus: "",
		loc: {lat:0,lng:0}
	},


	setData: function(data){

	},

	mapLocalData: function(){

	return [this.id_register,
			this.nome,
			this.cpf,
			this.nr_prontuario,
			this.nr_mv,
			this.data_nasc,
			this.idade,
			this.etnia,
			this.tel1,
			this.tel2,
			this.tel_emerg,
			this.cel,
			this.endereco,
			this.nr_same,
			this.nr_sus]
	},

	mapData: function(data){
		var address = "{pais}; {cidade}; {estado}; {rua}; {numero}; {bairro}; {cep}; {complemento}"
		address = address.replace("{pais}",data.country)
					.replace("{cidade}",data.city)
					.replace("{estado}",data.state)
					.replace("{rua}",data.street)
					.replace("{numero}",data.homeNumber)
					.replace("{bairro}",data.neighborhood)
					.replace("{cep}",data.cep)
					.replace("{complemento}",data.complement)

		var cpf_rg = "{cpf}; {rg}"
		cpf_rg = cpf_rg.replace("{cpf}",data.cpf)
				.replace("{rg}",data.rg)


		return [data.idRegister,
			data.patientName,
			data.cpf,
			data.rg,
			0,//data.nr_prontuario,
			data.mv,
			data.birthDate,
			data.age,
			data.ethnicity,
			data.gender,
			data.tel1,
			data.tel2,
			data.telE,
			data.cel,
			address,
			data.same,
			data.sus]
	}

}

module.exports = Paciente;