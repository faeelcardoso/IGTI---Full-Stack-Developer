import React from 'react';

import Action from './Action';

export default function GradesControl(props) {
  const { grades, onDelete, onPersist } = props;

  const tableGrades = [];

  let currentStudent = grades[0].student;
  let currentSubject = grades[0].subject;
  let currentGrades = [];
  let id = 1;

  grades.forEach((grade) => {
    if (grade.subject !== currentSubject) {
      tableGrades.push({
        id: id++,
        student: currentStudent,
        subject: currentSubject,
        grades: currentGrades,
      });

      currentSubject = grade.subject;
      currentGrades = [];
    }

    if (grade.student !== currentStudent) {
      currentStudent = grade.student;
    }

    currentGrades.push(grade);
  });

  // Add the last id

  tableGrades.push({
    id: id++,
    student: currentStudent,
    subject: currentStudent,
    grades: currentGrades,
  });

  const handleActionClick = (id, type) => {
    console.log(id);
    console.log(type);
  }

  return (
    <div>
      <div className="container center">
        {tableGrades.map(({id, grades}) => {
          return (
            <table className="striped center" key={id}>
              <thead>
                <tr>
                  <th style={{ width: '20%'}}>Aluno</th>
                  <th style={{ width: '20%'}}>Disciplina</th>
                  <th style={{ width: '20%'}}>Avaliação</th>
                  <th style={{ width: '20%'}}>Nota</th>
                  <th style={{ width: '20%'}}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {grades.map(({ id, subject, student, type, value, isDeleted }) => {
                  return (
                    <tr key={id}>
                      <td>{student}</td>
                      <td>{subject}</td>
                      <td>{type}</td>
                      <td>{isDeleted ? '-' : value}</td>
                      <td>
                        <div>
                          <Action onActionClick={handleActionClick} id={id} type={isDeleted ? 'add' : 'edit'} />
                          {!isDeleted && <Action onActionClick={handleActionClick} id={id} type='delete' />}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );
        })}
      </div>
    </div>
  );
}
