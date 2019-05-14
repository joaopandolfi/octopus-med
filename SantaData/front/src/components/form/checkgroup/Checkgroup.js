import React, { Component } from 'react';
import './Checkgroup.css';

/*
  Props: {
    Label: text,
    Name: text,
    Id: text,
    OptionValue: text,
    Options: [
      id: numeric,
      value: any,
      label: text
    ],
    OnChange: function pointer,
    Disabled: boolean,
    ReadOnly: boolean,
    Required: boolean
  }
*/

class Checkgroup extends Component {
  render() {
    let disabled = false;
    let readOnly = false;
    let required = false;

    if(this.props.Disabled && (this.props.Disabled !== "false")) {
      disabled = true;
    }

    if(this.props.ReadOnly && (this.props.ReadOnly !== "false")) {
      readOnly = true;
    }

    if(this.props.Required && (this.props.Required !== "false")) {
      required = true;
    }

    return(
      <div className="Checkgroup">
        <label>{ this.props.Label }</label>
        {
          this.props.Options.map(
            (option) => {
              return(
                <div className="Checkbox" key={ this.props.KeyTag+option.id }>
                  <input
                    type="checkbox"
                    value={ option[this.props.OptionValue] }
                    id={ this.props.KeyTag+option.id }
                    onChange={ this.props.OnChange }
                    name={ this.props.Name }
                    disabled={ disabled }
                    readOnly={ readOnly }
                    required={ required }
                  />
                  <label htmlFor={ this.props.KeyTag+option.id }>{ option.label }</label>
                </div>
              );
            }
          )
        }
      </div>
    );
  }
}

export default Checkgroup;
