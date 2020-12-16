import express from 'express';

const app = express();
app.use(express.json());

// Static files 
app.use(express.static('public')); // I can do like this
// or I can create a virtual folder 
app.use('/images', express.static('public')); // virtual folder and real folder

// VEEEERY AWESOME!

app.listen(3000, () => {
  console.log('API Started!');
});