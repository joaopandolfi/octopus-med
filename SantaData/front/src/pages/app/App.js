import React, { Component } from 'react';
import './App.css';
import Login from "../login/Login";
import Home from "../home/Home";

class App extends Component{

  constructor(props){
    super(props);
    
    this.storeUser = this.storeUser.bind(this);

    this.state = {
      currentPage: 'login',
      activeUser: {
        /* user data */
      },
    };
  }

  switchPage(target) {
    this.setState(
      {
        currentPage: target,
      }
    );
  }

  storeUser(userData) {

    this.setState(
      {
        activeUser: userData,
      }
    );
    
    this.switchPage('home');
  }

  render() {
    switch(this.state.currentPage){
      case "login":
        return(
          <Login onLogin={ this.storeUser } />
        );
      case "home":
        return(
          <Home userData={ this.state.activeUser } />
        );
      default:
        return(
          <h1> Página não encontrada </h1>
        );
    }
  }
}

export default App;
