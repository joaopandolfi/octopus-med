import React, { Component } from 'react';
import "./Button.css"


class Button extends Component {

    render(){
        return(
            <button onClick={this.props.onClick}>{this.props.value}</button>
        )
    }

}

export default Button