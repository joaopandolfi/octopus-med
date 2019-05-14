import React, { Component } from 'react';
import './Sangue.css';
import Base64 from '../../../../../lib/base64';
import axios from 'axios';


class Sangue extends Component {
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

					hemoglobina: 0.0,
					linfocitos: 0.0,
					sodio: 0.0,
					outros: "", // Plain Text

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
		this.props.addNewExam("sangue",this.state.formData);
	}

	render(){
		return(
			<div className="sangue">
				<h4>Sangue</h4>

					<form onSubmit={ this.handleSubmit }>
						
						<label htmlFor="hemoglobina">Hemoglobina:</label>
						<input
							type="number"
							name="hemoglobina"
							id="hemoglobina"
							value={ this.state.formData.hemoglobina }
							onChange={ this.handleChange }
						/> 
						<br/>

						<label htmlFor="linfocitos">Linfócitos:</label>
						<input
							type="number"
							name="linfocitos"
							id="linfocitos"
							value={ this.state.formData.linfocitos }
							onChange={ this.handleChange }
						/> 
						<br/>

						<label htmlFor="sodio">Sódio:</label>
						<input
							type="number"
							name="sodio"
							id="sodio"
							value={ this.state.formData.sodio }
							onChange={ this.handleChange }
						/> 
						<br/>

						<label htmlFor="outros">Outros:</label>
						<input
							type="text"
							name="outros"
							id="outros"
							value={ this.state.formData.outros }
							onChange={ this.handleChange }
						/> 
						<br/>
						<input type="submit" value="Salvar Exame de Sangue"/>
						
					</form>
					
			</div>
		)
	}
}

export default Sangue;