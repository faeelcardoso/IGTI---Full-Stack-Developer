import React from 'react';

import css from './picture.module.css';

export default function Picture(props) {
  const { imageSource, description } = props;

  return (
    <div>
      <img className={css.picture} src={imageSource} alt={description} title={description} />
    </div>
  );
}
