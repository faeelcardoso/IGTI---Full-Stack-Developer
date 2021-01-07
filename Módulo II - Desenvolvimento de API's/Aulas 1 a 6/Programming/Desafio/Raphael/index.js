import {promises as fileSystem} from 'fs';

const { readFile, writeFile } = fileSystem; 

createFiles();

async function createFiles() {
  // Reading files 
  let data = await readFile('./files/Estados.json');  
  const states = JSON.parse(data);

  data = await readFile('./files/Cidades.json');
  const cities = JSON.parse(data);

  // Creating 1 JSON with its state and cities
  for (let state of states) {
    const statesCities = cities.filter(city => city.Estado === state.ID);
    await writeFile(`./states/${state.Sigla}.json`, JSON.stringify(statesCities));
  }

  console.log(states);
}