import React from 'react';

export default function Action(props) {
  const { id, type, onActionClick } = props;

  const handleIconClick = () => {
    onActionClick(id, type);
  }

  return (
      <span className="material-icons" onClick={handleIconClick} style={{ cursor: 'pointer' }}>{type}</span>  
  );
}
