import React from 'react';

import css from './counter.module.css';

import DecrementButton from './DecrementButton';
import IncrementButton from './IncrementButton';
import Steps from './Steps';
import Value from './Value';

// Remember! rcc + TAB to create a class component

export default function Counter2(props) {
  const { onCount ,countValue, currentStep } = props;

  const handleButtonClick = (clickType) => {
    onCount(clickType);
  }

    return (
      <div className={ css.counterContainer }>
        <DecrementButton onDecrement={ handleButtonClick } />
        <Value value={ countValue } />
        <IncrementButton onIncrement={ handleButtonClick } />
        <Steps currentStep={currentStep} />
      </div>
    );
}