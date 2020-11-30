// AQUI EU FIZ MAP, FILTER, FOREACH, REDUCE E FIND

//  Map: transformar um array em objeto com nome e email. Map transforma um array em outro array porém novo
// Ou seja imutavel, ele não meche no vetor original, cria um novo com oq foi passado
function start() {
  doMap();
  doFilter();
  doForEach();
  doReduce();
  doFind();
};

function doMap() {
  const nameEmailArray = people.results.map(person => { // peguei a API com pessoas e vários dados e transformei para retornar cada pessoa com o nome e email
    return {
      name: person.name,
      email: person.email
    };
  });

  console.log(nameEmailArray);
  return nameEmailArray; // retornar para eu conseguir pegar esse map lá no forEach
}

// Agr Filter, maior que 50 anos
// O filter faz um true or false e retorna só o true, descartando tudo que não se encaixa
function doFilter() {
  const olderThan50 = people.results.filter(person => {
    return person.dob.age > 50;
  });

  console.log(olderThan50);
}

// Agr forEach, incluir nova propriedade no objeto
// forEach é mutável, não precisa de return
function doForEach() {
  const mappedPeople = doMap(); // agr essa variável tem tudo do map

  mappedPeople.forEach(person => { // passo um forEach por todos
    person.nameSize = // acesso o nome de cada um e concateno e retorno o title + firstname + lastname
      person.name.title.length +
      person.name.first.length +
      person.name.last.length;
  });

  console.log(mappedPeople);
}

// Agr o Reduce, realiza cálculo iterativo com base nos elementos, ele retira ter que fazer For sempre
// Vamos começar pelo clássico for, fazer uma soma das idades

// For
let sumAges = 0;

for(let i = 0; i < people.results.length; i++) {
  let current = people.results[i];
  sumAges += current.dob.age; // idades
}

console.log(sumAges);

// Agr reduce
function doReduce() {
  const totalAges = people.results.reduce((accumulator, current) => { // reduce sempre passa dois paramêtros, 1 acumulador e o outro o atual
    return accumulator + current.dob.age; // feito. O valor que está sendo acumulado + idade = total de idades
  }, 0) // e o reduce sempre tem que passar o valor inicial

  console.log(totalAges);
}

// Agr Find, ele pega uma lista e retorna somente o primeiro
function doFind() {
  const found = people.results.find(person => {
    return person.location.state === 'Minas Gerais'; // retornar a primeira pessoa da lista de MG
  });

  console.log(found);
}

start();