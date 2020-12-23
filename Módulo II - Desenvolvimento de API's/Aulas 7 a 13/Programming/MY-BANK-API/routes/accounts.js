import express from 'express';
import { promises as fileSystem, read } from 'fs';

const { readFile, writeFile } = fileSystem;

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    let account = req.body; // here is the whole body of the request
    const data = JSON.parse(await readFile(global.fileName));

    account = { id: data.nextId++, ...account }; // put the ID at the beginning like this
    data.accounts.push(account); // add account in data

    await writeFile(global.fileName, JSON.stringify(data, null, 2)); // 2 means spaces in the JSON
    // Obs: when I'm working, I never put it that way because there I'll need a small file, with no spaces
    // Here I put it like that to be more visible

    res.send(account);
  } catch(err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/', async (_, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId; // delete nextId because the user doesn't need to see it
    res.send(data);
  } catch(err) {
    res.status.send({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const accountID = data.accounts.find(account => account.id === parseInt(req.params.id));
    // I need to put "parseInt" because req.params.id is a string
    res.send(accountID); 
  } catch(err) {
    res.status(400).send({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    data.accounts = data.accounts.filter(account => account.id !== parseInt(req.params.id)); // It'll return all accounts, except the one passed in the param

    await writeFile(global.fileName, JSON.stringify(data, null, 2)); // To write new file 
    res.end();
  } catch(err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;