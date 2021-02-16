import React, {useEffect} from 'react';

import M from 'materialize-css';

export default function Select(props) {
  const { values, selectedValue, onChange } = props;

  // If I wanna use materialize here, i have to import up there and do this
  useEffect(() => {
    M.AutoInit();
  }, []);

  // If I don't wanna use materialize, I have to put "className='browser-default' in the tag"

  const handleSelectChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
  }

  return (
    <select value={selectedValue} onChange={handleSelectChange} readOnly>
      {values.map(({ id, description, value }) => {
        return (
          <option key={id} value={value}>{description}</option>
        );
      })}
    </select>
  );
}