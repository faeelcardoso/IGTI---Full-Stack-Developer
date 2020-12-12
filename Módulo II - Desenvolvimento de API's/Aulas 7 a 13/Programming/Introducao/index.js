import express from 'express';

const app = express();

app.get('/users', (req, res) => {
  if((req.method === 'GET') && (req.url === '/users')) {
    res.send('Hello World GET!');
  } else {
    res.send('O mano sai vazado, deu ruim!');
  }
  
});

app.post('/', (req, res) => {
  const a = 3;
  const b = 2;
  const resultado = soma(a, b);

  res.send(`Resultado é: ${resultado}`)
});

function soma(a, b) {
  const result = a + b;
  return result;
}

app.listen(3000, () => {
  console.log('API Started!!')
});