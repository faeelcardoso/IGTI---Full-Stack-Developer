import React, { Component } from 'react';
import { getNewTimestamp } from './helpers/dateTimeHelpers.js';


export default class App extends Component {
  constructor() {
    super();

    this.state = {
      clickArray: [],
    }
  }

  handleClick = () => {
    const newClickArray = Object.assign([], this.state.clickArray); // Here I'm doing a copy
    newClickArray.push(getNewTimestamp());

    this.setState({ clickArray: newClickArray }); // Taco o newArray no clickArray do state
  }

  componentDidUpdate() {
    document.title = this.state.clickArray.length.toString();
  }

  render() {
    const { clickArray } = this.state;

    return (
      <div>
        <h1>
          React e <em>Class Component</em>
        </h1>

        <button onClick={ this.handleClick }>Clique aqui</button>

        <ul>
          {clickArray.map((item) => {
            return <li key={item}>{item}</li>
          })}
        </ul>
      </div>
    );
  }
}
