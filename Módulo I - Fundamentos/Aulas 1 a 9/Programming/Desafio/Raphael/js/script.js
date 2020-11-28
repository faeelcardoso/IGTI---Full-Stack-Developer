const numbers = {
  0: 'Zero', 1: 'um', 2: 'dois', 3: 'três', 4: 'quatro', 5: 'cinco', 6: 'seis', 7: 'sete', 8: 'oito', 9: 'nove', 10: 'dez',
  11: 'onze', 12: 'doze', 13: 'treze', 14: 'quatorze', 15: 'quinze', 16: 'dezesseis', 17: 'dezessete', 18: 'dezoito', 19: 'dezenove',
  20: 'vinte', 30: 'trinta', 40: 'quarenta', 50: 'cinquenta', 60: 'sesenta', 70: 'setenta', 80: 'oitenta', 90: 'noventa', 100: 'cem', 101: 'cento',
  200: 'Duzentos', 300: 'Trezentos', 400: 'Quatrocentos', 500: 'Quinhentos', 600: 'Seiscentos', 700: 'Setecentos', 800: 'Oitocentos', 900: 'Novecentos'
};

// Estou usando o defer
// window.addEventListener('load', start);

function start() {
  rangeInput = document.querySelector('#rangeInput');
  rangeInput.addEventListener('input', showCurrentNumber);
  rangeInput.addEventListener('input', showExtendNumber);
}

function showCurrentNumber(e) {
  var currentNumber = e.target.value;

  inputCurrentNumber = document.querySelector('#currentNumber');
  inputCurrentNumber.value = currentNumber;
}

function showExtendNumber(e) {
  var currentNumber = e.target.value;

  inputExtendNumber = document.querySelector('#extendNumber');

  if (currentNumber <= 19) { // comparar até 19
    inputExtendNumber.value = numbers[currentNumber]
  } else if (currentNumber > 20 && currentNumber <= 100) { // comparar de 20 a 100
    inputExtendNumber.value = currentNumber[1] != 0 ? numbers[currentNumber[0] + 0] + ' e ' + numbers[currentNumber[1]] : numbers[currentNumber];
    // pega a segunda casa do currentNumber, se n for zero => coloca a primeira casa + 0 e segunda casa. Se for zero só exibir
  } else if (currentNumber >= 101 && currentNumber <= 999) { // comparando 1 a um de 101 até 999
    if (currentNumber[1] == 0 && currentNumber[2] != 0 && currentNumber[0] == 1) {
      inputExtendNumber.value = numbers[101] + ' e ' + numbers[currentNumber[2]];
    } else if (currentNumber[1] != 0 && currentNumber[2] == 0 && currentNumber[0] == 1) {
      inputExtendNumber.value = numbers[101] + ' e ' + numbers[currentNumber[1] + 0];
    } else if (currentNumber[1] == 1 && currentNumber[0] == 1) {
      inputExtendNumber.value = numbers[101] + ' e ' + numbers[currentNumber[1] + currentNumber[2]];
    } else if (currentNumber[1] != 1 && currentNumber[2] != 0 && currentNumber[0] == 1) {
      inputExtendNumber.value = numbers[101] + ' e ' + numbers[currentNumber[1] + 0] + ' e ' + numbers[currentNumber[2]];
    } else if (currentNumber[1] == 0 && currentNumber[2] == 0) {
      inputExtendNumber.value = numbers[currentNumber];
    } else if (currentNumber[1] == 0 && currentNumber[2] != 0) {
      inputExtendNumber.value = numbers[currentNumber[0] + 0 + 0] + ' e ' + numbers[currentNumber[2]];
    } else if (currentNumber[1] == 1) {
      inputExtendNumber.value = numbers[currentNumber[0] + 0 + 0] + ' e ' + numbers[currentNumber[1] + currentNumber[2]];
    } else if (currentNumber[1] != 1 && currentNumber[1] != 0 && currentNumber[2] == 0) {
      inputExtendNumber.value = numbers[currentNumber[0] + 0 + 0] + ' e ' + numbers[currentNumber[1] + 0];
    } else {
      inputExtendNumber.value = numbers[currentNumber[0] + 0 + 0] + ' e ' + numbers[currentNumber[1] + 0] + ' e ' + numbers[currentNumber[2]];
    }
  }
}

start();

// lembrando que para pegar o comprimento, ou seja, length. Tem que estar em string
// 8.length = errado
// 8.toString().length = ok

/* 
Interessante também a substring, posso repartir a string
Por exemplo: var number: 123, quero só o 23
number.substring(1); Pásso a posição na string pra começar a pegar somente da segunda casa.

TOP!
*/