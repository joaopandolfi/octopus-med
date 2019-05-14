import React, { Component } from 'react';
import './Bioquimic.css';
import Base64 from '../../../../lib/base64';
import axios from 'axios';
import Creatina from "./creatina/Creatina";
import Sangue from "./sangue/Sangue";


class Bioquimic extends Component {
  constructor(props){
    super(props);
        
		this.handleChange = this.handleChange.bind(this);

    this.state = {
			prepare: {},
			formData: {},
    };
  }
  /*
  componentWillMount() {
	  	
		axios.defaults.baseURL = 'https://31.220.54.251:8443/';
		axios.post(
			"prepare/physicalExams/",
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
		this.props.addNewExam("bioquimic",this.state.formData);
	}

	render(){
		if(this.props.form) {
		return(
			<div className="physicalExams">
				<h3>Bioquímicos:</h3>

				<Creatina form={this.props.form["creatina"]} addNewExam={ this.props.addNewExam }/>
				<Sangue form={this.props.form["sangue"]} addNewExam={ this.props.addNewExam }/>
				{/* <form onSubmit={ this.handleSubmit }>
					<input type="submit" value={"Salvar Exames " + this.props.title}/>
				</form> */}
				
			</div>
		)
		}
		else {
			return ("");
		}
	}
}

export default Bioquimic;