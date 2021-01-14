const clickArray = [];

function start() {
  const button = document.querySelector('#clickButton');
  button.addEventListener('click', handleButtonClick);
}

function handleButtonClick() {
  clickArray.push(getNewTimestamp());

  render();
}

function render() {
  const ul = document.querySelector('#data');
  ul.innerHTML = '';

  let lis = '';

  clickArray.map((item) => {
    lis += `<li>${item}</li>`;
  });

  ul.innerHTML = lis;

  document.title = clickArray.length;

  // Here the 'li's' are always set up, but the entire structure, as if the 'ul' fully recharges each time a new 'li' arrives. 
  // It isn't good. Não performático.
}

start();