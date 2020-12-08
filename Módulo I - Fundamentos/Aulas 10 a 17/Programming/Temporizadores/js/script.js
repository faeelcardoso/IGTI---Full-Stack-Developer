function start() {
  goTimer();
}

// A função setTimeout é utilizada para postergar execuções.
// A função setInterval posterga e repete as execuções a cada x milissegundos, precisa ser armazenada em uma variável.

const goTimer = () => {
  const timer = document.querySelector('#timer');
  let count = 0;
  let cancel = document.querySelector('#cancel');
  cancel.addEventListener('click', interruptTimer);

  
  function interruptTimer(e) {
    console.log(e)
    if (e && count >= 20) {
      clearInterval(interval);

      return goTimer();
    }
  }

  const interval = setInterval(() => {
    timer.textContent = ++count;
    
    if (count % 5 === 0) {
      setTimeout(() => {
        timer.textContent = count + ',5';
      }, 300);
    }
  }, 1000);
}

start();