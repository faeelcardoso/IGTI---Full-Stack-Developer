import { promises } from 'fs';
import moment from 'moment';
import calc from '../lib/calculos.js';

// Aqui vai estar toda minha regra de negócio, cálculos especificos. Aqui vai ficar o readFile, writeFile
const { writeFile, readFile } = promises;

async function inserirLancamento(lancamento, type) {
  const json = JSON.parse(await readFile(global.fileName));
  lancamento = { id: json.nextId++, ...lancamento };

  if (type === 'D') {
    lancamento.value = lancamento.value * -1; // Assim o numero positivo vai pra negativo, 100 to -100
  }
  json.lancamentos.push(lancamento); // adiciono no array

  await writeFile(global.fileName, JSON.stringify(json, null, 2));

  return lancamento;
} 

async function totalMes(mes) {
  const json = JSON.parse(await readFile(global.fileName));

  let lancamentos = json.lancamentos.filter(lancamento => { // Pegando o mês
    const m = moment(lancamento.data, 'DD/MM/YYYY').month() + 1; // .month() pra pegar o mês. Tenho que colocar o +1, porq o moment coloca janeiro como 0 aí é foda
    return m === mes;
  });

  lancamentos = lancamentos.map(lancamento => {
    return lancamento.value; // pra retornar em número, porque se não vai em string e dá bosta. 
    // retornando em number posso fazer qualquer cálculo aq, agiliza
  });

  return { total: calc.sum(lancamentos) };
}

async function totalAno(ano) {
  const json = JSON.parse(await readFile(global.fileName));

  let lancamentos = json.lancamentos.filter(lancamento => { // Pegando o mês
    const a = moment(lancamento.data, 'DD/MM/YYYY').year(); // .month() pra pegar o mês. Tenho que colocar o +1, porq o moment coloca janeiro como 0 aí é foda
    return a === ano;
  });

  lancamentos = lancamentos.map(lancamento => {
    return lancamento.value; // pra retornar em número, porque se não vai em string e dá bosta. 
    // retornando em number posso fazer qualquer cálculo aq, agiliza
  });

  return { total: calc.sum(lancamentos) };
}

async function allLancamentos(accounts) {
    const json = JSON.parse(await readFile(global.fileName));
    delete json.nextId;
    accounts = json;
    
    return accounts;
}

export { inserirLancamento, totalMes, totalAno, allLancamentos};