import React, { Component } from 'react';
import './Anamnese.css';
import Base64 from './../../../lib/base64';
import axios from 'axios';

class Anamnese extends Component {
  constructor(props){
		super(props);
		
		this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    this.state = {
			prepare: null,
			formData: {},
    };
	}
	
	componentDidMount() {
		axios.defaults.baseURL = 'https://31.220.54.251:8443/';
		axios.post(
			"prepare/anamnese/",
			"data="+Base64.encode({})
		).then(
			(response) => {
        console.log("ANAMNESE THEN",response.data.data);
				this.setState(
					{
						prepare: response.data.data,
					}
        );
			}
		).catch(
			function(error) {
				console.log("AXIOS ERROR:",error);
			}
		);
    
		/* test only */
		/* this.setState(
			{
				prepare: {
          
					// Queixa principal
					qp_type: // 1
					[
						{id: 0, label: "Dor torácica"},
						{id: 1, label: "Dispneia"},
						{id: 2, label: "Síncope"},
						{id: 3, label: "Palpitações"},
					],
          
					// História da Doença Atual
					hda: "", 
          
					// História patológica
					hist_pat: // 0..*
					[
						{id: 0,label: "Falta de aderência ao tratamento"},
						{id: 1,label: "Maior intensidade dos sintomas"},
						{id: 2,label: "Parada cardio-respiratória revertida"},
						{id: 3,label: "Redução de função cognitiva"},
						{id: 4,label: "Caquexia"},
						{id: 5,label: "Anorexia"},
						{id: 6,label: "Síncope"},
						{id: 7,label: "Apnéia do sono*"},
						{id: 8,label: "Doença pulmonar associada"},
						{id: 9,label: "Depressão"},
					],
          
					// Historia Fisiológica
					hist_fis: // 1
					[
						{id: 0,label: "Oligúria"},
						{id: 1,label: "Anúria"},
						{id: 2,label: "Poliúria"},
						{id: 3,label: "Polaciúria"},
						{id: 4,label: "Nictúria"},
						{id: 5,label: "Urgência"},
						{id: 6,label: "Retenção Urinária"},
						{id: 7,label: "Incontinência Urinária"},
					],
          
					// Historia familiar
					hist_fam: // 0..*
					[
						{id: 0,label: "Enxaqueca"},
						{id: 1,label: "Diabetes"},
						{id: 2,label: "Hipertensão Arterial Sistemica (HAS)"},
						{id: 3,label: "Tuberculose"},
						{id: 4,label: "Cancer"},
						{id: 5,label: "Doenca Arterial Coronariana (DAC)"},
						{id: 6,label: "Acidente Vascular Cerebral (AVC)"},
						{id: 7,label: "Dislipidemias"},
						{id: 8,label: "Varizes"},
					],
          
					// História psico-social
					san_basico: // 1
					[
						{id: 0,label: "Sim"},
						{id: 1,label: "Não"},
					],			
          
					socio_econ: // 1
					[
						{id: 0,label: "Baixa Renda"},
						{id: 1,label: "Moderada"},
						{id: 2,label: "Renda Alta"},
					],
          
					cultural: // 1
					[
						{id: 0,label: "Evangélica"},
						{id: 1,label: "Católica"},
						{id: 2,label: "Espírita"},
						{id: 3,label: "Testemunha de Jeová"},
						{id: 4,label: "Ateu"},
						{id: 5,label: "Outra"},
					],
          
					escolar: // 1
					[
						{id: 0,label: "Ensino Fundamental"},
						{id: 1,label: "Ensino Médio"},
						{id: 2,label: "Ensino Superior"},
					],
          
					relacao_fam: // 1
					[
						{id: 0,label: "Boa"},
						{id: 1,label: "Mediana"},
						{id: 2,label: "Ruim"},
					],
          
					// Estilo de vida
					alimentacao: // 0..*
					[
						{id: 0,label: "Alimentação quantitativa e qualitativamente adequada"},
						{id: 1,label: "Consumo de calorias acima das necessidades"},
						{id: 2,label: "Alimentação com alto teor de gordura"},
						{id: 3,label: "Baixa ingestão de líquidos"},
						{id: 4,label: "Reduzida ingesta de fibras"},
						{id: 5,label: "Reduzida ingesta de verduras e fruta"},
						{id: 6,label: "Reduzida ingesta de carboidratos	"},
						{id: 7,label: "Reduzida ingesta de proteínas "},
						{id: 8,label: "Reduzido consumo de gordura"},
						{id: 9,label: "Alimentação láctea exclusiva"},
					],
          
					ativ_fisica: // 1
					[
						{id: 0,label: "Pessoas sedentárias"},
						{id: 1,label: "Pessoas que exercem atividades físicas moderadas"},
						{id: 2,label: "Pessoas que exercem atividades físicas intensas e constantes"},
						{id: 3,label: "Pessoas que exercem atividades físicas ocasionais"},
            
					],
          
					// Fumo e sua caracterizacao
					tabagismo: // 1
					[
						{id: 0,label: "Sim"},
						{id: 1,label: "Nao"},
            
					],
          
					tabag_tipo: // 0..*
					[
						{id: 0,label: "Cigarro"},
						{id: 1,label: "Cachimbo"},
						{id: 2,label: "Charuto"},
						{id: 3,label: "Cigarro de palha"},
					],
          
					tabag_quant: "", // Numero cigarros por dia 
					tabag_freq: "", // Vezes na semana, mes ou ano
					tabag_date: "", // Data que comecou fumar
					tabag_tempo: "", // Tempo que fuma
					
					// Alcool e sua caracterizacao 
					etilismo: // 1
					[
						{id: 0,label: "Sim"},
						{id: 1,label: "Nao"},
					],
          
					etil_tipo: // 0..*
					[
						{id: 0,label: "Cerveja"},
						{id: 1,label: "Vinho"},
						{id: 2,label: "Licor"},
						{id: 3,label: "Vodka"},
						{id: 4,label: "Uisque"},
						{id: 5,label: "Cachaca"},
						{id: 6,label: "Gin"},
					],
          
					etil_quant: "", // Litros por dia 
					etil_freq: "", // Vezes na semana, mes ou ano
					etil_date: "", // Data que comecou beber
					etil_tempo: "", // Tempo que bebe
          
          
					// Uso de drogas
					uso_drogas: // 1
					[
						{id: 0,label: "Sim"},
						{id: 1,label: "Nao"},
					],
          
					drogas_tipo: // 0..*
					[
						{id: 0,label: "Cigarro"},
						{id: 1,label: "Cachimbo"},
						{id: 2,label: "Charuto"},
						{id: 3,label: "Cigarro de palha"},
					],
          
					drogas_quant: "", // Numero por dia 
					drogas_freq: "", // Vezes na semana, mes ou ano
					drogas_date: "", // Data que comecou 
					drogas_tempo: "", // Tempo desde o inicio
          
				},
			}
		); */
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
		this.props.saveData("anamnese",this.state.formData);
	}
  
	render(){
    if(!this.state.prepare){
      return ( <div>LOADING</div> );
    }
		return(
			<div className="Anamnese">
        <h2>Anamnese</h2>
        
        <form onSubmit={ this.handleSubmit  } >
        
          <label htmlFor="qp_type">Queixa principal:</label>
          <select name="qp_type" id="qp_type" onChange={ this.handleChange }  >
            <option value="">-- Escolher --</option>
            {
              this.state.prepare.qp_type.map(
                (qp_type) => {
                  return(
                    <option key={ qp_type.id } value={ qp_type.id }>{ qp_type.label }</option>
                  );
                }
              )
            }
          </select>
          <br/>
          
          <label htmlFor="actualDiseaseHistory">História da doença atual:</label>
          <br/>
          <textarea
            className="inputText "
            type="text"
            name="actualDiseaseHistory"
            id="actualDiseaseHistory"
            value={ this.state.formData.hda }
            onChange={ this.handleChange }
          
          />
          <br/>
          
          <label htmlFor="hist_pat">História patológica:</label>
          { 
            this.state.prepare.hist_pat.map(
              (hist_pat) => {
                return(
                  <div key={ hist_pat.id }>
                  <input type="checkbox" name="hist_pat" value={ hist_pat.id } onChange={ this.handleChange } />
                  <label htmlFor="">{ hist_pat.label }</label>
                  </div>
                );
              }
            )
          }
          <br/>
          
          <label htmlFor="fisiologicHistory">História fisiológica:</label>
          <select name="hist_fis" id="fisiologicHistory" onChange={ this.handleChange }  >
            <option value="">-- Escolher --</option>
            {
              this.state.prepare.hist_fis.map(
                (hist_fis) => {
                  return(
                    <option key={ hist_fis.id } value={ hist_fis.id }>{ hist_fis.label }</option>
                  );
                }
              )
            }
          </select>
          <br/>
          
          <label htmlFor="hist_fam">História familiar:</label>
          { 
            this.state.prepare.hist_fam.map(
              (hist_fam) => {
                return(
                  <div key={ hist_fam.id }>
                  <input type="checkbox" name="hist_fam" value={ hist_fam.id } onChange={ this.handleChange } />
                  <label htmlFor="">{ hist_fam.label }</label>
                  </div>
                );
              }
            )
          }
          <br/>
          
          <label htmlFor="">Possui Saneamento básico? </label>
          {
            this.state.prepare.san_basico.map(
              (san_basico) => {
                return(
                  <div key={ san_basico.id }>
                  <input type="radio" name="san_basico" value={ san_basico.id } onChange={ this.handleChange }/>
                  <label htmlFor="">{ san_basico.label }</label>
                  </div>
                );
              }
            )
          }
          <br/>
          
          <label htmlFor="economicSituation">Situação econômica:</label>
          <select name="economicSitiation" id="economicSituation" onChange={ this.handleChange }  >
            <option value="">-- Escolher --</option>
            {
              this.state.prepare.socio_econ.map(
                (socio_econ) => {
                  return(
                    <option key={ socio_econ.id } value={ socio_econ.id }>{ socio_econ.label }</option>
                  )
                }
              )
            }
          </select>
          <br/>
          
          <label htmlFor="religion">Religião:</label>
          <select name="religion" id="religion" onChange={ this.handleChange }  >
            <option value="">-- Escolher --</option>
            {
              this.state.prepare.cultural.map(
                (cultural) => {
                  return(
                    <option key={ cultural.id } value={ cultural.id }>{ cultural.label }</option>
                  )
                }
              )
            }
          </select>
          <br/>
          
          <label htmlFor="educationSituation">Situação educacional:</label>
          <select name="educationSitiation" id="educationSituation" onChange={ this.handleChange }  >
            <option value="">-- Escolher --</option>
            {
              this.state.prepare.socio_econ.map(
                (escolar) => {
                  return(
                    <option key={ escolar.id } value={ escolar.id }>{ escolar.label }</option>
                  )
                }
              )
            }
          </select>
          <br/>
          
          <label htmlFor="familiarRelationship">Relação familiar:</label>
          <select name="familiarRelationship" id="familiarRelationship" onChange={ this.handleChange }  >
          <option value="">-- Escolher --</option>
            {
              this.state.prepare.relacao_fam.map(
                (relacao_fam) => {
                  return(
                    <option key={ relacao_fam.id } value={ relacao_fam.id }>{ relacao_fam.label }</option>
                  )
                }
              )
            }
          </select>
          <br/>
          
          <h3>Estilo de vida</h3>
          
          <label htmlFor="feeding">Alimentação:</label>
          {
            this.state.prepare.alimentacao.map(
              (alimentacao) => {
                return(
                  <div key={ alimentacao.id }>
                  <input type="checkbox" name="alimentacao" value={ alimentacao.id } onChange={ this.handleChange }/>
                  <label htmlFor="">{ alimentacao.label }</label>
                  </div>
                );
              }
            )
          }
          <br/>
          
          <label htmlFor="physicalActivity">Atividades físicas:</label>
          <select name="physicalActivity" id="physicalActivity" onChange={ this.handleChange }  >
            <option value="">-- Escolher --</option>
            {
              this.state.prepare.ativ_fisica.map(
                (ativ_fisica) => {
                  return(
                    <option key={ ativ_fisica.id } value={ ativ_fisica.id }>{ ativ_fisica.label }</option>
                  )
                }
              )
            }
          </select>
          <br/>
          
          <h3>Fumo</h3>
          
          <label htmlFor="">Faz uso?</label>
          {
            this.state.prepare.tabagismo.map(
              (tabagismo) => {
                return(
                  <div key={ tabagismo.id }>
                  <input type="radio" name="tabagismo" value={ tabagismo.id } onChange={ this.handleChange }/>
                  <label htmlFor="">{ tabagismo.label }</label>
                  </div>
                );
              }
            )
          }
          <br/>
          
          <label htmlFor="smoke">Tipos de fumo:</label>
          {
            this.state.prepare.tabag_tipo.map(
              (tabag_tipo) => {
                return(
                  <div key={ tabag_tipo.id }>
                  <input type="checkbox" name="tabag_tipo" value={ tabag_tipo.id } onChange={ this.handleChange }/>
                  <label htmlFor="">{ tabag_tipo.label }</label>
                  </div>
                );
              }
            )
          }
          <br/>
          
          <label htmlFor="dailyCigaretteAmount">Quantidade diária:</label>
          <input
            type="number"
            name="dailyCigaretteAmount"
            id="dailyCigaretteAmount"
            value={ this.state.formData.tabag_quant }
            onChange={ this.handleChange }
          /> 
          <br/>
          
          <label htmlFor="smokingFrequency">Frequencia e quantidade de fumo:</label>
          <input
            type="text"
            name="smokingFrequency"
            id="smokingFrequency"
            value={ this.state.formData.tabag_freq }
            onChange={ this.handleChange }		
          /> 
          <br/>
          
          <label htmlFor="startSmoking">Data de início:</label>
          <input
            type="date"
            name="startSmoking"
            id="startSmoking"
            value={ this.state.formData.tabag_date }
            onChange={ this.handleChange }	
          /> 
          <br/>
          
          <label htmlFor="smokingTime">Tempo que fuma:</label>
          <input
            type="text"
            name="smokingTime"
            id="smokingTime"
            value={ this.state.formData.tabag_tempo }
            onChange={ this.handleChange }
          /> 
          <br/>
          
          <h3>Alcool</h3>
          
          <label htmlFor="">Faz uso?</label>
          {
            this.state.prepare.etilismo.map(
              (etilismo) => {
                return(
                  <div key={ etilismo.id }>
                  <input type="radio" name="etilismo" value={ etilismo.id } onChange={ this.handleChange }/>
                  <label htmlFor="">{ etilismo.label }</label>
                  </div>
                );
              }
            )
          }
          <br/>
          
          <label htmlFor="alcoholicBeverages">Tipos de bebidas:</label>
          {
            this.state.prepare.etil_tipo.map(
              (etil_tipo) => {
                return(
                  <div key={ etil_tipo.id }>
                  <input type="checkbox" name="etil_tipo" value={ etil_tipo.id } onChange={ this.handleChange }/>
                  <label htmlFor="">{ etil_tipo.label }</label>
                  </div>
                );
              }
            )
          }	
          <br/>
          
          <label htmlFor="dailyAlcoholicBevAmount">Quantidade diária:</label>
          <input
            type="text"
            name="dailyAlcoholicBevAmount"
            id="dailyAlcoholicBevAmount"
            value={ this.state.formData.etil_quant }
            onChange={ this.handleChange }
          /> 
          <br/>
          
          <label htmlFor="alcoholicBevFrequency">Frequencia e quantidade de bebidas alcólicas:</label>
          <input
            type="text"
            name="alcoholicBevFrequency"
            id="alcoholicBevFrequency"
            value={ this.state.formData.etil_freq }
            onChange={ this.handleChange }
          /> 
          <br/>
          
          <label htmlFor="startDrinking">Data de início:</label>
          <input
            type="date"
            name="startDrinking"
            id="startDrinking"
            value={ this.state.formData.etil_date }
            onChange={ this.handleChange }
          /> 
          <br/>
          
          <label htmlFor="drinkingTime">Tempo que bebe:</label>
          <input
            type="text"
            name="drinkingTime"
            id="drinkingTime"
            value={ this.state.formData.etil_tempo }
            onChange={ this.handleChange }
          /> 
          <br/>
          
          <h3>Drogas</h3>
          
          <label htmlFor="">Faz uso?</label>
          {
            this.state.prepare.uso_drogas.map(
              (uso_drogas) => {
                return(
                  <div key={ uso_drogas.id }>
                  <input type="radio" name="uso_drogas" value={ uso_drogas.id } onChange={ this.handleChange }/>
                  <label htmlFor="">{ uso_drogas.label }</label>
                  </div>
                );
              }
            )
          }
          <br/>
          
          <label htmlFor="smoke">Tipos de drogas:</label>
          {
            this.state.prepare.drogas_tipo.map(
              (drogas_tipo) => {
                return(
                  <div key={ drogas_tipo.id }>
                  <input type="checkbox" name="drogas_tipo" value={ drogas_tipo.id } onChange={ this.handleChange }/>
                  <label htmlFor="">{ drogas_tipo.label }</label>
                  </div>
                );
              }
            )
          }	
          <br/>
          
          <label htmlFor="dailyDrugsAmount">Quantidade diária:</label>
          <input
            type="number"
            name="dailyDrugsAmount"
            id="dailyDrugsAmount"
            value={ this.state.formData.drogas_quant }
            onChange={ this.handleChange }
          /> 
          <br/>
          
          <label htmlFor="drugsFrequency">Frequencia e quantidade das drogas:</label>
          <input
            type="text"
            name="drugsFrequency"
            id="drugsFrequency"
            value={ this.state.formData.drogas_freq }
            onChange={ this.handleChange }
          /> 
          <br/>
          
          <label htmlFor="startDrugs">Data de início:</label>
          <input
            type="date"
            name="startDrugs"
            id="startDrugs"
            value={ this.state.formData.drogas_date }
            onChange={ this.handleChange }
          /> 
          <br/>
          
          <label htmlFor="drugsTime">Tempo:</label>
          <input
            type="number"
            name="drugsTime"
            id="drugsTime"
            value={ this.state.formData.drogas_tempo }
            onChange={ this.handleChange }
          /> 
          <br/>
          
          <input className="Button" type="submit" value={"Salvar "+ this.props.title}/>
        
        </form>
			</div>
		)
	}
}

export default Anamnese;
