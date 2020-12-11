import {promises as fileSystem} from 'fs';

async function writeReadJson() {
  try {
    // Escrever valores iniciais
    const arrayObjCarros = { carros: ['Gol', 'Mercedes', 'Porshe'] }
    await fileSystem.writeFile("teste.json", JSON.stringify(arrayObjCarros)); // faço a escrita, vem em objeto, converto para string para não criar o arq {Object, Object}
    // a escrita tem que ir em texto
    
    // Fazer a leitura do conteúdo atual
    const data = JSON.parse(await fileSystem.readFile('teste.json')); // para ler vem em bits, converto para JSON
    // com string não consigo acrescentar nada, em JSON já dá
    
    // Modificar o conteúdo
    data.carros.push('Fiat'); // modifiquei o array

    // Sobrescrever o arq json com o conteúdo modificado
    await fileSystem.writeFile('teste.json', JSON.stringify(data)); // Sobrescrevo o arq que já existe em um novo JSON com o conteúdo adicionado

  } catch(err) {
    console.log(err);
  }
}

writeReadJson();