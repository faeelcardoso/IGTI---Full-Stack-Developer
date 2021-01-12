import {promises as fileSystem} from 'fs';

const { readFile, writeFile } = fileSystem; 

async function start() {
  await createFiles();
  console.log(await getCitiesCount('SP'));
  await getStatesWithMoreOrLessCities(true);
  await getStatesWithMoreOrLessCities(false);
  await getBiggestOrSmallestNameEachState(true);
  await getBiggestOrSmallestNameEachState(false);
  await getBiggestOrSmallestCityName(true);
  await getBiggestOrSmallestCityName(false);
}

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
}

async function getCitiesCount(uf) { // How many cities are there in SP?
  // Reading file
  const data = await readFile(`./states/${uf}.json`);
  const cities = JSON.parse(data);
  return cities.length;
}

async function getStatesWithMoreOrLessCities(more) {
  const states = JSON.parse(await readFile('./files/Estados.json'));
  const list = [];

  for (let state of states) {
    const count = await getCitiesCount(state.Sigla);
    list.push({ uf: state.Sigla, count });
  }

  list.sort((a, b) => {
    if(a.count < b.count) return 1;
    else if(a.count > b.count) return -1;
    else return 0;
  });

  const result = [];
  // 5 primeiros
  if(more) {
    list.slice(0, 5).forEach(item => result.push(`${item.uf} - ${item.count}`)); 
  } else {
    // 5 últimos
    list.slice(-5).forEach(item => result.push(`${item.uf} - ${item.count}`)); 
  }

  console.log(result);
}

// The most names of the cities in each state
async function getBiggestName(uf) { // Here get the biggest name
  const cities = JSON.parse(await readFile(`./states/${uf}.json`));

  let result;

  cities.forEach(city => {
    if(!result) 
      result = city;
    else if(city.Nome.length > result.Nome.length) 
      result = city;
    else if((city.Nome.length === result.Nome.length) && (city.Nome.toLowerCase() < result.Nome.toLowerCase()))
      result = city;
  });

  return result;
}

async function getSmallestName(uf) { // Here get the smallest name
  const cities = JSON.parse(await readFile(`./states/${uf}.json`));

  let result;

  cities.forEach(city => {
    if(!result) 
      result = city;
    else if(city.Nome.length < result.Nome.length) 
      result = city;
    else if((city.Nome.length === result.Nome.length) && (city.Nome.toLowerCase() < result.Nome.toLowerCase()))
      result = city;
  });

  return result;
}

async function getBiggestOrSmallestNameEachState(biggest) { // Here will add each biggest or smallest name of the each state
  const states = JSON.parse(await readFile('./files/Estados.json'));
  const result = [];

  for (let state of states) {
    let city;
    if(biggest) {
      city = await getBiggestName(state.Sigla);  
    } else {
      city = await getSmallestName(state.Sigla);
    }
    result.push(`${city.Nome} - ${state.Sigla}`);
  }
  console.log(result);
}

async function getBiggestOrSmallestCityName(biggest) {
  const states = JSON.parse(await readFile('./files/Estados.json'));
  const list = [];

  for (let state of states) {
    let city;
    if(biggest) {
      city = await getBiggestName(state.Sigla);
    } else{ 
      city = await getSmallestName(state.Sigla);
    }
    list.push({ name: city.Nome, uf: state.Sigla });
  }

  const result = list.reduce((prev, current) => {
    if(biggest) {
      if(prev.name.length > current.name.length) return prev;
      else if(prev.name.length < current.name.length) return current;
      else return prev.name.toLowerCase() < current.name.toLowerCase() ? prev : current;
    } else{
      if(prev.name.length < current.name.length) return prev;
      else if(prev.name.length > current.name.length) return current;
      else return prev.name.toLowerCase() < current.name.toLowerCase() ? prev : current;
    }
  });
  console.log(`${result.name} - ${result.uf}`);
}
 
start();