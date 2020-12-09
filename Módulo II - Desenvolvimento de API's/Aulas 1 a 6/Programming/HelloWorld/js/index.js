const numero = parseInt(process.argv[2]); 
// process.argv [2] é como eu uso o um input com Node, como retorna uma string converto para inteiro
const multiplos = [];

for (let i = 3; i < numero; i++) {
  if((i % 3 === 0) || (i % 5 === 0)) {
    multiplos.push(i);
  }
}

console.log(multiplos);