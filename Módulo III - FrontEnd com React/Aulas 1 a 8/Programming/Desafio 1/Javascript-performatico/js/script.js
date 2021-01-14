const clickArray = [];

function start() {
  const button = document.querySelector('#clickButton');
  button.addEventListener('click', handleButtonClick);
}

function handleButtonClick() {
  const item = getNewTimestamp();
  clickArray.push(item);

  render(item);
}

function render(item) {
  // JS Não Performático
  // ul.innerHTML = '';

  // let lis = '';

  // clickArray.map((item) => {
  //   lis += `<li>${item}</li>`;
  // });

  // ul.innerHTML = lis;
  // Here the 'li's' are always set up, but the entire structure, as if the 'ul' fully recharges each time a new 'li' arrives. 
  // It isn't good. Não performático.

  
  // JS Performático
  const ul = document.querySelector('#data');
  
  const li = document.createElement('li');
  li.textContent = item;

  ul.appendChild(li); // I'm adding a child in 'ul'

  document.title = clickArray.length;
  
  // Here just the last 'li' is add, we get performance
  // It's good. 
}

start();