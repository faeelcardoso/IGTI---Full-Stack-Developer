import React from 'react';

import { formatNumber } from '../helpers/formatHelpers';

import css from '../header/header.module.css';

export default function Header(props) {
  const { filter, countryCount, totalPopulation, onChangeFilter } = props;

  const handleInputChange = (event) => {
    const newText = event.target.value;

    onChangeFilter(newText);
  }

    return (
      <div className={css.flexRow}>
        <input placeholder='Filtrar...' type="text" value={filter} onChange={handleInputChange} /> |
        <span className={css.countries}>Países: <strong>{countryCount}</strong> </span> |<span className={css.population}>População: <strong>{formatNumber(totalPopulation)}</strong></span>  
      </div>
    );
}
