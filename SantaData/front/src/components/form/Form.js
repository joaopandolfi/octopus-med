import React, { Component } from 'react';
import './Form.css';
import Select from './select/Select';
import Checkgroup from './checkgroup/Checkgroup';
import Input from './input/Input';
import Radiogroup from './radiogroup/Radiogroup';

/*
    Props: {
      SubmitValue: text,
      OnSubmit: function pointer,
      InputList: {
        input_one: {
          type: text,
          title: text,
          value: any,
          options: [
            many {} options
          ],
          special
        }
      },
      Config: {
        Select: {
          OptionValue: text,
        },
        Checkgroup: {
          OptionValue: text,
        },
        Radiogroup: {
          OptionValue: text,
        }
      }
    }
*/

class Form extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      formData: {},
    };
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
  }	

  render() {
    return(
      <div className="Form">
        {
          Object.keys(this.props.InputList).map(
            (input) => {
              let OptionValue;
              const inputField = this.props.InputList[input];

              switch( inputField.type ) {
                case 'label':
                  return(
                    <label key={ "Label"+inputField.value }>{ inputField.value }</label>
                  );
                
                case 'select':
                  if(this.props.Config.Select.OptionValue) {
                    OptionValue = this.props.Config.Select.OptionValue;
                  } else {
                    OptionValue = "value";
                  }
                  return(
                    <Select
                      key={ "Select"+inputField.title }
                      Label={ inputField.title }
                      Options={ inputField.options }
                      KeyTag={ "Select"+inputField.title }
                      OnChange={ this.handleChange }
                      OptionValue={ OptionValue }
                      Name={ input }
                    />
                  );
                
                case 'checkbox':
                  if(this.props.Config.Checkgroup.OptionValue) {
                    OptionValue = this.props.Config.Checkgroup.OptionValue;
                  } else {
                    OptionValue = "value";
                  }
                  return(
                    <Checkgroup
                      key={ "Check"+inputField.title }
                      Label={ inputField.title }
                      Options={ inputField.options }
                      KeyTag={ "Check"+inputField.title }
                      OnChange={ this.handleChange }
                      OptionValue={ OptionValue }
                      Name={ input }
                    />
                  );

                case 'radio':
                  if(this.props.Config.Radiogroup.OptionValue) {
                    OptionValue = this.props.Config.Radiogroup.OptionValue;
                  } else {
                    OptionValue = "value";
                  }
                  return(
                    <Radiogroup 
                      key={ "Radio"+inputField.title }
                      Label={ inputField.title }
                      Options={ inputField.options }
                      KeyTag={ "Radio"+inputField.title }
                      OnChange={ this.handleChange }
                      OptionValue={ OptionValue }
                      Name={ input }
                    />
                  );
                
                case 'text':
                case 'date':
                case 'number':
                  return(
                    <Input 
                      key={ "Input"+inputField.title }
                      Label={ inputField.title }
                      OnChange={ this.handleChange }
                      Type={ inputField.type }
                      Name={ input }
                      Disabled={ inputField.disabled }
                      ReadOnly={ inputField.readonly }
                      Required={ inputField.required }
                    />
                  );
                
                default:
                  console.log("elemento não listado");
                  return(null);
                  break;
              }
            }
          )
        }
        <input type="submit" value={ this.props.SubmitValue }  onMouseUp={ () => { this.props.OnSubmit(this.state.formData); } }/>
      </div>
    );
  }
}

export default Form;
