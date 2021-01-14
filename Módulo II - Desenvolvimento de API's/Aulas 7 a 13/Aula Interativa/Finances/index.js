import express from 'express';
import { promises } from 'fs';
import lancamentosRoutes from './routes/lancamentos.js';

global.fileName = 'lancamentos.json';

const { readFile, writeFile } = promises;

const app = express();
app.use(express.json());

app.use('/lancamentos', lancamentosRoutes);

app.listen(3000, async () => {
  try{ // trying read file
    await readFile(global.fileName);
    console.log('API Started!');
  } catch(err) { // Don't exist? create it
    const initialJson = {
      nextId: 1,
      lancamentos: []
    }
    try { // trying to write file
      writeFile(global.fileName, JSON.stringify(initialJson));
      console.log('API Started!');
    } catch(err) {
      console.log(err);
    }
  }
});