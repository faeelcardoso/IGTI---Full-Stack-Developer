import express from 'express';
import {promises as fileSystem, write} from 'fs';

const router = express.Router();
const {readFile, writeFile} = fileSystem;

router.post('/', async (req, res) => {
  let grade = req.body;
  try {
    let json = JSON.parse(await readFile(global.fileName, 'utf-8'));

    grade = { id: json.nextId++, timestamp: new Date(), ...grade };
    json.grades.push(grade);

    await writeFile(global.fileName, JSON.stringify(json));

    res.send(grade);
  } catch(err){
    res.status(400).send({ error: err.message });
  }
});

export default router;