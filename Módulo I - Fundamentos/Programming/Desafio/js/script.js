var globalNames = ['Um', 'Dois', 'Três', 'Quatro'];
var inputName = null;

window.addEventListener('load', start);
function start() { // quando abrir já para o efeito normal do form de dar submit e recarregar a tela
  preventFormSubmit(); // não dar reload a cada submit

  inputName = document.querySelector('#inputName');
  activateInput(); // função para fazer o cursor ir direito para o inputName, como está dentro da função start, assim que a tela carregar
}

function preventFormSubmit() {
  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);

  function handleFormSubmit(event) {
    event.preventDefault();
  }
}

function activateInput() { 
  inputName.focus(); // ir direito para o input para evitar do usuário ter que clicar para colocar o cursor
}