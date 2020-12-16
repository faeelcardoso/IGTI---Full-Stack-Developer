import express from 'express';
import winston from 'winston';

const app = express();
app.use(express.json());

const { combine, printf, label, timestamp } = winston.format; // For not to keep putting winston.format.something everytime

const myFormat = printf(({ level, message, label, timestamp }) => { // What I wanna show on my log
  return `${timestamp} [${label}] ${level}: ${message}`; // Like this
});

// Start winston
const logger = winston.createLogger({
  level: 'silly', // Here I put witch level I want to work
  transports: [
    new (winston.transports.Console)(), // I wanna show it on Console
    new (winston.transports.File)({ filename: "my-log.log" }) // I wanna create a .log File as well
  ],
  format: combine(
    label({ label: 'my-app' }),
    timestamp(),
    myFormat
  )
});

// Now, all the levels
logger.error('Error log');
logger.warn('Warn log');
logger.info('Info log');
logger.http('Http log');
logger.verbose('Verbose log');
logger.debug('Debug log');
logger.silly('Silly log');

logger.log('error' ,'Error log specifying'); // And, I can put like this specifying the method

app.listen(3000, () => {
  console.log('API Started!');
});