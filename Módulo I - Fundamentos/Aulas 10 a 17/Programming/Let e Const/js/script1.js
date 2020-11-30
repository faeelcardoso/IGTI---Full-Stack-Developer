'use scrict'; 

// Função normal
function sum(a, b) {
  return a + b;
}

// Função anônima
const sum2 = function(a, b) {
  return a + b;
}

// Arrow Function 
const sum3 = (a, b) => {
  return a + b;
} 

// Arrow Function reduzida
const sum4 = (a, b) => a + b;

console.log(sum(1, 2));
console.log(sum2(1, 2));
console.log(sum3(1, 2));
console.log(sum4(1, 2));


// Template Literals

const name = 'Raphael';
const lastName = 'Marques';
const text1 = 'Meu nome é ' + name + ' ' + lastName;
const text2 = `Meu nome é ${name} ${lastName}!`;

console.log(text1);
console.log(text2);


// Default Parameters in fuctions

const sum5 = (a, b = 10) => a + b;
console.log(sum5(2));
 
// se mandar somente 1 valor, o b já assume o valor padrão