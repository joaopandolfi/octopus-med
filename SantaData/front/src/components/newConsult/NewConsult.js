import React, { Component } from 'react';
import './NewConsult.css';
//import axios from 'axios';
import Anamnese from "./anamnese/Anamnese";
import Evidences from "./evidences/Evidences";
import PatientProfile from './../patientProfile/PatientProfile';
import Base64 from '../../lib/base64';
import Interventions from "./interventions/Interventions";
import Predictors from "./predictors/Predictors";
import PhysicalExams from "./physicalExams/PhysicalExams";

import Medicines from "./medicines/Medicines"; 

/* import PhysicalExams from "./physicalExams/PhysicalExams";
  */

class NewConsult extends Component {

	constructor(props) {
    super(props);
    this.nextSection = this.nextSection.bind(this);
    this.prevSection = this.prevSection.bind(this);
    this.goToSection = this.goToSection.bind(this);
    this.storeFormData = this.storeFormData.bind(this);
    this.saveConsult= this.saveConsult.bind(this);

    this.sections = [
      <Anamnese title="Anamnese" saveData={ this.storeFormData } />,
      <Evidences title="Evidências" saveData={ this.storeFormData } />,
      <Interventions title="Intervenções" saveData={ this.storeFormData } />,
      <PhysicalExams title="Exames Físicos" saveData={ this.storeFormData } />,
      <Medicines title="Medicamentos" saveData={ this.storeFormData } />,
      <Predictors title="Preditores" saveData={ this.storeFormData } />,

    ];
			
    this.state = {
      currentSection: 0,
      consultData: {},
    };
  }

  storeFormData(param, data) {
    let consultData = this.state.consultData;
    consultData[param] = data;

    this.setState(
      {
        consultData: consultData,
      }
    );

    this.nextSection()

    console.log("CONSULTA:",this.state.consultData);
  }

  nextSection() {
    if(this.state.currentSection < this.sections.length - 1) {
      let i = this.state.currentSection +1;

      this.setState({
        currentSection: i
      });
    }
  }

  prevSection() {
    if(this.state.currentSection > 0 ) {
      let i = this.state.currentSection - 1;

      this.setState({
        currentSection: i
      });

    }
  }

  goToSection(section) {
    this.setState({
      currentSection: section
    });
  }
  
  
  saveConsult(){
    //Salvar Consulta
    const consultData = this.state.consultData;

    console.log("paciente aqui: =)", this.props.patient);
 
    const data= Base64.encode({

      id_pacient: this.props.patient.idpatient,
      id_user: "",

      data: consultData,

    }) 
      
    alert("Consulta Salva");
    //this.props.switchSection(<PatientProfile patient={ this.props.patient } switchSection={ this.props.switchSection }/>)
  }

	render() {
    return(
			<div className="NewConsult">
				
        <div className="sections">
          {
            this.sections.map(
              (comp,index) => {
                return(
                  <button key={ comp.props.title } name={ comp.props.title }  onClick= { () => { this.goToSection(index) } } >
                    { comp.props.title }
                  </button>
                );
              }
            )
          }
          <button id="SaveConsult" name="saveConsult" onClick={ this.saveConsult }>
            Salvar Consulta
          </button>
        </div>
        
        <section className="consultSection">
          { this.sections[this.state.currentSection] }
        </section>
                
        <button name="prev" onClick={ this.prevSection }>Anterior</button>
        <button name="next" onClick={ this.nextSection }>Proximo</button>
				
			</div>
		);
	}
}

export default NewConsult;
