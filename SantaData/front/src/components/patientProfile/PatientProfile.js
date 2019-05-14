import React, { Component } from 'react';
import './PatientProfile.css';
import InfoCard from './../infoCard/InfoCard';
import Base64 from './../../lib/base64';
import axios from 'axios';
import Button from './../button/Button';
import NewConsult from './../newConsult/NewConsult';

class PatientProfile extends Component {

  constructor(props) {
    super(props);
    this.searchPatient = this.searchPatient.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      patientData: null,
    };
  }

  componentWillMount(){
    this.searchPatient(this.props.patientId);
  }

  searchPatient(id) {
    const patientId = id;
    const user_id = this.props.userData.user_id;
    const user_hash = this.props.userData.hash;
    
    axios.defaults.baseURL = 'https://31.220.54.251:8443/';
    
    axios.post(
      'gen/get/patient/'+patientId+'/'+user_id+'/'+user_hash+'/',
      'data='+Base64.encode(
        {}
      )
    )
    .then(
      (response) => {
        this.setState({
          patientData: response.data.data[0]
        });
      }
    ).catch(
      (error) => {
        console.log("ERRO:",error);
      }
    );
  }

  handleClick(event){
    event.preventDefault();

    console.log("Aqui",this.state.patientData);
    this.props.switchSection(<NewConsult patient={ this.state.patientData } switchSection={ this.props.switchSection } userData={ this.props.userData } />);
  }

  render() {
    return(
      <div className="PatientProfile float-left">

        <div className="profile float-left">

          <div className="top-bar">
            <h3>Paciente</h3>
          </div>
          
          <div className="NewConsult top-button-bar">
              <button className="btn btn-outline-primary float-right" name="newConsult" onClick={ this.handleClick }>
                NovaConsulta
              </button>
          </div> 
          <div className="patientData">
            <InfoCard data={ this.state.patientData } />
          </div>

        </div>
{/*
        <div className="allergies float-left">

          <div className="top-bar">
            <h3>Alergias</h3>
          </div> 

          <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>

        </div>

*/}
        <div className="currentState float-left">

          <div className="top-bar">
            <h3>Estado Atual</h3>
          </div> 

          <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>

        </div>

        <div className="ICFER float-left">

          <div className="top-bar">
            <h3>ICFER</h3>
          </div> 

          <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>

        </div>

        <div className="comorbidities float-left">

          <div className="top-bar">
            <h3>Co-Morbilidades</h3>
          </div> 

          <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>


        </div>

        </div>

        
    );
  }
}

export default PatientProfile;
