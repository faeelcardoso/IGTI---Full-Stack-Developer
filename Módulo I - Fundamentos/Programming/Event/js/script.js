// Para previnir, uma boa prática é com o "window"
// com ele, ele faz com que tudo rode somente quando todo o HTML carregar

window.addEventListener('load', start); // load = o evento onload e start nome da minha função, aq só estou referenciando

function start() {
  console.log('Página totalmente carregada!');

  // Agr vão brincá!
  var nameInput = document.querySelector('#nameInput'); // Peguei o input 
  nameInput.addEventListener('keyup', countName); // adicionei o evento e a função

  var form = document.querySelector('form'); // peguei o formulário
  form.addEventListener('submit', preventDefault); // coloquei o evento submit e add minha função pra prevenir o submit padrão
}

function countName(event) {
  console.log(event);
  var count = event.target.value; // tudo que está dentro do input fica dentro do target.value, peguei e adicionei em "count"

  var span = document.querySelector('#nameLength'); // peguei o span
  span.textContent = count.length; // coloco no conteúdo do span, tudo que o está no input, armazenado na variável count, porém coloco o comprimento dele
}

function preventDefault(event) {
  event.preventDefault(); // simples, só isso já previni o custom

  var nameInput = document.querySelector('#nameInput'); // peguei o que o usuário digita
  alert(nameInput.value + ' Cadastrado com sucesso!'); // coloquei no alert o valor do input + ...
}

/*
Palavras chaves: 
"SE" para decisão
"ENQUANTO" para repetição
"QUANDO" para eventos
*/