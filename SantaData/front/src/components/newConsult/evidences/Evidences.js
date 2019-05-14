import React, { Component } from 'react';
import './Evidences.css';
import Base64 from '../../../lib/base64';
import axios from 'axios';

class Evidences extends Component {
  constructor(props) {
    super(props);
				
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
			prepare: {},
			formData: {},
    };
	}

	componentWillMount() {
		axios.defaults.baseURL = 'https://31.220.54.251:8443/';
		axios.post(
			"prepare/evidences/",
			"data="+Base64.encode({})
		).then(
			(response) => {
				this.setState(
					{
						prepare: response.data.data,
					}
				);
			}
		).catch();

    /* test only */
		this.setState(
			{
				prepare: {

					// Registro de Evidencias
					ev_estado: // 1
					[
						{id: 0,label: "Primeira consulta"},
						{id: 1,label: "Em tratamento"},
						{id: 2,label: "Desistente/Desaparecido"},
						{id: 3,label: "Reinternação"},
					],

					// Tempo do acompanhamento Ambulatorial
					amb_start_time: "", //

					// Data Primeira Consulta
					date_consult: "00/00/0000",

					// Etiologia
					ev_etiologia: // 0..*
					[								
						{id: 0,label: "A Esclarecer"},
						{id: 1,label: "Doença Arterial Coronariana (DAC)"},
						{id: 2,label: "Hipertensão Arterial Sistêmica (HAS)"},
						{id: 3,label: "Cardiomiopatia Dilatada Idiopática"},
						{id: 4,label: "Cardiomiopatia Chagásica"},
						{id: 5,label: "Valvulopatias"},
						{id: 6,label: "Alcoólica"},
						{id: 7,label: "Pós Quimioterapia"},
					],

					// Co-morbidades
					ev_comorbidades: // 0..*
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
					],

					// Eventos Adversos
					ev_adversos: // 0..*
					[
						{id: 0,label: "Infarto Agudo do Miocárdio (IAM)"},
						{id: 1,label: "Acidente Vascular Cerebral (AVC)"},
						{id: 2,label: "Internação (INT)"},
					],

					// Obito
					ev_obito: // 1
					[
						{id: 0,label: "Sim"},
						{id: 1,label: "Nao"},
					],
				},
			}
		);
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
    this.props.saveData("evidences",this.state.formData);
	}

	render(){
		return(
			<div className="Evidences">
				<h2>Evidências</h2>

				<form onSubmit={ this.handleSubmit } >

					<label htmlFor="evidencesRegistry">Queixa principal:</label>
					<select name="evidencesRegistry" id="evidencesResgistry" onChange={ this.handleChange } required >
						<option value="">-- Escolher --</option>
						{
							this.state.prepare.ev_estado.map(
								(ev_estado) => {
									return(
										<option key={ ev_estado.id } value={ ev_estado.id }>{ ev_estado.label }</option>
									)
								}
							)
						}
					</select>
					<br/>

					<label htmlFor="monitoringTime">Tempo de acompanhamento ambulatorial:</label>
					<input
						type="number"
						name="monitoringTime"
						id="monitoringTime"
						value={ this.state.formData.amb_start_time }
						onChange={ this.handleChange }
						required
					/> 
					<br/>

					<label htmlFor="firstVisit">Data da primeira consulta:</label>
					<input
						type="date"
						name="firstVisit"
						id="firstVisit"
						value={ this.state.formData.date_consult }
						onChange={ this.handleChange }
						required
					/> 
					<br/>

					<label htmlFor="etiology">Etiologia</label>
					{ 
						this.state.prepare.ev_etiologia.map(
							(ev_etiologia) => {
								return(
									<div key={ ev_etiologia.id }>
										<input type="checkbox" name="ev_etiologia" value={ ev_etiologia.id } onChange={ this.handleChange } />
										<label htmlFor="">{ ev_etiologia.label }</label>
									</div>
								);
							}
						)
					}
					<br/>

					<label htmlFor="comorbidities">Comorbidades</label>
					{ 
						this.state.prepare.ev_comorbidades.map(
							(ev_comorbidades) => {
								return(
									<div key={ ev_comorbidades.id }>
										<input type="checkbox" name="ev_comorbidades" value={ ev_comorbidades.id } onChange={ this.handleChange } />
										<label htmlFor="">{ ev_comorbidades.label }</label>
									</div>
								);
							}
						)
					}
					<br/>

					<label htmlFor="adverseEvents">Eventos adversos</label>
					{ 
						this.state.prepare.ev_adversos.map(
							(ev_adversos) => {
								return(
									<div key={ ev_adversos.id }>
										<input type="checkbox" name="ev_adversos" value={ ev_adversos.id } onChange={ this.handleChange } />
										<label htmlFor="">{ ev_adversos.label }</label>
									</div>
								);
							}
						)
					}
					<br/>

					<label htmlFor="">Óbito?</label>
					{
						this.state.prepare.ev_obito.map(
							(ev_obito) => {
								return(
									<div key={ ev_obito.id }>
										<input type="radio" name="ev_obito" value={ ev_obito.id } onChange={ this.handleChange }/>
										<label htmlFor="">{ ev_obito.label }</label>
									</div>
								);
							}
						)
					}
					<br/>	

					<input className="Button" type="submit" value={"Salvar "+ this.props.title}/>
					
				</form>
			</div>
		);
	}
}

export default Evidences;
