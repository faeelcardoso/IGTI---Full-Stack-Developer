import http from 'http';

http.createServer((req, res) => {
  if((req.method === 'GET') && (req.url === '/teste')) { // se o metodo for GET e a url /teste
    res.write('GET /teste realizado com sucesso!'); // essa vai ser a resposta
  } else {
    res.write('Hello World!'); // para todo o resto, essa
  }
  res.statusCode = 200;
  res.end(); // sempre tem que terminar
}).listen(8080); // vai escutar na porta 8080

// Nodemon rodando...