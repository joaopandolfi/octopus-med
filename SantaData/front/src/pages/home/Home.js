import React, { Component } from 'react';
import './Home.css';
import NewPatient from './../../components/newPatient/NewPatient';
import SearchPatient from './../../components/searchPatient/SearchPatient';
import Intro from './../../components/intro/Intro';

class Home extends Component {
  
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.switchSection = this.switchSection.bind(this);

    this.state = {
      currentSection: <Intro userData={ this.props.userData } />,
    };
  }

  handleClick(event) {
    event.preventDefault();

    switch(event.target.name) {
      case 'intro':
        this.switchSection( <Intro userData={ this.props.userData } /> );
        break;
      case 'newPatient':
        this.switchSection( <NewPatient switchSection={ this.switchSection } userData={ this.props.userData } /> );
        break;
      case 'searchPatient':
        this.switchSection( <SearchPatient switchSection={ this.switchSection } userData={ this.props.userData } /> );
        break;
      default:
        break;
    }
  }

  switchSection(target) {
    console.log("Switch section", target);
    this.setState(
      {
        currentSection: target,
      }
    );
    console.log(this.state.currentSection);
  }

  render() {
    return(
      <div className="Home" >

        <header className="nav" id="header">
          <div className="container">
            <div id="logo" className="pull-left">
              <a href="#">
                <img src='https://svgshare.com/i/57j.svg' alt='logo' title="" onClick={ this.handleClick } name="intro"/>
              </a> 
            </div>

            <nav id="nav-menu-container">
              <ul className="nav-menu">
                <li className="menu-active"><a name="intro" onClick={ this.handleClick }>Painel</a></li>
                <li className="menu-active"><a name="newPatient" onClick={ this.handleClick } >Novo Paciente</a></li>
                <li className="menu-active"><a name="searchPatient" onClick={ this.handleClick } >Buscar Paciente</a></li>
                <li>
                  <a href="#">Usuário</a>
                  <ul>
                    <li><a href="#">Account</a></li>
                    <li><a href="#">Log out</a></li>
                    <li><a href="#">Something</a></li>
                    <li><a href="#">BLAH BLAH BLAH</a></li>
                  </ul>
                </li>

                {/*IF WE WANT SOMETHING TO DROPDOWN*/}
              </ul>
            </nav>
            {/*<!-- #nav-menu-container -->*/}
          </div>
        </header>
        {/*<!-- #header -->*/}
   
        <section>
          { this.state.currentSection }
        </section>
      </div>
    );
  }
}

export default Home;
