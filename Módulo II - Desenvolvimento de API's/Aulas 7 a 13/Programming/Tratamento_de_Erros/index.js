import express from 'express';

const app = express();
app.use(express.json());

// Custom error, throw the error
app.get('/', (req, res) => { 
  throw new Error('Error message test');
});

// Anyway, with async always put "Try - Catch" and "Next" for throw the error forward, if else, infinite loop
app.post('/', async (req, res, next) => {
  try {
    throw new Error ('Error message async');
  } catch(err) {
    next(err);
  }
});

// Error Handling (Erro mais tratado), catch the error
app.use((err, req, res, next) => {
  console.log('Error 01');
  next(err);
});

app.use((err, req, res, next) => {
  console.log('Error 02');
  res.status(500).send('An error has occurred. Please try again later...');
});

app.listen(3000, () => {
  console.log('API Started!');
});