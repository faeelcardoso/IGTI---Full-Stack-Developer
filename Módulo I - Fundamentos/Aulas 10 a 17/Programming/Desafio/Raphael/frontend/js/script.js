// Estado da aplicação
let globalUsers = [];
let globalInputSearch = null;
let globalButtonSearch = null;
let globalSpinnerLoading = null;

const URL_BACKEND = 'http://localhost:3001/users'; // Minha API local
const MINIMUM_LENGTH_SEARCH = 1; // Pesquisar no mínimo 1 para aparecer algo na tela

const formatter = Intl.NumberFormat('pt-BR'); // formatar pra pt-br os números

async function start() {
  await fetchUsers();

  mapIds();
  addEvents();
  enableControls();

  showNoUsers();
  showNoStatistics();
}

async function fetchUsers() {
  const resource = await fetch(URL_BACKEND);
  const json = await resource.json();

  globalUsers = json
    .map(({ login, name, picture, gender, dob }) => {
      // const { login, name, picture, gender, dob } = user; Poderia ser assim

      return {
        id: login.uuid,
        name: `${name.first} ${name.last}`,
        filterName: `${name.first} ${name.last}`.toLowerCase(),
        picture: picture.large,
        gender,
        age: dob.age,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name)); // ordenar
}

function mapIds() { // Manipulando a DOM
  globalInputSearch = document.querySelector('#inputSearch');
  globalButtonSearch = document.querySelector('#buttonSearch');
  globalSpinnerLoading = document.querySelector('#spinnerLoading');
  divUsers = document.querySelector('#divUsers');
  divStatistics = document.querySelector('#divStatistics');
}

function addEvents() {
  globalInputSearch.addEventListener('keyup', handleInputChange);
  globalButtonSearch.addEventListener('click', () =>
    filterUsers(globalInputSearch.value.trim())
  );
}

function enableControls() { // Tirar o disabled do input
  setTimeout(() => {
    globalInputSearch.disabled = false;
    globalInputSearch.focus();

    globalSpinnerLoading.classList.add('hidden');
  }, 1000);
}

function showNoUsers() {
  divUsers.innerHTML = `<h2>Nenhum usuário filtrado</h2>`;
}

function showNoStatistics() {
  divStatistics.innerHTML = `<h2>Nada a ser exibido</h2>`;
}

function handleInputChange({ target, key }) {
  const searchText = target.value.trim();
  const length = searchText.length;

  globalButtonSearch.disabled = length < MINIMUM_LENGTH_SEARCH; // no mínimo 1 caractere para pesquisar

  if (key !== 'Enter') {
    return;
  }

  if (length < MINIMUM_LENGTH_SEARCH) {
    return;
  }

  filterUsers(searchText);
}

function filterUsers(searchText) {
  const lowerCaseSearchText = searchText.toLowerCase(); // para pegar usuários com letras minúsculas também

  const filteredUsers = globalUsers.filter(user => {
    return user.filterName.includes(lowerCaseSearchText);
  });

  handleFilteredUsers(filteredUsers);
}

function handleFilteredUsers(users) {
  if (users.length === 0) {
    showNoUsers();
    showNoStatistics();
  }

  showUsers(users);
  showStatisticsFrom(users);
}

function showUsers(users) {
  const h2 = document.createElement('h2');
  h2.textContent = users.length + ' usuário(s) encontrado(s)';

  const ul = document.createElement('ul');

  users.map(({ name, picture, age }) => {
    const li = document.createElement('li');
    li.classList.add('flex-row');

    const img = `<img class='avatar' src=${picture} alt=${name} title=${name} />`;
    const span = `<span>${name}, ${age} anos</span>`;

    li.innerHTML = `${img} ${span}`;
    ul.appendChild(li);
  });

  divUsers.innerHTML = '';
  divUsers.appendChild(h2);
  divUsers.appendChild(ul);
}

function showStatisticsFrom(users) {
  const countMale = users.filter(user => user.gender === 'male').length;
  const countFemale = users.filter(user => user.gender === 'female').length;
  const sumAges = users.reduce((accumulator, { age }) => accumulator + age, 0);

  const averageAges = (sumAges / users.length || 0)
    .toFixed(2)
    .replace('.', ',');

  divStatistics.innerHTML = `
      <h2>Estatísticas</h2>

      <ul>
        <li>Sexo masculino: <strong>${countMale}</strong></li>
        <li>Sexo feminino: <strong>${countFemale}</strong></li>
        <li>Soma das idades: <strong>${formatValue(sumAges)}</strong></li>
        <li>Média das idades: <strong>${averageAges}</strong></li>
      </ul>    
    `;
}

function formatValue(value) {
  return formatter.format(value);
}

start();