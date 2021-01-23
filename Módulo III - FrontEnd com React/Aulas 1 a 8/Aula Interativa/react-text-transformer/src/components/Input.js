import React, { Component } from 'react';

import M from 'materialize-css';

export default class Input extends Component {
  componentDidMount() {
    M.AutoInit(); 
  }

  handleCopy = () => { // CTRL + C
    const { id } = this.props; 
    const inputId = `input_${id}`;
    const inputElement = document.querySelector(`#${inputId}`);
    inputElement.select();
    document.execCommand('copy');
  }

  handleInputChange = (e) => {
    const newText = e.target.value;
    this.props.onChange(newText);
  }

  render() {
    const {
      autoFocus = false,
      readOnly = false,
      allowCopy = false,
      id,
      description,
      value,
    } = this.props;

    const inputId = `input_${id}`;

    const { inputStyle } = styles;

    return (
      <div style={inputStyle}>
        <div className="input-field" style={{ flex: 7 }}>
          <input 
            autoFocus={autoFocus}
            id={inputId}
            type="text"
            value={value}
            onChange={this.handleInputChange}
            readOnly={readOnly}
          />
          <label htmlFor={inputId} id={inputId}>
            {description}
          </label>
        </div>

        {allowCopy && (
          <span 
            onClick={this.handleCopy}
            className='material-icons'
            style={{ marginLeft: '10px', cursor: 'pointer' }}
          >
            content_copy
          </span>
        )}
      </div>
    );
  }
}

const styles = {
  inputStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
}