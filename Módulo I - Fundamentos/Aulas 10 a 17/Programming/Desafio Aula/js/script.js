// Estado da Aplicação (state)

let tabCountries = null; // divs onde vão ficar as inf
let tabFavorites = null;  

let allCountries = []; // países 
let favoriteCountries = [];

let countCountries = 0; // contador para contar os países
let countFavorites = 0;

let totalPopulationList = 0; // total para receber o contador dps do reduce
let totalPopulationFavorites = 0;

let numberFormat = null;

function start() {
  // Manipular a DOM

  tabCountries = document.querySelector('#tabCountries');
  tabFavorites = document.querySelector('#tabFavorites');
  countCountries = document.querySelector('#countCountries');
  countFavorites = document.querySelector('#countFavorites');
  totalPopulationList = document.querySelector('#totalPopulationList');
  totalPopulationFavorites = document.querySelector('#totalPopulationFavorites');

  numberFormat = Intl.NumberFormat('pt-BR'); // para formatar os números para padrão BR

  fetchCountries(); // API
}

async function fetchCountries() {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const json = await res.json();
  allCountries = json.map(country => {
    const { numericCode, translations, population, flag } = country; // destructuring
    
    return { // onde é o msm nome posso colocar só uma vez
      id: numericCode, // diferente
      name: translations.pt, // pro nome vim em PTBR
      population, // mesmo, aqui seria por exemplo: population: population. Coloco uma vez só e funciona
      formattedPopulation: formatNumber(population), // pego a população e transformo para padrão BR
      flag
    }
  });

  render(); // render é o que vai montar os dados na tela, o html em tela
}

function render() {
  renderCountryList();
  renderFavorites();
  renderSummary();

  handleCountryButtons();
}

function renderCountryList() {
  let countriesHTML = '<div>'; // abrindo a div

  allCountries.forEach(country => {
    const { name, flag, id, formattedPopulation } = country;

    // Aqui irá ter 3 divs, uma para o botão, depois para a bandeira e depois para os dados do pais. E uma div contornando os 3 que é a container
    const countryHTML = ` 
      <div class='country'>
        <div>
          <a id="${id}" class="waves-effect waves-light btn">+</a> 
        </div>
        <div>
          <img src="${flag}" alt="${name}">
        </div>
        <div>
          <ul>
            <li>${name}</li>
            <li>${formattedPopulation}</li>
          </ul>
        </div>
      </div>
    `;

    countriesHTML += countryHTML; // vai implementando a variável countriesHTML 
  });

  countriesHTML += '</div>'; // fechando a div
  tabCountries.innerHTML = countriesHTML; // a tabela recebe os países
}

function renderFavorites() {
  let favoritesHTML = '<div>'; // abrindo a div

  favoriteCountries.forEach(country => {
    const { name, flag, id, formattedPopulation } = country;

    const favoriteCountryHTML = ` 
      <div class='country'>
        <div>  
          <a id="${id}" class="waves-effect waves-light btn red darken-4">-</a> 
        </div>
        <div>
          <img src="${flag}" alt="${name}">
        </div>
        <div>
          <ul>
            <li>${name}</li>
            <li>${formattedPopulation}</li>
          </ul>
        </div>
      </div>
    `;

    favoritesHTML += favoriteCountryHTML;
  });

  favoritesHTML += '</div>'; // fechando a div
  tabFavorites.innerHTML = favoritesHTML; // a tabela recebe os países favoritos
}

function renderSummary() {
  countCountries.textContent = allCountries.length; // total de países
  countFavorites.textContent = favoriteCountries.length; // total de países favoritos

  const totalPopulation = allCountries.reduce((acc, curr) => { // reduce pra fazer conta
    return acc + curr.population; // acumulador + população atual
  }, 0);

  const totalFavorites = favoriteCountries.reduce((acc, curr) => {
    return acc + curr.population;
  }, 0);

  totalPopulationList.textContent = formatNumber(totalPopulation); // taca na lista
  totalPopulationFavorites.textContent = formatNumber(totalFavorites); 
}

function handleCountryButtons() { // mágica dos botões
  const countryButtons = Array.from(tabCountries.querySelectorAll('.btn')); // Peguei os botões
  const favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn')); // Peguei os botões
  // lembrando que sem o Array.from retorna um nodeList, com ele retorna um Array
  
  countryButtons.forEach(button => {
    button.addEventListener('click', () => addToFavorites(button.id)); // forEach para cada click passar para a função o id do botão que foi clicado
  });

  favoriteButtons.forEach(button => {
    button.addEventListener('click', () => removeFromFavorites(button.id)); // forEach para cada click passar para a função o id do botão que foi clicado
  });
}

function addToFavorites(id) {
  const countryToAdd = allCountries.find(country => country.id === id); // para saber qual país vou adicionar na lista de favoritos
  // pego 1 país, por isso uso find

  favoriteCountries = [...favoriteCountries, countryToAdd]; // favoriteCountries começa zerado
  // espalho todos os países favoritos que já existem(nenhum nesse caso) e vou adicionando mais a cada clique com o countryToAdd

  favoriteCountries.sort((a, b) => {
    return a.name.localeCompare(b.name); // desse jeito compara e organiza de ordem alfabética os países
  });

  // depois que ordenei na lista de favoritos, tenho que remover o país favorito da lista normal
  allCountries = allCountries.filter(country => country.id !== id); // ele vai comparar os id's e se o id for diferente ele mantém na lista original, caso contrário remove.

  render(); // relembrando, mudança na tela tem que renderizar de novo para aparecer
}

function removeFromFavorites(id) {
  const removeFromFavorites = favoriteCountries.find(country => country.id === id); // para saber qual país vou remover da lista de favoritos

  allCountries = [...allCountries, removeFromFavorites]; // espalho todos os países e vou removendo dos favoritos e adicionando de novo em allCountries

  allCountries.sort((a, b) => {
    return a.name.localeCompare(b.name); // desse jeito compara e organiza de ordem alfabética
  });

  favoriteCountries = favoriteCountries.filter(country => country.id !== id); // ele vai comparar os id's e se o id for diferente ele mantém na lista de favoritos, caso contrário remove.

  render(); // relembrando, mudança na tela tem que renderizar de novo para aparecer
}

function formatNumber(number) { // vai receber um número aq
  return numberFormat.format(number); // vai formatar ele
}

start();