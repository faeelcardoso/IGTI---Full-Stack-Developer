import React from 'react'

import css from './user.module.css';

export default function User(props) {
  const { user } = props;
  const { name, picture } = user;

  return (
    <div className={css.flexRow}>
      <img className={css.avatar} src={picture.large} alt={name.first} />
      <span>{name.first}</span>
    </div>
  )
}
