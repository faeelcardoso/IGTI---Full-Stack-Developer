import React from 'react';

import css from './card.module.css';

export default function Card(props) {
  const { children } = props; // Children comes everything there are in props, all of the children

  const classes = `card ${css.cardExtra}`; // like that, I get 'card' from materialize and I put together with css

  return (
    <div className={classes}>
      {children}
    </div>
  );
}
