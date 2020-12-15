import express from 'express';
import carsRouter from './carsRouter.js';

const app = express();
app.use(express.json());

// Application Level && Router Level
// Application all in a single file
// Router I literally create routes

// Application 

// Important: everything that i put in "use" will be executed every time
app.use((req, res, next) => { // That is, always it'll pass here
  console.log(new Date());
  next();
});

app.get('/test', (_, res) => {
  res.end();
});

// Router
app.use('/cars', carsRouter); // Here is the Router from another arq. Everything that be "cars", will jump to carsRouter.js


app.listen(3000, () => {
  console.log('API Started!');
});

// That is, has '/test'? Ends. Has '/cars'? Jumping to the other file and works there! AWESOME!!!!