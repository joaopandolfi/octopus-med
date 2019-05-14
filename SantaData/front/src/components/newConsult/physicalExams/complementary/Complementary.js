import React, { Component } from 'react';
import './Complementary.css';
import Base64 from '../../../../lib/base64';
import axios from 'axios';


class Complementary extends Component {
  constructor(props){
    super(props);
        
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
			prepare: {},
			formData: {},
    };
  }
	/*
  componentWillMount() {

		axios.defaults.baseURL = 'https://31.220.54.251:8443/';
		axios.post(
			"prepare/complementary/",
			{}
		).then(
			function(response) {
				this.setState(
					{
						prepare: response.data.data,
					}
				);
			}
		).catch();

		this.setState(
			{
				prepare: {
					/*
					//ECG
					eletro: // 0..*
					[ 
						{id: 0, label: "Bloqueio de Ramo Direito (BRD)"},
						{id: 1, label: "Bloqueio de Ramo Esquerdo (BRE)"},
						{id: 2, label: "Supra do Segmento ST"},
						{id: 3, label: "Sobrecarga Atrial (SA)"},
						{id: 4, label: "Sobrecargo de Ventrículo (SV)"},
						{id: 5, label: "Flutter Atrial"},
						{id: 6, label: "Fibrilação Atrial (FA)"},
					],

					//Ecocardiograma
					primeira_FE: "", // texto numérico
					primeiro_VE_diast: "",
					primeiro_VE_sist: "",

					ultima_FE: "", // texto numérico
					ultima_VE_diast: "",
					ultima_VE_sist: "",		

					delta_FE: "", // diferença entre ultima_FE - primeira_FE
					delta_VE: "", // diferença entre ultima_VE_sist - primeira_FE_sist
					ps_ap: "", // texto numérico

				},
			}
		);
	} 
	*/

  handleChange(event) {
		const target = event.target;
		const name = target.name;
		const value = target.value

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
		this.props.addNewExam("complementary",this.state.formData);
	}

	render(){

		if(this.props.form) {
		return(
			<div className="complementary">
				<h3>Complementares:</h3>

				<form onSubmit={ this.handleSubmit }>

					<h4 htmlFor="eletro">Eletrocardiograma</h4>
					{ 
						this.props.form.eletro.map(
							(row) => {
								return(
									<div key={ row.id }>
										<input type="checkbox" name="eletro" value={ row.id } onChange={ this.handleChange } />
										<label htmlFor="">{ row.label }</label>
									</div>
								);
							}
						)
					}
					<br/>

					<label htmlFor="primeira_FE">Primeira FE:</label>
					<input
						type="number"
						name="primeira_FE"
						id="primeira_FE"
						value={ this.state.formData.primeira_FE }
						onChange={ this.handleChange }
					/> 
					<br/>

					<label htmlFor="primeiro_VE_diast">Primeiro VE diastólica:</label>
					<input
						type="number"
						name="primeiro_VE_diast"
						id="primeiro_VE_diast"
						value={ this.state.formData.primeiro_VE_diast }
						onChange={ this.handleChange }
					/> 
					<br/>

					<label htmlFor="primeiro_VE_sist">Primeiro VE sistólica:</label>
					<input
						type="number"
						name="primeiro_VE_sist"
						id="primeiro_VE_sist"
						value={ this.state.formData.primeiro_VE_sist }
						onChange={ this.handleChange }
					/> 
					<br/>

					<label htmlFor="ultima_FE">Ultima FE:</label>
					<input
						type="number"
						name="ultima_FE"
						id="ultima_FE"
						value={ this.state.formData.ultima_FE }
						onChange={ this.handleChange }
					/> 
					<br/>

					<label htmlFor="ultimo_VE_diast">Ultimo VE diastólica:</label>
					<input
						type="number"
						name="ultimo_VE_diast"
						id="ultimo_VE_diast"
						value={ this.state.formData.ultimo_VE_diast }
						onChange={ this.handleChange }
					/> 
					<br/>

					<label htmlFor="ultimo_VE_sist">Ultimo VE sistólica:</label>
					<input
						type="number"
						name="ultimo_VE_sist"
						id="ultimo_VE_sist"
						value={ this.state.formData.ultimo_VE_sist }
						onChange={ this.handleChange }
					/> 
					<br/>

					<label htmlFor="delta_FE">Delta FE:</label>
					<br/>
				
					<label htmlFor="delta_VE">Delta VE:</label>
					<br/>
				
					<label htmlFor="ps_ap">Ps Ap:</label>
					<br/>

					<input type="submit" value={"Salvar Exames " + this.props.title}/>

				</form>


			</div>
		)
		}
		else {
			return("");
		}
	}
}

export default Complementary;