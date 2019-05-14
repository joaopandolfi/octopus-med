import React, { Component } from 'react';
import './NewPatient.css';
import Base64 from './../../lib/base64';
import axios from 'axios';
import Intro from './../intro/Intro';

class NewPatient extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.ageCalc = this.ageCalc.bind(this);

    this.state = {
      formData: {
        patientName: '',
        idPatient: '',
        mv: '',
        same:'',
        sus:'',
        birthDate: '',
        age:'',
        gender: '',
        etiny: '',
        tel1: '',
        tel2: '',
        telE: '',
        cel: '',
        cep: '',
        street: '',
        homeNumber:'',
        complement:'',
        neighborhood:'',
        city:'',
        state:'',
        country:'',
      },

      formExhibition:{
        stringAge: "",
      }
    }
  }

  handleChange(event) {
		const target = event.target;
		const name = target.name;
		const value = target.value;
    
		let formData = this.state.formData;
		
		if(target.type === 'checkbox') {
			if(target.checked) {
				/* insere */
				if(formData[name] == null) {
					formData[name] = [value];
				} else {
					formData[name].push(value);
				}
			} else {
				/* remove */
				let index = formData[name].indexOf(value);
				formData[name].splice(index, 1);
			}
		} else {
			formData[name] = value;
		}
		
		this.setState({
			formData: formData,
		});
		console.log("STATE", this.state);
	}
  
  handleSubmit(event) {
    event.preventDefault();

    const formData = this.state.formData;

    const data = Base64.encode(
      {
        idRegister: this.props.userData.user_id,
        name: formData.patientName,
        idPatient: formData.idPatient,
        mv: formData.mv,
        same: formData.same,
        sus: formData.sus,
        birthDate: formData.birthDate,
        age: formData.age,
        gender: formData.gender,
        etiny: formData.etiny, //[Branco, Negro, Pardo, Amarelo, Indefinido]
        tel1: formData.tel1,
        tel2: formData.tel2,
        telE: formData.telE,
        cel: formData.cel,
        cep: formData.cep,
        street: formData.street,
        homeNumber:formData.homeNumber,
        complement: formData.complement,
        neighborhood:formData.neighborhood,
        city:formData.city,
        state:formData.state,
        country:formData.country,
      }
    );

    const url = 'gen/new/patient/'+this.props.userData.user_id+'/'+this.props.userData.hash+'/';

    axios.defaults.baseURL = 'https://31.220.54.251:8443/';
    axios.post(url,"data="+data)
    .then(
      (response) => {
        console.log("RETORNO", response.data);
        if(response.data.success) {
          alert("Paciente cadastrado com sucesso!");
          this.props.switchSection(<Intro userData={ this.props.userData } />);
        } else if(response.data.error) {
          alert("Não foi possível cadastrar o paciente, tente novamente.");
        }
      }
    )
    .catch(
      function(error) {
        console.log("ERRO", error);
      }
    );
  }

  ageCalc(date){
    
    var birthDate = new Date(date);
    var todayDate = new Date;
    var totalDays = "";
    var days = "";
    var months = "";
    var years = "";

    if (this.handleChange && this.state.formData.birthDate) {

      totalDays = ((todayDate.getTime() - birthDate.getTime()) / 86400000);

      if (totalDays < 0) {
        alert("Por favor, digite uma data válida!")
        this.state.formExhibition.stringAge = "Data inválida";
      }

      else {

        years = Math.floor(totalDays / 365);

        months = Math.floor((totalDays % 365) / 30);

        days = Math.floor(((totalDays % 365) % 30)) ;
        
        this.state.formData.age = years;

        this.state.formExhibition.stringAge = years + " Anos, " + months + " Meses e " + days + " Dias."
        
      }
    }

    else {
      this.state.formExhibition.stringAge = "Data inválida"
    }

  }


  render() {
    return(

    <div className="wrap">
      <div className="NewPatient" >

        <div className="NewPatientHead">
        </div>

        <h2>Novo Paciente</h2>

          <form onSubmit={ this.handleSubmit } >

            
            <label htmlFor="patientName">Nome</label>
            <div className="wrap-input100 validate-input m-b-16">
            <input
              className="input100 textInput"
              type="text"
              name="patientName"
              id="patientName"
              placeholder="Nome"
              value={ this.state.formData.patientName }
              onChange={ this.handleChange }
              required
            /> 
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                <span className="fas fa-user"></span>
                </span>
            </div>

            <label htmlFor="idPatient">CPF ou Identidade</label>
            <div className="wrap-input100 validate-input m-b-16">
            <input
              className="input100 textInput"
              type="number"
              name="idPatient"
              id="idPatient"
              placeholder="CPF ou Identidade"
              value={ this.state.formData.idPatient }
              onChange={ this.handleChange }
            /> 
            <span className="focus-input100"></span>
                <span className="symbol-input100">
                <span className="fas fa-address-card"></span>
                </span>
            </div>

            <label htmlFor="mv">Número MV</label>
            <div className="wrap-input100 validate-input m-b-16">

            <input
              className="input100 textInput"
              type="number"
              name="mv"
              id="mv"
              placeholder="Número MV"
              value={ this.state.formData.mv }
              onChange={ this.handleChange }
              required
            /> 
            <span className="focus-input100"></span>
                <span className="symbol-input100">
                <span className="fas fa-sort-numeric-down"></span>
                </span>
            </div>

            <label htmlFor="same">Número SAME</label>
            <div className="wrap-input100 validate-input m-b-16">

            <input
              className="input100 textInput"
              type="number"
              name="same"
              id="same"
              placeholder="Número SAME"
              value={ this.state.formData.same }
              onChange={ this.handleChange }
              required
            /> 
            
            <span className="focus-input100"></span>
                <span className="symbol-input100">
                <span className="fas fa-sort-numeric-down"></span>
                </span>
            </div>



            <label htmlFor="same">Cartão do SUS</label>
            <div className="wrap-input100 validate-input m-b-16">

            <input
              className="input100 textInput"
              type="number"
              name="sus"
              id="sus"
              placeholder="Cartão do SUS"
              value={ this.state.formData.sus}
              onChange={ this.handleChange }
              required
            /> 
            
            <span className="focus-input100"></span>
                <span className="symbol-input100">
                <span className="fas fa-sort-numeric-down"></span>
                </span>
            </div>
          
          
            <label htmlFor="birthDate">Data de Nascimento</label>
            <div className="wrap-input100 validate-input m-b-16">
            <input
              className="input100 textInput"
              type="date"
              name="birthDate"
              id="birthDate"
              placeholder="Data de Nascimento"
              value={ this.state.formData.birthDate }
              onChange={ this.handleChange }
              required
            /> 
            <span className="focus-input100"></span>
                <span className="symbol-input100">
                <span className="fas fa-birthday-cake"></span>
            </span>
            </div>

            { this.ageCalc(this.state.formData.birthDate)  }
      
            <label htmlFor="age">Idade</label>
            <div className="wrap-input100 m-b-16">
            <input
              className="input100 textInput"
              type="text"
              name="age"
              id="age"
              placeholder="Idade"
              value= { this.state.formExhibition.stringAge }
              onChange={ this.handleChange }
              required
              readOnly
            /> 
            <span className="focus-input100"></span>
            <span className="symbol-input100">
                <span className="fas fa-sort-numeric-down"></span>
                </span>
            </div>
           
            {/* TODO: Acertar o estilo desses campos */}

            <label htmlFor="" id="Up">Sexo </label>
            <br/>
            <input type="radio" name="gender" id="gender" value="M" onChange={ this.handleChange } /><strong> Masculino</strong>
            <input type="radio" name="gender" id="gender" value="F" onChange={ this.handleChange } /><strong> Feminino</strong>
            <br/>

            <label htmlFor="etiny" id="Up">Etnia </label>
            <br/>
            <select name="etiny" id="etiny" onChange={ this.handleChange } >
              <option value="">-- Escolher --</option>
              <option value="0">Branco</option>
              <option value="1">Negro</option>
              <option value="2">Pardo</option>
              <option value="3">Amarelo</option>
              <option value="4">Indefinido</option>
            </select>
            <br/>
            <br/>

            {/* Até aqui */}

            <label htmlFor="tel1">Telefone</label>
            <div className="wrap-input100 validate-input m-b-16">
            <input
              className="input100 textInput"
              type="tel"
              name="tel1"
              id="tel1"
              placeholder="Telefone"
              value={ this.state.formData.tel1 }
              onChange={ this.handleChange }
            /> 
            <span className="focus-input100"></span>
                <span className="symbol-input100">
                <span className="fas fa-phone"></span>
                </span>
            </div>


            <label htmlFor="cel">Celular</label>
            <div className="wrap-input100 validate-input m-b-16">
            <input 
              className="input100 textInput"
              type="tel"
              name="cel"
              id="cel"
              placeholder="Celular"
              value={ this.state.formData.cel }
              onChange={ this.handleChange }
            /> 
            <span className="focus-input100"></span>
                <span className="symbol-input100">
                <span className="fas fa-mobile"></span>
                </span>
            </div>

            <label htmlFor="telE">Contato de Emergência</label>
            <div className="wrap-input100 validate-input m-b-16">
            <input
              className="input100 textInput"
              type="tel"
              name="telE"
              id="telE"
              placeholder="Contato de Emergência"
              value={ this.state.formData.telE }
              onChange={ this.handleChange }
              required
            /> 
            <span className="focus-input100"></span>
                <span className="symbol-input100">
                <span className="fas fa-ambulance"></span>
                </span>
            </div>

            <label htmlFor="cep">CEP</label>
            <div className="wrap-input100 validate-input m-b-16">
            <input
              className="input100 textInput"
              type="number"
              name="cep"
              id="cep"
              placeholder="CEP"
              value={ this.state.formData.cep }
              onChange={ this.handleChange }
              required
            /> 
            <span className="focus-input100"></span>
                <span className="symbol-input100">
                <span className="fas fa-map-marker-alt"></span>
                </span>
            </div>

            <label htmlFor="street">Rua / Alameda / Avenida</label>
            <div className="wrap-input100 validate-input m-b-16">
            <input
              className="input100 textInput"
              type="text"
              name="street"
              id="street"
              placeholder="Rua / Alameda / Avenida"
              value={ this.state.formData.street }
              onChange={ this.handleChange }
              required
            /> 
            <span className="focus-input100"></span>
                <span className="symbol-input100">
                <span className="fas fa-map-marker-alt"></span>
                </span>
            </div>

            <label htmlFor="homeNumber">Número da residência</label>
            <div className="wrap-input100 validate-input m-b-16">
            <input
              className="input100 textInput"
              type="number"
              name="homeNumber"
              id="homeNumber"
              placeholder="Número"
              value={ this.state.formData.homeNumber }
              onChange={ this.handleChange }
              required
            /> 
            <span className="focus-input100"></span>
                <span className="symbol-input100">
                <span className="fas fa-map-marker-alt"></span>
                </span>
            </div>

            <label htmlFor="complement">Complemento / Bloco + Apartamento</label>
            <div className="wrap-input100 validate-input m-b-16">
            <input
              className="input100 textInput"
              type="text"
              name="complement"
              id="complement"
              placeholder="Ex: Perto da praça do Papa / 601"
              value={ this.state.formData.complement }
              onChange={ this.handleChange }
              required
            /> 
            <span className="focus-input100"></span>
                <span className="symbol-input100">
                <span className="fas fa-map-marker-alt"></span>
                </span>
            </div>

            <label htmlFor="neighborhood">Bairro</label>
            <div className="wrap-input100 validate-input m-b-16">
            <input
              className="input100 textInput"
              type="text"
              name="neighborhood"
              id="neighborhood"
              placeholder="Bairro"
              value={ this.state.formData.neighborhood }
              onChange={ this.handleChange }
              required
            /> 
            <span className="focus-input100"></span>
                <span className="symbol-input100">
                <span className="fas fa-map-marker-alt"></span>
                </span>
            </div>

            <label htmlFor="city">Cidade</label>
            <div className="wrap-input100 validate-input m-b-16">
            <input
              className="input100 textInput"
              type="text"
              name="city"
              id="city"
              placeholder="Cidade"
              value={ this.state.formData.city }
              onChange={ this.handleChange }
              required
            /> 
            <span className="focus-input100"></span>
                <span className="symbol-input100">
                <span className="fas fa-map-marker-alt"></span>
                </span>
            </div>

            <label htmlFor="state">Estado</label>
            <div className="wrap-input100 validate-input m-b-16">
            <input
              className="input100 textInput"
              type="text"
              name="state"
              id="state"
              placeholder="Estado"
              value={ this.state.formData.state }
              onChange={ this.handleChange }
              required
            /> 
            <span className="focus-input100"></span>
                <span className="symbol-input100">
                <span className="fas fa-map-marker-alt"></span>
                </span>
            </div>

            <label htmlFor="country">País</label>
            <div className="wrap-input100 validate-input m-b-16">
            <input
              className="input100 textInput"
              type="text"
              name="country"
              id="country"
              placeholder="País"
              value={ this.state.formData.country }
              onChange={ this.handleChange }
              required
            /> 
            <span className="focus-input100"></span>
                <span className="symbol-input100">
                <span className="fas fa-map-marker-alt"></span>
                </span>
            </div>

            <input id="Save" className="Button" type="submit" value="Salvar"/>

          </form>
      </div>
      </div>
    );
  }
}

export default NewPatient;

/* 
  nome: "",
	nr_prontuario: 0,
	nr_mv: 0,
	data_nasc: "",
	idade: 0,
	sexo: "",
	etnia: 0, //[Branco, Negro, Pardo, Amarelo, Indefinido]
	tel1: "",
	tel2: "",
	tel_emerg: "",
  cel: "",
  
	endereco: "",
*/