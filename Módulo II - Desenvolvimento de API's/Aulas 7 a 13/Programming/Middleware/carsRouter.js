import express from 'express';

const router = express.Router();

// Router

router.get('/', (_, res) => {
  console.log('GET /cars');
  res.send('GET /cars');
});

// And, if it's '/cars/price', will into here
router.all('/price', (_, res) => { 
  console.log('/price');
  res.send('/price');
});

// That is, I don't need put everything in one arq

export default router;