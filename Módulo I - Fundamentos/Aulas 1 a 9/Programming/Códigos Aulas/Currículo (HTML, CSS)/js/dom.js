// Some tests

var city = document.querySelector('#city'); // querySelector acessa só um
city.textContent = 'São Paulo' // testContent acessa o conteúdo, lembre-se input não tem conteúdo

// para pegar todos de uma vez
var dados = document.querySelectorAll('#dados-um');
dados = Array.from(dados); // converter de nodelist para array
dados.textContent = 'Mudei geral'

// 2 códigos em 1
var dados = Array.from(document.querySelectorAll('#dados-um')); // aqui já pega todo o id e converte em array

/* 
querySelector = utiliza para obter um único elemento
querySelectorAll = utiliza para obter vários elementos semelhantes
textContent = refere-se ao conteúdo textual de diversos elementos
*/