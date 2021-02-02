import React from 'react';

import css from './position.module.css';

export default function Position(props) {
  const { children } = props;

  return (
    <div className={css.position}>
      {children}
    </div>
  )
}
