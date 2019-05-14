import React, { Component } from 'react';
import './Interventions.css';
import Base64 from '../../../lib/base64';
import axios from 'axios';


class Interventions extends Component {
  constructor(props){
    super(props);
        
		this.handleChange = this.handleChange.bind(this);

    this.state = {
			prepare: {},
			formData: {},
    };
  }

  componentWillMount() {
		axios.defaults.baseURL = 'https://31.220.54.251:8443/';
		axios.post(
			"prepare/interventions/",
			{}
		).then(
			(response) => {
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
          //void: {id: -1, label: "Vazio"},
	
					// Tipos de intervenções
					angio:
					[
						{id: 0,label: "Cirurgia de Revascularização do Miocárdio (CRM) prévia"},
						{id: 1,label: "Intervenção Coronária Percutanea (ICP) prévia"},
					],

					implantes: 
					[
						{id: 0,label: "Marcapasso Definitivo (MPD)"},
						{id: 1,label: "Cardiodesfibrilador Implantável (CDI)"},
						{id: 2,label: "Tratamento por Ressincronização Cardíaca (TRC)"},
					]
				}
			},
		);
	} 

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
		this.props.saveData("interventions",this.state.formData);
	}

	render(){
		return(
			<div className="interventions">
				<h2>Intervenções</h2>

					<form onSubmit={ () => this.props.saveData("interventions",this.state.formData) }>
						<h3>Tipos de intervenções</h3>
						
						<label htmlFor="angio">Angio</label>
						{
							this.state.prepare.angio.map(
								(angio) => {
									return (
										<div key={ angio.id }>
											<input type="checkbox" name="angio" value={ angio.id } onChange={ this.handleChange } />
											<label htmlFor="">{ angio.label }</label>
										</div>
									);
								}
							)						
						}
						<br/>

						<label htmlFor="implantes">Implantes</label>
						{
							this.state.prepare.implantes.map(
								(implantes) => {
									return (
										<div key={ implantes.id }>
											<input type="checkbox" name="implantes" value={ implantes.id } onChange={ this.handleChange } />
											<label htmlFor="">{ implantes.label }</label>
										</div>
									);
								}
							)						
						}
						<br/>
						
						<input className="Button" type="submit" value={"Salvar "+ this.props.title}/>
					</form>
					
			</div>
		)
	}
}

export default Interventions;