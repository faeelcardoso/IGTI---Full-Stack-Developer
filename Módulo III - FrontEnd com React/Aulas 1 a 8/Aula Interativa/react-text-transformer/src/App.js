import React, { Component } from 'react';

const defaultState = {
  userInput: 'Trabalho Prático',
}

export default class App extends Component {
  constructor() {
    super();

    // this.state = Object.assign([], defaultState); 
    // Changed to this
    this.state = { ...defaultState };
  }

  componentDidMount() {
    document.title = 'React Text Transformer';
  }

  handleUserInputChange = (e) => {
    const newUserInput = e.target.value;
    
    this.setState({ userInput: newUserInput });
  }

  render() {
    const {userInput} = this.state;

    return (
      <div className="container center">
        <h1>React Text Transformer</h1>

        <input type="text" value={userInput} onChange={this.handleUserInputChange} />
      </div>
    );
  }
}
