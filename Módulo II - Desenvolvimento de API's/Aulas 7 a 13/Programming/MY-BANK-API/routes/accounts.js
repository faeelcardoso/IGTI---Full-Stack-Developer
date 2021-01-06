import express from 'express';
import { promises as fileSystem } from 'fs';
import cors from 'cors';

const { readFile, writeFile } = fileSystem;

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    let account = req.body; // here is the whole body of the request

    if (!account.name || account.balance == null) {
      throw new Error('Name and Balance are required!');
    } 
    
    if (account.balance === "") {
      throw new Error('Balance cannot be empty!');
    }

    const data = JSON.parse(await readFile(global.fileName));

    account = { 
      id: data.nextId++,
      name: account.name,
      balance: account.balance  
    }; 

    data.accounts.push(account); // add account in data

    await writeFile(global.fileName, JSON.stringify(data, null, 2)); // 2 means spaces in the JSON
    // Obs: when I'm working, I never put it that way because there I'll need a small file, with no spaces
    // Here I put it like that to be more visible

    res.send(account);

    global.logger.info(`POST /account - ${JSON.stringify(account)}`);
  } catch(err) {
    next(err);
  }
});

router.get('/', async (_, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId; // delete nextId because the user doesn't need to see it
    res.send(data);

    global.logger.info('GET /account');
  } catch(err) {
    next(err);
  }
});

router.get('/:id', cors(), async (req, res, next) => { // Pay attention that has a "cors" here, so I'm sharing this req with another domain. Like that, I share just this domain
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const accountID = data.accounts.find(account => account.id === parseInt(req.params.id));
    // I need to put "parseInt" because req.params.id is a string
    res.send(accountID); 

    global.logger.info(`GET /account ${JSON.stringify(accountID)}`);
  } catch(err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    data.accounts = data.accounts.filter(account => account.id !== parseInt(req.params.id)); // It'll return all accounts, except the one passed in the param

    await writeFile(global.fileName, JSON.stringify(data, null, 2)); // To write new file 
    res.end();

    global.logger.info(`DELETE /account/:id - ${req.params.id}`);
  } catch(err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => { // The PUT is a complete update 
  try {
    const account = req.body; // here is the whole body of the request

    if (!account.id || !account.name || account.balance == null) {
      throw new Error('Id, Name and Balance are required!');
    }

    if (account.balance === "") {
      throw new Error('Balance cannot be empty!');
    }

    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex(accountIndex => accountIndex.id === account.id); // find with Index just return the index

    if (index === -1) {
      throw new Error('Register not found!');
    }

    data.accounts[index].name = account.name;
    data.accounts[index].balance = account.balance;

    await writeFile(global.fileName, JSON.stringify(data, null, 2)); 

    res.send(acount);

    global.logger.info(`PUT /account - ${JSON.stringify(account)}`);
  } catch(err) {
    next(err);
  }
});

router.patch('/updateBalance', async (req, res, next) => { // The difference is 'patch' just update one, for example this method update the Balance. But you know, no one uses it
  try {
    const account = req.body;

    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex(accountIndex => accountIndex.id === account.id);

    if (!account.id || account.balance == null) {
      throw new Error('Id and Balance are required!');
    }

    if (account.balance === "") {
      throw new Error('Balance cannot be empty!');
    }

    if (index === -1) {
      throw new Error('Register not found!');
    }

    data.accounts[index].balance = account.balance;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(data.accounts[index]);

    global.logger.info(`PATCH /account/updateBalance - ${JSON.stringify(account)}`);
  } catch(err) {
    next(err);
  }
});

// Error Handling
router.use((err, req, res, next) => {
  global.logger.error(`${req.method} ${req.baseURL} - ${err.message}`); 
  res.status(400).send({ error: err.message });
});

export default router;