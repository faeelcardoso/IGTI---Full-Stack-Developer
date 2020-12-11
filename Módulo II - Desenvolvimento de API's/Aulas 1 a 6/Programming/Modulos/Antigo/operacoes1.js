// Módulo anónimo exportando várias, vale para funções, variáveis...

const nada = 'nada';

function soma(a, b) {
  return a + b;
}

function subtracao(a, b) {
  return a - b;
}

module.exports = {soma, subtracao, nada};