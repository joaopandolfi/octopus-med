import React, { Component } from 'react';
import './Medicines.css';
import Form from './../../form/Form';
import Select from './../../form/select/Select';

/*
  Medicines retorna um array com os medicamentos adicionados.
  medicines: [
    0: {
      name: text,
      type: numeric,
      date: date,
      charge: numeric,
      gap: numeric,
      hour: [0, 2]
    },
    1: {

    },
  ]
*/

class Medicines extends Component {
  constructor(props){
    super(props);
    
    /* METHODS */
		this.storeMedicine = this.storeMedicine.bind(this);
		this.selectMedicine = this.selectMedicine.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.mountInputList = this.mountInputList.bind(this);
    this.mountSelectOptions = this.mountSelectOptions.bind(this);
    
    /* VARS */
    this.InputList = {};
    this.SelectOptions = [];
    
    /* STATE */
    this.state = {
			prepare: null,
			storedMeds: [],
      selectedMedicine: "IECA",
      InputList: null
    };
  }
  
  componentDidMount() {
    /*
		axios.defaults.baseURL = 'https://31.220.54.251:8443/';
		axios.post(
			"prepare/medicines/",
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
		*/
    this.setState(
      {
        prepare: {
          //Medicamentos ministrados no paciente
              
          commom: {
            date: {
                type: "date", // data
                title: "Data",
            },
                  
            charge: {
              type: "number", // mg
              title: "Carga",
              unity: "mg",
            },
                  
            gap: {
              type: "number", // horas
              title: "Intervalo",
              unity: "h",
            },
                  
            // Acrescentar momento do dia 0*...
                  
            // 0...*
            hour: {
              type: "checkbox",
              title: "Horários",
              options: [
                {id: 0,label: "Manhã"}, 
                {id: 1,label: "Após o almoço"},
                {id: 2,label: "Tarde"},
                {id: 3,label: "Noite"},
              ],
            }
          },

          IECA: {
            title: {
              type: "label",
              value: "IECA"
            },
            
            type: {
              type: "select",
              title: "Tipo",
              options:[
                {id: "",label: "Escolher"},
                {id: 0,label: "Captopril",dose_inicial:"6,24",dose_alvo:"50",intervalo:"8"},
                // Dose inicial = 6,24mg 
                // Dose alvo = 50mg 
                // Duração = 8h/8h
                {id: 1,label: "Enalapril",dose_inicial:"2,5",dose_alvo:"10",intervalo:"12"},
                // Dose inicial = 2,5mg 
                // Dose alvo = 10mg 
                // Duração 12/12h
                {id: 2,label: "Lisinopril"},
                {id: 3,label: "Cilazapril"},
                {id: 4,label: "Ramipril"},
                {id: 5,label: "Trandolapril"},
              ],
            }
          },
    
          BRA: {
            title: {
              type: "label",
              value: "BRA"
            },
              
            type: {
              type: "select",
              title: "Tipo",
              options: [
                {id: "",label: "Escolher"},
                {id: 0,label: "Losartana",dose_inicial:"25",dose_alvo:"50 a 150",intervalo:"24"},
                // Dose inicial = 25mg
                // Dose alvo = 50 a 150mg
                // Duração = 1x ao dia
                {id: 1,label: "Valsartana",dose_inicial:"20",dose_alvo:"160",intervalo:"12"},
                // Dose inicial = 20mg
                // Dose alvo = 160mg 
                // Duração 12 em 12 horas
                {id: 2,label: "Candersatan"},
              ],
            }
          },
    
          beta_bloqueadores: {
            title: {
              type: "label",
              value: "Beta Bloqueadores"
            },
              
            type: {
                type: "select",
                title: "Tipo",
                options: [
                  {id: "",label: "Escolher"},
                  {id: 0,label: "Carvedilol",dose_inicial:"3,125",dose_alvo:"25 a 50",intervalo:"12"}, 
                  // Dose inicial = 3,125mg
                  // Dose Alvo = 25 a 50mg
                  // Duração = 12 em 12 horas
                  {id: 1,label: "Metroprolol"},
                  {id: 2,label: "Bisoprolol"},
                  {id: 3,label: "Propanolol"},
                ],
            }
          },
            
          bloq_canaisca: {
            title: {
              type: "label",
              value: "Bloqueador de Canal de Cálcio"
            },
            
            type: {
              type: "select",
              title: "Tipo",
              options: [
                {id: "",label: "Escolher"},
                {id: 0,label: "Verapamil"},
                {id: 1,label: "Diltiazem"},
              ],
            }
          },
    
          diureticos: {
            title: {
              type: "label",
              value: "Diuréticos"
            },
            
            type: {
              type: "select",
              title: "Tipo",
              options: [
                {id: "",label: "Escolher"},
                {id: 0,label: "Hidroclorotiazida"},
                {id: 1,label: "Furosemida"},
                {id: 2,label: "Espirolactona"},
                // Dose inicial = 12,5mg
                // Dose Alvo = 50mg
              ],
            }
          },
        
          digitalico: {
            title: {
              type: "label",
              value: "Digitálico"
            },
            
            type: {
              type: "checkbox",
              title: "Tipo",
              options: [
                {id: 0,label: "digoxina"},
              ],
            }
          },
    
          AAS: {
            title: {
              type: "label",
              value: "AAS"
            },
            
            type: {
              type: "checkbox",
              title: "Tipo",
              options: [
                {id: 0,label: "Uso"},
              ]
            }
          },

          estatina: {           
            title: {
              type:"label",
              value:"Estatina"
            },
            
            type: {
              type: "select",
              title: "Tipo",
              options: [
                {id: "",label: "Escolher"},
                {id: 0,label: "Sinvastatina"},
                {id: 1,label: "Atorvastatina"},
              ],
            }
          },

          hidralazina: {
            title: {
              type: "label",
              value: "Hidralazina"
            },
            
            type: {
              type: "checkbox",
              title: "Tipo",
              options: [
                {id: 0,label: "Apresolina"},
              ],
            }
          },

          nitrato: {
            title: {
              type: "label",
              value: "Nitrato"
            },
            
            type: {
              type: "checkbox",
              title: "Tipo",
              options: [
                {id: 0,label: "Dinitrato de Isossorbida"},
              ],
            }
          },

          anticoagulante: {
            title: {
              type: "label",
              value: "Anticoagulante"
            },
            
            type: {
              type: "select",
              title: "Tipo",
              options: [
                {id: "",label: "Escolher"},
                {id: 0,label: "Heparina"},
                {id: 1,label: "Dabigatran"},
                ],
            }
          },

          antiarritmico: {
            title: {
              type: "label",
              value: "Antiarrítmico"
            },
            
            type: {
              type: "checkbox",
              title: "Tipo",
              options: [
                {id: 0,label: "Amiodarona"},
              ],
            }
          },
      

          //Medicamentos prescritos para o paciente
          //prescritos: 

          sarcubitril_valsartana: {
            title: {
              type: "label",
              value: "Sarcubitril Valsartana"
            },
            
            type:{
              type:"checkbox",
              title:"Tipo",
              options:
              [
                {id: 0,label: "Entresto",dose_inicial:"49 a 51",dose_alvo:"97 a 103",intervalo:"12"},
                // Dose inicial = 49/51mg 
                // Dose alvo = 97 mg/103 mg 
                // Duração = duas vezes ao dia
              ],
            }
          }
        }
      }
    );
  }

  storeMedicine(medicine) {
    let storedMeds = this.state.storedMeds;
    const name = this.state.selectedMedicine;
    medicine.name = name;
    storedMeds.push(medicine);
    this.setState({
      storedMeds: storedMeds
    });
  }

  selectMedicine(event) {
    this.setState({
      selectedMedicine: event.target.value
    });
  }

  mountSelectOptions() {
    let options = Object.keys(this.state.prepare);
    let selectOptions = [];

    for(let i = 1; i < options.length; i++) {
      let option = options[i];
      selectOptions.push({
        id: i,
        value: option,
        label:this.state.prepare[option].title.value
      });
    }

    this.SelectOptions = selectOptions;
  }

  mountInputList() {
    const med = this.state.selectedMedicine;
    const meds = this.state.prepare[med];
    console.log("MOUNT INPUT LIST MED:", meds);
    const commom = this.state.prepare.commom;
    const medKeys = Object.keys(meds);
    const commomKeys = Object.keys(commom);
    let InputList = {};

    for(let i = 0; i < medKeys.length; i++) {
      InputList[medKeys[i]] = meds[medKeys[i]];
    }

    for(let i = 0; i < commomKeys.length; i++) {
      InputList[commomKeys[i]] = commom[commomKeys[i]];
    }

    console.log("MEDICINES MOUNT INPUT LIST:", InputList);

    this.InputList = InputList;
    console.log("MOUNT INPUT LIST - MEDICINES STATE",this.state.InputList);
  }

  handleSubmit(data) {
    this.props.saveData("medicines", this.state.storedMeds);
  }

  render() {
    if(!this.state.prepare) {
      return(
        <div>Loading</div>
      );
    }
    this.mountInputList();
    this.mountSelectOptions();

    return(
      <div className="Medicines">
        <div className="InputMedicine">
          <Select
            Label="Escolha o tipo de medicamento"
            Options={ this.SelectOptions }
            OptionValue="value"
            KeyTag="SelectMedicine"
            OnChange={ this.selectMedicine }
          />

          <Form
            OnSubmit={ this.storeMedicine }
            InputList={ this.InputList } 
            SubmitValue="Guardar medicamento"
            Config={{
              Select:{ 
                OptionValue: "id"
              },
              Checkgroup:{
                OptionValue: "id"
              },
              Radiogroup:{
                OptionValue: "id"
              }
            }}
          />
        </div>

        {/* TODO: Exibir medicamentos adicionados à pool */}

        <input className="Button" type="submit" value="Salvar medicamentos e continuar" onMouseUp={ this.handleSubmit }/>
      </div>
    );
  }
}

export default Medicines;
