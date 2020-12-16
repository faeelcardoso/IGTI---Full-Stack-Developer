import express from 'express';
import accountsRouter from './routes/accounts.js';
import { promises as fileSystem } from 'fs';

// desconstructuring
const { readFile, writeFile } = fileSystem; // I take these methods that I'll need, to make it easier

const app = express();
app.use(express.json());

// Always when being "/account", use this route
app.use('/account', accountsRouter);

app.listen(3000, async () => {
  try{ // trying read file
    await readFile('accounts.json');
    console.log('API Started!');
  } catch(err) { // Don't exist? create it
    const initialJson = {
      nextID: 1,
      accounts: []
    }
    try { // trying to write file
      writeFile('accounts.json', JSON.stringify(initialJson));
      console.log('API Started and File Created!');
    } catch(err) {
      console.log(err);
    }
  }
});