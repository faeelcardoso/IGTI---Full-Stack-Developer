const unidade = {0: 'Zero', 1: 'um', 2: 'dois', 3: 'três', 4: 'quatro', 5: 'cinco', 6: 'seis', 7: 'sete', 8:'oito', 9: 'nove', 10: 'dez', 
11: 'onze', 12: 'doze', 13: 'treze', 14: 'quatorze', 15: 'quinze', 16: 'dezesseis', 17: 'dezessete', 18:'dezoito', 19:'dezenove'};

const dezenas = {}

window.addEventListener('load', start); 
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

  if(currentNumber <= 19){
    inputExtendNumber.value = unidade[currentNumber]
  } 
} 