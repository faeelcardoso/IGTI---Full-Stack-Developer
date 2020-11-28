function start(){
  // Fetch trabalha com promises, promises são promessas que podem trazer algo depois ou não
  // Ou seja, o fetch pega os dados mas demora, o JS não espera e sai rodando o código e o Fetch fica no EventLoop do navegador até ficar pronto
  // O Fetch vai buscar os dados na API porém retorna em binário
  fetch('http://localhost:3001/countries').then(function (resource) { // Aqui o fetch tá trabalhando nos dados, then que terminar vai pro outro.
    console.log('Obtive o resource'); // em outras palavras, obtive a API em binário
    resource.json().then(function(json) { // com a API em binário, transformo em JSON
      console.log('Obtive o JSON, aleluia!'); // já estou com os dados em JSON salvos no json
      console.log(json);
    })
  })
  console.log('Fora da promise');
}
// Posso fazer assim ou encurtar com async await

// Função assíncrona não executa sequencial e tem o await pra ficar aguardando
async function start1(){
  var resource = await fetch('http://localhost:3001/countries'); // com o await estou dizendo, espera o fetch fica pronto ai meu chegado
  var json = await resource.json(); // Json prontin direto do forno

  console.log(json);
}

// Eai, qual start é mió? kkkkkkkkkk

//start();
start1();