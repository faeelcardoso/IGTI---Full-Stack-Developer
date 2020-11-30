'use scrict'; // o JS acusa mais erros

// var x let

// var tem escopo abrangente 
// let tem escopo reduzido

function withVar() {
  for (var i = 0; i < 10; i++) {
    console.log('var' + i);
  }

  i = 20; // o "i" irá receber 20 aqui por causa do var
  console.log(i);
}

function withLet() {
  for (let x = 0; x < 10; x++) {
    console.log('let' + x);
  }

  x = 20; // o "i" irá receber 20 aqui por causa do var
  console.log(x);
}

withVar();
withLet();

// const = não podemos reatribuir valores

const c = 20;
c = 10; // erro

// Mas.. hard code ainda dá

const d = [];
console.log(d);

d.push(1);
console.log(d); // funciona