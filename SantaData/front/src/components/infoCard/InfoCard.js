import React, { Component } from 'react';
import './infoCard.css';
import Button from './../button/Button';
import imgDefault from './../../pages/img/user.png';

class InfoCard extends Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {

    if (this.props.data){
      let imgUser = imgDefault;;
      const date = new Date(this.props.data.dtnasc).toLocaleDateString(); /* passando data para formato padrão */
      
      /* if(this.props.data.picture) {
        imgUser = this.props.data.picture;
      } else {
        imgUser = imgDefault;
      } */
      
      return(

        <div className="InfoCard">

          <div className="patientImgBox">
            <img className="patientImg rounded-circle float-left" src={imgUser} />
            {/* "https://smiledesignspecialist.com/wp-content/uploads/2015/11/implant-man-teaser.jpg" */}
          </div>

          <div className="pacientName">
            <h4>Nome</h4>
            <p>{ this.props.data.name }</p>
          </div>
          
          <div className="pacientProntuario">
            <h4>N° Prontuário</h4>
            <p>{ this.props.data.nr_prontuario }</p>
          </div>
          
          <div className="patientBirth">
            <h4>Data de Nascimento</h4>
            <p>{ date }</p>
          </div>
          
          <div className="patientEtiny">
            <h4>Etnia</h4>
            <p>{ this.props.data.etiny }</p>
          </div>
          
          <div className="patientAdress">
            <h4>Endereço</h4>
            <p>{ this.props.data.address }</p>
          </div>
          
          <div className="patientTell">
            <h4>Telefone</h4>
            <p>{ this.props.data.tel1 }</p>
          </div>
          
          <div className="emegercyTell">
            <h4>Telefone de Emergência</h4>
            <p>{ this.props.data.tel_emerg }</p>
          </div>
        
        </div>
      );
    }else{
      return("")
    }
  }
}

export default InfoCard;
