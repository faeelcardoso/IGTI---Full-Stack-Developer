import React, { Component } from 'react';

import Input from './components/Input';
import Transformations from './components/Transformations';
import Transformation from './components/Transformation';

import * as stringHelpers from './helpers/stringHelpers';

const MY_TRANSFORMATIONS = [
  {
    id: 't1',
    description: 'Texto Invertido',
    transformFunction: text => text.split('').reverse().join(''),
    /* 
    Split: divide a string e retorna um array com cada letra separada
    reverse: inverte o array todo
    Join: contatena tudo em um array e retorna tudo em uma string
    Obs: split('') divide em letras, split(' ') em palavras
    */
  },

  {
    id: 't2',
    description: 'CSV:',
    transformFunction: text => text.split(' ').map(word => `"${word}"`).join(';'),
  },

  {
    id: 't3',
    description: 'Texto Numérico:',
    transformFunction: text => stringHelpers
      .removeSpecialCharacteres(text)
      .toUpperCase()
      .split('')
      .map(char => {
        if (char === 'O') return '0';
        if (char === 'A') return '4';
        if (char === 'E') return '3';
        if (char === 'I') return '1';
        if (char === 'S') return '5';
        if (char === 'T') return '7';

        return char;
      }).join(''),
  },

  {
    id: 't4',
    description: 'Slug:',
    transformFunction: text => stringHelpers
      .removeSpecialCharacteres(text)
      .toLowerCase()
      .split(' ')
      .join('-'),
  },

  {
    id: 't5',
    description: 'Somente vogais:',
    transformFunction: text => text
      .split('')
      .filter(char => char === ' ' || stringHelpers.isVowel(char))
      .join(''),
  },

  {
    id: 't6',
    description: 'Somente Consoantes:',
    transformFunction: text => text
      .split('')
      .filter(char => char === ' ' || stringHelpers.isConsoant(char))
      .join(''),
  },

  {
    id: 't7',
    description: 'Variável:',
    transformFunction: text => stringHelpers
      .removeSpecialCharacteres(text)
      .split(' ')
      .map((word, index) => {
        return index === 0 
          ? word.toLowerCase()
          : word.toLowerCase().split('').map((char, index) => {
            return index === 0 ? char.toUpperCase() : char;
          }).join('');
      }).join(''),
  },

  {
    id: 't8',
    description: 'Alternância entre maiúsculo e minúsculo:',
    transformFunction: text => text.split('').map((char, index) => {
      return index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
    }).join(''),
  },

  {
    id: 't9',
    description: 'Inverter texto "na mão":',
    transformFunction: text => stringHelpers.reverse(text),
  },
]

const defaultState = {
  userInput: 'Trabalho Prático',
}

export default class App extends Component {
  constructor() {
    super();

    // this.state = Object.assign([], defaultState); 
    // Changed to this
    this.state = { ...defaultState };
  }

  componentDidMount() {
    document.title = 'React Text Transformer';
  }

  handleUserInputChange = (newText) => {
    this.setState({ userInput: newText });
  }

  render() {
    const {userInput} = this.state;

    return (
      <div className="container">
        <h1>React Text Transformer</h1>

        <Input 
          autoFocus 
          id="userInput"
          description="Digite o texto aqui:"
          value={userInput}
          onChange={this.handleUserInputChange}
        />

        <Transformations>
          {MY_TRANSFORMATIONS.map(({ id, description, transformFunction }) => {
            const value = transformFunction(userInput);

            return ( 
              <Transformation 
                key={id}
                id={id}
                description={description}
                value={value}
              />
            );
          })}
        </Transformations>
      </div>
    );
  }
}