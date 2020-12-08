function start() {
  doSpread();
  doRest();
  doDestructuring();
};

// O Spread espalha o array
function doSpread() {
  const marriedMen = people.results.filter(person => person.name.title === 'Mr'); // get all the men married
  const marriedWomen = people.results.filter(person => person.name.title === 'Ms'); // get all the women married

  const marriedPeople = [...marriedMen, ...marriedWomen, { msg: 'Hello!' }]; // Here I spread the men, women and a message, then I put all of them in an Array.

  console.log(marriedPeople);
  //This is the work of the Spread.
}

// O Rest faz o contrário, ele junta os valores
function doRest() {
  console.log(infinitySum(1, 2)); // valores espalhados
  console.log(infinitySum(1, 2, 3, 455, 600, 100));
  console.log(infinitySum(1, 2, 10, 1000, 10000));
}

function infinitySum(...numbers) { // coloco o rest para juntar os valores passados em ...numbers, aqui já está junto em um array
  return numbers.reduce((acc, curr) => acc + curr, 0); // agr um reduce só para somar os valores
}

// Agora o Destructuring, ele funciona para deixar a codificação mais limpa e menos massante e repetitiva
function doDestructuring() {
  const first = people.results[0]; // para pegar só o primeiro da API

  // Normal e repetitivo
  // const username = first.login.username;
  // const password = first.login.password;
  // console.log(username, password);

  // Agora com destructuring
  const { username, password } = first.login; // quero o username e password, desestruturando de first.login
  console.log(username, password);

  // Eai? hahahaha
}

start();