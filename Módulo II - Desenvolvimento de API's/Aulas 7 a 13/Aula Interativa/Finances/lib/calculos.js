// Aqui ficam os cálculos que não tem nada haver com regra de negócio, cálculos em geral

function sum(array) {
  const sum = array.reduce((prev, curr) => {
    return prev + curr;
  }, 0);

  return sum;
}

function media(array) {
  // Aqui por exemplo faço média...
}

export default { sum };