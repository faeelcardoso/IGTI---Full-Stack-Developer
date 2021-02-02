import React, { Fragment, useState } from 'react';

import Bands from './components/Counter/Bands.js';
import Counter from './components/Counter/Counter.js';
import Counter2 from './components/Counter/Counter2.js';

export default function App() {
  const [currentCounter, setCurrentCounter] = useState(3);
  const [steps, setSteps] = useState(0);

  const handleCount = (clickType) => {
    const counter = clickType === '+' ? currentCounter + 1 : currentCounter - 1;
    setCurrentCounter(counter);

    setSteps(steps + 1);
  }

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
        <Counter2 onCount={ handleCount } countValue={ currentCounter } currentStep={ steps } />
        <Counter2 onCount={ handleCount } countValue={ currentCounter } currentStep={ steps } />
        <Counter2 onCount={ handleCount } countValue={ currentCounter } currentStep={ steps } />
      </Fragment>
    );
}
