import React, { Component } from 'react';
import './Select.css';

/* 
    Props: {
      Label: text,
      Name: text,
      Id: text,
      OptionValue: text (indica qual variável deve ir para o value)
      Options: [
        0: {
          id: numeric,
          value: any,
          label: text,
        },
        1: {
          id: numeric,
          value: any,
          label: text,
        }
      ]
      KeyTag: text,
      OnChange: function pointer,
      Disabled: boolean,
      Required: boolean
    }
*/

class Select extends Component {
  render() {
    let disabled = false;
    let required = false;

    if(this.props.Disabled && (this.props.Disabled !== "false")) {
      disabled = true;
    }

    if(this.props.Required && (this.props.Required !== "false")) {
      required = true;
    }

    return(
      <div className="Select">
        <label htmlFor="">{ this.props.Label }</label>
        <select
          name={ this.props.Name }
          id={ this.props.Id }
          onChange={ this.props.OnChange }
          disabled={ disabled }
          required={ required }
        >
          {
            this.props.Options.map(
              (option) => {
                return(
                  <option key={ this.props.KeyTag+option.id } value={ option[this.props.OptionValue] } >{ option.label }</option>
                );
              }
            )
          }
        </select>
      </div>
    );
  }
}

export default Select;
