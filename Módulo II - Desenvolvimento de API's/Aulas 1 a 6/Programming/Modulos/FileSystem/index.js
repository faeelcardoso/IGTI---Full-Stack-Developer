import {promises as fileSystem} from 'fs'; // coloco só fs porque já é uma biblioteca do JS, já reconhece o FileSystem

start();

// HANDSOME ASYNC AWAIT
async function start() {
  try {
    await fileSystem.writeFile("teste.txt", "Testando 1 2 3...");
    await fileSystem.appendFile("teste.txt", "\nTestando novamente...");
    const data = await fileSystem.readFile("teste.txt", "utf-8");
    console.log(data);
  } catch(err) {
    console.log(err);
  }
}

// Utilizando promisses = NÃO USAR
/*fileSystem.writeFile("teste.txt", "Testando 1 2 3...").then(() => {
  fileSystem.appendFile("teste.txt", "\nTestando novamente...").then(() => {
    fileSystem.readFile("teste.txt", "utf-8").then(resp => {
      console.log(resp);
    }).catch(err => {
      console.log(err);
    });
  }).catch(err => {
    console.log(err);
  });
  }).catch(err => {
    console.log(err);
});*/


// Callbacks hadouken = NÃO USAR
// import fileSystem from 'fs';

/*fileSystem.writeFile("teste.txt", "Testando 1 2 3...", (err) => { // Params: arq, texto arq, callback
  if (err) {
    console.log(err);
  } else {
    fileSystem.appendFile("teste.txt", "\nMais um teste...", (err) => { // Params: arq, texto a acrescentar, callback
      if (err) {
        console.log(err);
      } else {
        fileSystem.readFile("teste.txt", "utf-8", (err, data) => { // Params: arq, tipo de texto, callbaks erro e dados
          if (err) {
            console.log(err);
          } else {
            console.log(data);
          }
        });
      }
    });
  }
});*/ 