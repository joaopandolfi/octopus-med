import React, { Component } from 'react';
import './General.css';
import Base64 from '../../../../lib/base64';
import axios from 'axios';


class General extends Component {
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
			"prepare/general/",
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

					//void: {id: -1, label: "Vazio"},
					estado: "",

					//Tipos de edemas fisicos 
					edemas: // 1
						[
							{ id: 0, label: "Sem Edema" },
							{ id: 1, label: "+/++++" },
							{ id: 2, label: "++/++++" },
							{ id: 3, label: "+++/++++" },
							{ id: 4, label: "++++/++++" },
						],

					//Auscutas respiratorias
					auscultas_resp: // 1
						[
							{ id: 0, label: "Nenhum" },
							{ id: 1, label: "MV Fisiológico" },
							{ id: 2, label: "Creptações basais" },
							{ id: 3, label: "Creptações difusas" },
						],

					refl_heptojugular:
						[
							{ id: 0, label: "Sim" },
							{ id: 1, label: "Não" },
						],

					turg_jugular:
						[
							{ id: 0, label: "Sim" },
							{ id: 1, label: "Não" },
						],

					ascite:
						[
							{ id: 0, label: "Sim" },
							{ id: 1, label: "Não" },
						],

					peso: 0.0,
					altura: 0.0,
					imc: 0.0, // peso/altura^2 
					//void: {id: -1, label: "Vazio"},
					estado: "",

					//Tipos de edemas fisicos 
					edemas: // 1
						[
							{ id: 0, label: "Sem Edema" },
							{ id: 1, label: "+/++++" },
							{ id: 2, label: "++/++++" },
							{ id: 3, label: "+++/++++" },
							{ id: 4, label: "++++/++++" },
						],

					//Auscutas respiratorias
					auscultas_resp: // 1
						[
							{ id: 0, label: "Nenhum" },
							{ id: 1, label: "MV Fisiológico" },
							{ id: 2, label: "Creptações basais" },
							{ id: 3, label: "Creptações difusas" },
						],

					refl_heptojugular:
						[
							{ id: 0, label: "Sim" },
							{ id: 1, label: "Não" },
						],

					turg_jugular:
						[
							{ id: 0, label: "Sim" },
							{ id: 1, label: "Não" },
						],

					ascite:
						[
							{ id: 0, label: "Sim" },
							{ id: 1, label: "Não" },
						],

					peso: 0.0,
					altura: 0.0,
					imc: 0.0, // peso/altura^2 

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
		this.props.addNewExam("general",this.state.formData);
	}

	render(){
		if(this.props.form) {
			return(
				<div className="general">

					<h3>Gerais:</h3>

						<form onSubmit={ this.handleSubmit }>

							<label htmlFor="state">Estado:</label> <br/>
							<textarea
								className="inputText"
								type="text"
								name="state"
								id="state"
								value={ this.state.formData.estado }
								onChange={ this.handleChange }
							/>
							<br/>
							
							<label htmlFor="edemas">Edemas</label>
							<select name="edema" id="edema" onChange={ this.handleChange }>
								<option value="">-- Escolher --</option>
								{	
									this.props.form.edemas.map(
										(row) => {
											return (
												<option key={ row.id } value={ row.id }>{ row.label }</option>
											);
										}
									)						
								}
							</select>
							<br/>

							<label htmlFor="ascultas_respiratórias">Ascultas respiratorias</label>
							<select name="ascultas_respiratorias" id="ascultas_respiratorias" onChange={ this.handleChange }>
								<option value="">-- Escolher --</option>
								{
									this.props.form.auscultas_resp.map(
										(row) => {
											return (
												<option key={ row.id } value={ row.id }>{ row.label }</option>
											);
										}
									)						
								}
							</select>
							<br/>

							<label htmlFor="refl_heptojugular">Refluxo Hepatojugular</label>
							{ 
								this.props.form.refl_heptojugular.map(
									(row) => {
										return(
											<div key={ row.id }>
												<input type="radio" name="refl_heptojugular" value={ row.id } onChange={ this.handleChange } />
												<label htmlFor="">{ row.label }</label>
											</div>
										);
									}
								)
							}
							<br/>

							<label htmlFor="turg_jugular">Turgência Jugular</label>
							{ 
								this.props.form.turg_jugular.map(
									(row) => {
										return(
											<div key={ row.id }>
												<input type="radio" name="turg_jugular" value={ row.id } onChange={ this.handleChange } />
												<label htmlFor="">{ row.label }</label>
											</div>
										);
									}
								)
							}
							<br/>

							<label htmlFor="ascite">Ascite</label>
							{ 
								this.props.form.ascite.map(
									(row) => {
										return(
											<div key={ row.id }>
												<input type="radio" name="ascite" value={ row.id } onChange={ this.handleChange } />
												<label htmlFor="">{ row.label }</label>
											</div>
										);
									}
								)
							}
							<br/>

							<label htmlFor="weight">Peso:</label>
							<input
								type="number"
								name="weight"
								id="weight"
								value={ this.state.formData.peso }
								onChange={ this.handleChange }
							/> 
							<br/>

							<label htmlFor="height">Altura:</label>
							<input
								type="number"
								name="height"
								id="height"
								value={ this.state.formData.altura }
								onChange={ this.handleChange }
							/> 
							<br/>

							<label htmlFor="imc">IMC:</label>

							<br/>


							<input type="submit" value={"Salvar Exames " + this.props.title}/>

						</form>
						
				</div>
			)
		}
		else{
			return ("");
		}
	}
}


export default General;