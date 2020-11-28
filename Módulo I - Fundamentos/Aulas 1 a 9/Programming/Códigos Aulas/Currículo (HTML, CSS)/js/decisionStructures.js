console.log('Hello World !');

var title = document.querySelector('h1');
title.textContent = 'Modificado por Raphael Marques!';


// Let's practice now a little bit of Decision structures

var a = 8;
var b = 8;

if (a > b) {
  console.log('O número ' +a+ ' é maior que ' +b+ '!');
} else if (a < b) {
  console.log('O número ' +a + ' é menor que ' +b+ '!');
} else if (a = b) {
  console.log('O número ' +a + ' é igual a ' +b+ '!');
} else {
  console.log('Isso não é um número animal!');
}


// Now Ternary operator

var r = a > b ? 'maior' : a < b ? 'menor' : 'igual';

console.log(r);


var diaSemana = day === 1 ? 'Sunday' : day === 2 ? 'Monday' :
day === 3 ? 'Tuesday' : day === 4 ? 'Wednesday' : day === 5 ? 'Thursday' :
day === 6 ? 'Friday' : day === 7 ? 'Saturday' : 'Invalid day!'; 

console.log(diaSemana);


// Now a little bit of switch case

var r = '';

// prettier-ignore
var day = 1;
switch(day) {
  case 1: r = 'Sunday'; break;
  case 2: r = 'Monday'; break;
  case 3: r = 'Tuesday'; break;
  case 4: r = 'Wednesday'; break;
  case 5: r = 'Thursday'; break;
  case 6: r = 'Friday'; break;
  case 7: r = 'Saturday'; break;

  default: r = 'This is not a day of week!'
}

console.log(r);
