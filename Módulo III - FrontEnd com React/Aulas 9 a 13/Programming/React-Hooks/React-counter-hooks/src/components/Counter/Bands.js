import React, { useState } from 'react';

const BAND_MEMBERS = [
  {
    id: 1, 
    name: 'Neil Peart',
    instrument: 'Bateria'
  },
  {
    id: 2,
    name: 'Alex Lifeson',
    instrument: 'Guitarra'
  },
  {
    id: 3,
    name: 'Geddy Lee',
    instrument: 'Baixo'
  },
];

export default function Bands() {
  const [bandMembers, setBandMembers] = useState(BAND_MEMBERS);
  const [bandName, setBandName] = 'Rush';

    return (
      <div>
        <h4>{ bandName }</h4>

        <ul>
          {bandMembers.map(({ id, name, instrument }) => {
            return (
              <li key={id}> {/* Sempre em array e coisas do tipo no React tenho que colocar "key". O id ajuda nessas horas, uso ele e coloco a key no que se repete */}
                {name} - {instrument}
              </li>
            );
          })}
        </ul>
      </div>
    );
}
