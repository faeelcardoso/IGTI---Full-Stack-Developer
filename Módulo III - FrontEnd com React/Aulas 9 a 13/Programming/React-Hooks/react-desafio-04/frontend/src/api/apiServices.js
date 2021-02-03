import axios from 'axios';

const API_URL = 'http://localhost:3001/grade/';

const GRADE_VALIDATION = [
  {
    id: 1,
    gradeType: 'Exercícios',
    minValue: 0,
    maxValue: 10,
  },
  {
    id: 2,
    gradeType: 'Trabalho Prático',
    minValue: 0,
    maxValue: 40,
  },
  {
    id: 3,
    gradeType: 'Desafios',
    minValue: 0,
    maxValue: 50,
  },
]

async function getAllGrades() {
  const res = await axios.get(API_URL);

  const grades = res.data.grades.map((grade) => {
    const { student, subject, type } = grade;

    return {
      ...grade,
      studentLowerCase: student.toLowerCase(),
      subjectLowerCase: subject.toLowerCase(),
      typeLowerCase: type.toLowerCase(),
      isDeleted: false,
    }
    
  });

  let allStudents = new Set(); // set() doesn't let repeat, simulate literally a "set". In this case won't let that any students repeat
  grades.forEach((grade) => allStudents.add(grade.student));
  allStudents = Array.from(allStudents); // receive a new array

  let allSubjects = new Set(); 
  grades.forEach((grade) => allSubjects.add(grade.subject));
  allSubjects = Array.from(allSubjects);

  let allGradeType = new Set(); 
  grades.forEach((grade) => allGradeType.add(grade.type));
  allGradeType = Array.from(allGradeType);

  let maxId = -1;
  grades.forEach(({ id }) => {
    if (id > maxId) {
      maxId = id;
    }
  });

  let nextId = maxId + 1;

  // Now I have all combination
  const allCombinations = [];
  allStudents.forEach(student => {
    allSubjects.forEach(subject => {
      allGradeType.forEach(type => {
        allCombinations.push({
          student,
          subject,
          type,
        });
      });
    });
  });

  // Now I'll check if it was deleted or not
  allCombinations.forEach(({ student, subject, type }) => {
    const hasItem = grades.find((grade) => {
      return (
        grade.subject === subject && grade.student === student && grade.type === type // I'm checking if the datas of the API and allCombinations are the same
      );
    });

    if (!hasItem) {
      grades.push({
        id: nextId++,
        student,
        studentLowerCase: student.toLowerCase(),
        subject,
        subjectLowerCase: subject.toLowerCase(),
        type,
        typeLowerCase: type.toLowerCase(),
        value: 0,
        isDeleted: true,
      });
    }    
  });

  grades.sort((a, b) => a.typeLowerCase.localeCompare(b.typeLowerCase));
  grades.sort((a, b) => a.subjectLowerCase.localeCompare(b.subjectLowerCase));
  grades.sort((a, b) => a.studentLowerCase.localeCompare(b.studentLowerCase));

  return grades;
}

async function insertGrade(grade) {
  const res = await axios.post(API_URL, grade);
  return res.data.id;
}

async function upgradeGrade(grade) {
  const res = await axios.put(API_URL, grade);
  return res.data;
}

async function deleteGrade(grade) {
  const res = await axios.delete(`${API_URL}/${grade.id}`);
  return res.data;
}

async function getValidationFromGradeType(gradeType) {
  const gradeValidation = GRADE_VALIDATION.find((item) => item.gradeType === gradeType);
  
  const { minValue, maxValue } = gradeValidation;

  return {
    minValue,
    maxValue,
  }
}

export { getAllGrades, insertGrade, upgradeGrade, deleteGrade, getValidationFromGradeType };