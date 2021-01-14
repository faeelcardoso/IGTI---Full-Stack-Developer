const clickArray = [];

function start() {
  const button = document.querySelector('#clickButton');
  button.addEventListener('click', handleButtonClick);
}

function handleButtonClick() {
  const now = new Date();
  clickArray.push(now); 

  console.log(clickArray);
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
}

start();