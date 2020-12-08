function start() {
  doFetch();
  doFetchAsync();
}

function doFetch() {
  fetch('https://api.github.com/users/faeelcardoso').then(res => { // Binary data
    res.json().then(data => { // JSON data
      showData(data);
    });
  }).catch(error => {
    console.log('Erro');
  }); // That is, "then" for when it works and "catch" when it fails 

  executeDivisionPromise();
}

async function doFetchAsync() {
  const res = await fetch('https://api.github.com/users/faeelcardoso'); // Binary data
  const json = await res.json(); // JSON data
  showDataAsync(json);
  
  executeDivisionPromiseAsyncAwait();
}

function showData(data) {
  const userApi = document.querySelector('#api');
  userApi.textContent = data.login + ' ' + data.name; // alright, showing data from an outside API 
}

function showDataAsync(json) {
  const userApi = document.querySelector('#api');
  userApi.textContent = json.login + ' ' + json.name; // alright, showing data from an outside API 
}

// Now I'll create a promise, usually doesn't use this in work environment, but it's good to understand
function executeDivisionPromise() {
  divisionPromise(12, 2).then(result => {
    console.log(result);
  }).catch(err => {
    console.log('Falha na divisão. ' + err);
  });
}

// Now the same example, but in AsyncAwait, much more simple
async function executeDivisionPromiseAsyncAwait() {
  const division = await divisionPromise(12, 2);
  console.log(division);
}

function divisionPromise(a, b) { // 2 NUMBERS
  return new Promise((resolve, reject) => { // new Promise
    if (a === 0 || b === 0) { // catch
      reject('Não é possível dividir por 0'); 
    }

    resolve(a / b); // then
  });
}

start();