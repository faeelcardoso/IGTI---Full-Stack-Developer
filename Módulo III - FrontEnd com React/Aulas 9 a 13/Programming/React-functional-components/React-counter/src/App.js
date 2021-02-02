import React, { Component, Fragment } from 'react';

import Bands from './components/Counter/Bands.js';
import Counter from './components/Counter/Counter.js';
import Counter2 from './components/Counter/Counter2.js';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      currentCounter: 3,
      steps: 0,
    }
  }

  handleCount = (clickType) => {
    const { currentCounter, steps } = this.state;

    this.setState({
      currentCounter: clickType === '+' ? currentCounter + 1 : currentCounter - 1,
      steps: steps + 1,
    });
  }

  render() {
    const { currentCounter, steps } = this.state;

    return (
      <Fragment>
        <h3>React Counter Functional Component</h3>
        <h3>Bands</h3>

        <Bands />

        <h3>Counter State Separate</h3>
        <Counter />
        <Counter />
        <Counter />

        <h3>Counter State Shared</h3>
        <Counter2 onCount={ this.handleCount } countValue={ currentCounter } currentStep={ steps } />
        <Counter2 onCount={ this.handleCount } countValue={ currentCounter } currentStep={ steps } />
        <Counter2 onCount={ this.handleCount } countValue={ currentCounter } currentStep={ steps } />
      </Fragment>
    );
  }
}
