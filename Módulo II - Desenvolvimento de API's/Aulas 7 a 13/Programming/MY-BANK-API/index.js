import express from 'express';
import winston from 'winston';
import accountsRouter from './routes/accounts.js';
import { promises as fileSystem } from 'fs';
//import cors from 'cors';

global.fileName = 'accounts.json';

// desconstructuring
const { readFile, writeFile } = fileSystem; // I take these methods that I'll need, to make it easier
const { combine, timestamp, label, printf } = winston.format; 

// creating my format of log
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

// Log
global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new (winston.transports.Console)(), // show it in the console.log
    new (winston.transports.File)({ filename: 'my-bank-api.log' }) // name of my log
  ],
  format: combine(
    label({ label: "my-bank-api" }),
    timestamp(),
    myFormat
  )
});

const app = express();
app.use(express.json());

// Static Files
app.use(express.static('public'));

// CORS
//app.use(cors()); // Like that, you allow every req

// Always when being "/account", use this route
app.use('/account', accountsRouter);

app.listen(3000, async () => {
  try{ // trying read file
    await readFile(global.fileName);
    global.logger.info('API Started!');
  } catch(err) { // Don't exist? create it
    const initialJson = {
      nextId: 1,
      accounts: []
    }
    try { // trying to write file
      writeFile(global.fileName, JSON.stringify(initialJson));
      global.logger.info('API Started and File Created!');
    } catch(err) {
      global.logger.error(err);
    }
  }
});