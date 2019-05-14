import React, { Component } from 'react';
import './Cardio.css';
import Base64 from '../../../../lib/base64';
import axios from 'axios';


class Cardio extends Component {
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
			"prepare/cardio/",
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

					//Ritmo cardiovascular
					ritmo: // 1
					[
						{id: 0, label: "Regular"},
						{id: 1, label: "Irregular"},
					],

					//Inpecao cardiovascular
					inspecao: // 1
					[
						{id: 0, label: "Ictus Cordis Visivel"},
						{id: 1, label: "Ictus de VD"},
						{id: 2, label: "Movimento em bascula"},
					],

					//Bulhas
					bulhas: // 1
					[
						{id: 0, label: "B1 e B2"},
						{id: 1, label: "B3"},
						{id: 2, label: "B4"},
						{id: 3, label: "B3 e B4"},
					],

					auscuta: "",

					//Palpacao
					palpacao: // 1..*
					[
						{id: 0, label: "Ictus não palpável"},
						{id: 1, label: "Ictus palpável"},
						{id: 2, label: "Desviado E para Baixo"},
						{id: 3, label: "LHC 5 EIEC"},
					],

					fc: 0,

					pressao_arterial: 0,
					
				},
			},
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
		this.props.addNewExam("cardio",this.state.formData);
	}

	render(){
		if(this.props.form) {
			return(
				<div className="cardio">

					<h3>Cardiovasculares:</h3>
					
						<form onSubmit={ this.handleSubmit }>
					
							<label htmlFor="ritmo">Ritmo</label>
							<select name="ritmo" id="ritmo" onChange={ this.handleChange }>
								<option value="">-- Escolher --</option>
								{
									this.props.form.ritmo.map(
										(row) => {
											return (
												<option key={ row.id } value={ row.id }>{ row.label }</option>
											);
										}
									)						
								}
							</select>
							<br/>

							<label htmlFor="inspecao">Inspeção cardiovascular</label>
							<select name="inspecao" id="inspecao" onChange={ this.handleChange }>
								<option value="">-- Escolher --</option>
								{
									this.props.form.inspecao.map(
										(row) => {
											return (
												<option key={ row.id } value={ row.id }>{ row.label }</option>
											);
										}
									)						
								}
							</select>
							<br/>

							<label htmlFor="bulhas">Bulhas</label>
							<select name="bulhas" id="bulhas" onChange={ this.handleChange }>
								<option value="">-- Escolher --</option>
								{
									this.props.form.bulhas.map(
										(row) => {
											return (
												<option key={ row.id } value={ row.id }>{ row.label }</option>
											);
										}
									)						
								}
							</select>
							<br/>

							<label htmlFor="ausculta">Ausculta:</label>
							<input
								type="text"
								name="ausculta"
								id="ausculta"
								value={ this.state.formData.auscuta }
								onChange={ this.handleChange }		
							/> 
							<br/>

							<label htmlFor="palpacao">Palpação</label>
							<select name="palpacao" id="palpacao" onChange={ this.handleChange }>
								<option value="">-- Escolher --</option>
								{
									this.props.form.palpacao.map(
										(row) => {
											return (
												<option key={ row.id } value={ row.id }>{ row.label }</option>
											);
										}
									)						
								}
							</select>
							<br/>

							<label htmlFor="fc">FC:</label>
							<input
								type="number"
								name="fc"
								id="fc"
								value={ this.state.formData.fc }
								onChange={ this.handleChange }
							/> 
							<br/>

							<label htmlFor="height">Pressão Arterial:</label>
							<input
								type="number"
								name="pressao_arterial"
								id="pressao_arterial"
								value={ this.state.formData.pressao_arterial }
								onChange={ this.handleChange }
							/> 
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

export default Cardio;