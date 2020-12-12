import readLine from 'readline';

// Primeiro se cria a interface
const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});

function pergunta() {
  rl.question("Digite um número: " + "\nObs: se quiser sair do terminal digite -1... ", numero => {
    if(parseInt(numero) === -1) {
      rl.close(); // sai fora
    } else {
      const multiplos = [];
      for(let i = 3; i < parseInt(numero); i++) {
        if((i % 3 === 0) || (i % 5 === 0)) {
          multiplos.push(i);
        }
      }
      console.log(multiplos);
      pergunta();
    }
  });  
}

pergunta();