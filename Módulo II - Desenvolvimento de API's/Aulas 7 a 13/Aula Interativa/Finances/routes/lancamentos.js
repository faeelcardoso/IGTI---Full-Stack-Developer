import express from 'express';
import { inserirLancamento, totalMes, totalAno, allLancamentos} from '../controllers/lancamentosController.js';

// Aqui só vai ter rota, isso aqui é o roteador
const router = express.Router();

router.post('/receitas', async (req, res) => {
  try {
    res.send(await inserirLancamento(req.body, 'R'));
  } catch(err) {
    res.status(400).send(err.message);
  }
});

router.post('/despesas', async (req, res) => {
  try {
    res.send(await inserirLancamento(req.body, 'D'));
  } catch(err) {
    res.status(400).send(err.message);
  }
});

router.get('/totalMes/:mes', async (req, res) => {
  try {
    res.send(await totalMes(parseInt(req.params.mes)));
  } catch(err) {
    res.status(400).send(err.message);
  }
});

router.get('/totalAno/:ano', async (req, res) => {
  try {
    res.send(await totalAno(parseInt(req.params.ano)));
  } catch(err) {
    res.status(400).send(err.message);
  }
});

router.get('/', async (req, res) => {
  try {
    res.send(await allLancamentos(req.params));
  } catch(err) {
    res.status(400).send(err.message);
  }
});

export default router;