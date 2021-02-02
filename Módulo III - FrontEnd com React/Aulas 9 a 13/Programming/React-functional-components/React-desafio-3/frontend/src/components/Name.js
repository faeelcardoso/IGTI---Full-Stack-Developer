import React from 'react';

export default function Name(props) {
  const { children } = props;

  return (
    <div style={{fontWeight: 'bold'}}>
      {children}
    </div>
  );
}
