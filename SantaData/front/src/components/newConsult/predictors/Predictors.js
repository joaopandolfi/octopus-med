import React, { Component } from 'react';
import './Predictors.css';
import Base64 from '../../../lib/base64';
import axios from 'axios';


class Predictors extends Component {

    constructor(props){
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
			"prepare/predictors/",
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

    this.setState({

      prepare: {

        geral:{
          morte_subita:[

            {id: 0,label: "Sim"},
            {id: 1,label: "Nao"},
            
          ],
          
          ep_taq:[
            {id: 0,label: "Sim"},
		      	{id: 1,label: "Nao"},
          ],

          disf_vent:[
            {id: 0,label: "Sim"},
            {id: 1,label: "Nao"},
          ]
        },
      }
     })
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
    this.props.saveData("predictors",this.state.formData);
  }
  
  render() {
    return(
      <div className="Predictors">
        <h2>Preditores</h2>

        <form onSubmit={this.handleSubmit}> 


        <label htmlFor="">Morte Subita</label>
					{
						this.state.prepare.geral.morte_subita.map(
							(morte_subita) => {
								return(
									<div key={ morte_subita.id }>
										<input type="radio" name="morte_subita" value={ morte_subita.id } onChange={ this.handleChange }/>
										<label htmlFor="">{ morte_subita.label }</label>
									</div>
								);
							}
						)
          }
         <label htmlFor="">Episódios de Taquicardia</label>
					{
						this.state.prepare.geral.ep_taq.map(
							(ep_taq) => {
								return(
									<div key={ ep_taq.id }>
										<input type="radio" name="ep_taq" value={ ep_taq.id } onChange={ this.handleChange }/>
										<label htmlFor="">{ ep_taq.label }</label>
									</div>
								);
							}
						)
					}
         <label htmlFor="">Disfusão Ventricular</label>
					{
						this.state.prepare.geral.disf_vent.map(
							(disf_vent) => {
								return(
									<div key={ disf_vent.id }>
										<input type="radio" name="disf_vent" value={ disf_vent.id } onChange={ this.handleChange }/>
										<label htmlFor="">{ disf_vent.label }</label>
									</div>
								);
							}
						)
          }

					<input className="Button" type="submit" value={"Salvar "+ this.props.title}/>
          
        </form>

      </div>
    );
  }

}

export default Predictors;