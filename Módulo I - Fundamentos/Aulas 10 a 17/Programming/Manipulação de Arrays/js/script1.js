// AQUI EU FIZ SOME, EVERY E SORT

function start() {
  doSome();
  doEvery();
  doSort();
};

// Some retorna true or false, retorna se achou pelo menos um de acordo com o critério
// Verifica se há pelo menos um elemento que atenda à proposição
function doSome() {
  const found = people.results.some(person => {
    return person.location.state === 'Amazonas'; // se for isso retorna true
  });

  console.log(found);
}; 

// Every retorna true or false, retorna se todos seguem o critério
// Verifica se todos os elementos atendem à proposição.
function doEvery() {
  const found = people.results.every(person => {
    return person.nat === 'BR'; // se todos forem brasileiros, retorna true
  });

  console.log(found);
}

// Agr Sort, ele ordena todos os elementos com base a um critério
// Esse é daora, bora fazer uma bagunça
function doSort() {
  const mappedNames = people.results.map(person => {
    return {
      name: person.name.first // map com só primeiro nome da glr
    };
  }).filter(person => person.name.startsWith('A')) // todos nomes que começam com a letra A
    .sort((a, b) => { // sempre passar dois parâmetros pois o sort vai ficar comparando os dois e organizando 
      // return a.name.localeCompare(b.name); // nome ordenados
      // return a.name.length - b.name.length // retornar agora pelo tamanho das palavras, ordem crescente
      return b.name.length - a.name.length; // retornar agora pelo tamanho das palavras, ordem decrescente
    });

  console.log(mappedNames);
}

start();