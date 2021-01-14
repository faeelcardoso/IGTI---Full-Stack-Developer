import express from 'express';
import {promises as fileSystem, read} from 'fs';

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
    console.log('One file created!')
  } catch(err){
    res.status(400).send({ error: err.message });
  }
});

router.put('/', async (req, res) => {
  try{
    let newGrade = req.body;

    let json = JSON.parse(await readFile(global.fileName, 'utf-8'));
    let index = json.grades.findIndex(grade => grade.id === newGrade.id);

    if(index === -1) {
      throw new Error('Id not exist');
    }

    if(newGrade.student) {
      json.grades[index].student = newGrade.student;
    }

    if(newGrade.subject) {
      json.grades[index].subject = newGrade.subject;
    }

    if(newGrade.type) {
      json.grades[index].type = newGrade.type;
    }

    if(newGrade.value) {
      json.grades[index].value = newGrade.value;
    }

    await writeFile(global.fileName, JSON.stringify(json));

    res.send(json.grades[index]);
    console.log('One file updated!')
  } catch(err) {
    res.status(400).send({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let json = JSON.parse(await readFile(global.fileName, 'utf-8'));

    // First way
    /*const grades = json.grades.filter(grade => grade.id !== parseInt(req.params.id));
    json.grades = grades;*/

    // Second way
    let index = json.grades.findIndex(grade => grade.id === parseInt(req.params.id));
    
    if(index === -1) {
      throw new Error('Id not exist!');
    }

    json.grades.splice(index, 1);
    // .pop() - remove the last element of the array
    // .shift() - remove the first element of the array
    // .splice() - you've got to pass the position and the quantity of the element you wanna remove

    await writeFile(global.fileName, JSON.stringify(json));

    res.send('File deleted!')
  } catch(err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/', async (_, res) => {
  try {
    const json = JSON.parse(await readFile(global.fileName, 'utf-8'));
    delete json.nextId;

    res.send(json);
  } catch(err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const json = JSON.parse(await readFile(global.fileName, 'utf-8')); 
    const grade = json.grades.find(grade => grade.id === parseInt(req.params.id));

    if(grade) {
      res.send(grade);
    } else {
      throw new Error('Id not exist!');
    }

  } catch(err) {
    res.status(400).send({ error: err.message });
  }
});

// Sum the student grades in subjects
router.post('/sumNotes', async (req, res) => {
  try {
    const json = JSON.parse(await readFile(global.fileName, 'utf-8')); 
    // Here I have the grades of the student
    const grades = json.grades.filter(grade => grade.student === req.body.student && grade.subject === req.body.subject); 
    const sumNotes = grades.reduce((prev, curr) => {
      return prev + curr.value; // I'll return the prev.value = 0 + current.value, the sum of all values
    }, 0);
    
    console.log(grades);
    res.send({ sumNotes }); // I've got to put the {} because I will return one JSON
  } catch(err) {
    res.status(400).send({ error: err.message });
  }
});

// Average
router.post('/average', async (req, res) => {
  try {
    const json = JSON.parse(await readFile(global.fileName, 'utf-8')); 
    // Here I have the grades of the student
    const grades = json.grades.filter(grade => grade.subject === req.body.subject && grade.type === req.body.type); 

    if(!grades.length) { // When just "grades" for example doesn't work, tries .length too
      throw new Error('No registers were found for the parameters informed!');
    }

    const sumNotes = grades.reduce((prev, curr) => {
      return prev + curr.value; // I'll return the prev.value = 0 + current.value, the sum of all values
    }, 0);

    res.send({average: sumNotes / grades.length }); // soma das notas dividido pelo tamanho do array
  } catch(err) {
    res.status(400).send({ error: err.message });
  }
});

// Three best grades
router.post('/bestGrades', async (req, res) => {
  try {
    const json = JSON.parse(await readFile(global.fileName, 'utf-8')); 
    // Here I have the grades of the student
    const grades = json.grades.filter(grade => grade.subject === req.body.subject && grade.type === req.body.type); 

    if(!grades.length) { // When just "grades" for example doesn't work, tries .length too
      throw new Error('No registers were found for the parameters informed!');
    }

    grades.sort((a, b) => {
      if (a.value < b.value) return 1;
      if (a.value > b.value) return -1;
      else return 0;
    });

    res.send(grades.slice(0, 3));
  } catch(err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;