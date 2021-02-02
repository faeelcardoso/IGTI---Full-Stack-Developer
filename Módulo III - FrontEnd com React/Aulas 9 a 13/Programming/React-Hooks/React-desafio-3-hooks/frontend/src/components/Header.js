import React from 'react';

export default function Header(props) {
  const { children } = props;

  return <h1 style={{textAlign: 'center'}}>{children}</h1>
}
