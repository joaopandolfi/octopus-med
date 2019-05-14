import React, { Component } from 'react';
import './Creatina.css';
import Base64 from '../../../../../lib/base64';
import axios from 'axios';


class Creatina extends Component {
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
			"prepare/sangue/",
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

					basal: 0.0,
					ultima: 0.0,
					delta: 0.0,
					clearence_atual: 0.0,

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
		this.props.addNewExam("creatina",this.state.formData);
	}

	render(){
		return(
			<div className="creatina">
				<h4>Creatina</h4>

					<form onSubmit={ this.handleSubmit }>
						
						<label htmlFor="creatinaBasal">Creatina Basal:</label>
						<input
							type="number"
							name="creatinaBasal"
							id="creatinaBasal"
							value={ this.state.formData.basal }
							onChange={ this.handleChange }
						/> 
						<br/>

						<label htmlFor="creatinaUltima">Creatina Ultima:</label>
						<input
							type="number"
							name="creatinaUltima"
							id="creatinaUltima"
							value={ this.state.formData.ultima }
							onChange={ this.handleChange }
						/> 
						<br/>

						<label htmlFor="creatinaDelta">Creatina Delta:</label>
						<input
							type="number"
							name="creatinaDelta"
							id="creatinaDelta"
							value={ this.state.formData.delta }
							onChange={ this.handleChange }
						/> 
						<br/>

						<label htmlFor="creatinaClearenceAtual">Creatina Clearence atual:</label>
						<input
							type="number"
							name="creatinaClearenceAtual"
							id="creatinaClearenceAtual"
							value={ this.state.formData.clearence_atual }
							onChange={ this.handleChange }
						/> 
						<br/>
						<input type="submit" value="Salvar Exame de Creatina"/>
						
					</form>
					
			</div>
		)
	}
}

export default Creatina;