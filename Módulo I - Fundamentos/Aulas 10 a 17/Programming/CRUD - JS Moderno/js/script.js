let globalNames = ['Teste']; // aqui vai os nomes
let inputName = null; // input vazião
let isEditing = false;
let currentIndex = null;
 
function start() { // quando abrir já para o efeito normal do form de dar submit e recarregar a tela
  inputName = document.querySelector('#inputName'); 
  
  preventFormSubmit(); // não dar reload a cada submit
  activateInput(); 
  render();
}

function preventFormSubmit() {
  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);

  function handleFormSubmit(event) {
    event.preventDefault();
  }
}

function activateInput() { 
  function insertName(newName) { // esse newName é o event.target.value ali de cima que está sendo passado
    if (newName.trim() === '') { // trim elimina espaço em branco desnecessário
      activateInput();
    } else {
    // antes: globalNames.push(newName);
    globalNames = [...globalNames, newName]; // globalNames recebe o que já tem mais os novos
    }
  }

  function updateName(newName) { 
    if (newName.trim() === '') {
      activateInput();
    } else {
    globalNames[currentIndex] = newName; 
    }
  }

  inputName.focus(); // ir direito para o input para evitar do usuário ter que clicar para colocar o cursor

  inputName.addEventListener('keyup', handleTyping); // escutar o que ele digita, keyup = quando solta a tecla

  function handleTyping(event){ // lembrar tudo que eu quero saber, só dar um console.log e ver oq ta rolando no event
    if(event.key === 'Enter') {
      if(isEditing){
        updateName(event.target.value); // event.target.value = o que está sendo digitado no input
      } else {
        insertName(event.target.value); // event.target.value = o que está sendo digitado no input
      }

      render(); // renderizada na página para pegar o update ou o insert novo
      isEditing = false;
      clearInput();
    }
  }
}

function render(){ // vai preencher a div com os nomes digitados no input
  function createDeleteButton(index) { 
    var button = document.createElement('button'); // botão excluir
    button.textContent = 'X'; 
    button.classList.add('deleteButton'); // adicionando a classe do css
    
    button.addEventListener('click', deleteName); // quando clicar no button, deleteName executa
    
    return button;
    
    function deleteName(){
      // ANTES: globalNames.splice(index, 1); pego o index e excluo 1

      // Refatoração 1:
      //globalNames = globalNames.filter((name, i) => {
        // if (i === index) {
        //   return false;
        // }
        // return true;
        // Mas posso fazer ainda mais elegante e simples
      //});

      // Refatoração 2:
      globalNames = globalNames.filter((name, i) => i !== index); // simples, top!
      
      render(); // dps de excluído, renderizo de novo 
    }
  }

  function createSpan(currentName, index) {
    function editItem() {
      inputName.value = currentName; // passa pro input o nome atual
      inputName.focus(); // focus daora
      isEditing = true;
      currentIndex = index; // variável index atual recebe o index atual
    }

    var span = document.createElement('span');
    span.classList.add('clickable'); // adicionando a classe do css no span
    span.textContent = currentName; // o nome atual vai pro span
    span.addEventListener('click', editItem); // ao clicar no span com o mouse chama a função editItem
  
    return span;
  }

  var divNames = document.querySelector('#names'); // peguei a div onde irei adicionar os novos nomes
  divNames.innerHTML = ''; // para evitar de repetir todo array na hr de rodar a função

  // O que tenho que fazer: Criar ul
  // Fazer n li's, conforme tamanho do globalNames, bora!

  var ul = document.createElement('ul'); // assim se cria um elemento, com createElement
  // Bora começar a dinâmica
  for(var i = 0; i < globalNames.length; i++) { // para pegar o tamanho do array, use length. Enquanto o "i" for menor que o tamanho do array vai adicionando
    var currentName = globalNames[i]; // nome atual

    var li = document.createElement('li'); // criei a li

    var button = createDeleteButton(i); // passo para variável button a função createDeleteButton com o index atual do for, para ele saber qual excluir

    var span = createSpan(currentName, i); // passo para a variável span a função de criar o span, passando o nome atual

    li.appendChild(button); // acrescento o button como filho do li
    li.appendChild(span); // acrescento o span como filho do li

    ul.appendChild(li); // acrescento o li como filho do ul
  }
  
  divNames.appendChild(ul); // appendChild, acrescenta em divNames um filho ul depois de inserir todos os li
  clearInput(); // limpar o input
}


// function clearInput() {
//   inputName.value = ''; // limpar o input
//   inputName.focus(); // colocar o cursor no input de nv
// }

// Refatoração 1: arrow function
const clearInput = () => {
  inputName.value = '';
  inputName.focus();
}

start();