const YEAR_NUMBERS = [2019, 2020, 2021]; 

const MONTH_DESCRIPTIONS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export const YEARS = YEAR_NUMBERS.map((year, index) => {
  return {
    id: `y${index + 1}`,
    description: year.toString(),
    value: year,
  }
});

export const MONTHS = MONTH_DESCRIPTIONS.map((month, index) => {
  return {
    id: `m${index + 1}`,
    description: month,
    value: index + 1,
  }
});

async function fetchJson(url) {
  const res = await fetch(url);
  const json = await res.json();
  return json;
}

export async function apiGetTodos(year, month) {
  const url = `http://localhost:3001/todos?year=${year}&month=${month}`;
  const filteredTodos = await fetchJson(url);
  return filteredTodos;
}