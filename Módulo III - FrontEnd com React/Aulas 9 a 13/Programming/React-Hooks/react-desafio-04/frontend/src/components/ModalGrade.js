import React, { useEffect, useState } from 'react';

import * as api from '../api/apiServices';

import Modal from 'react-modal';
// Custom: Always that I'll use 'react-modal', I have to set that I'm using my react on id #root
Modal.setAppElement('#root');


export default function ModalGrade(props) {
  const { onSave, onClose, selectedGrade } = props;
  const { id, student, subject, type, value } = selectedGrade;

  // States
  const [gradeValue, setGradeValue] = useState(value);
  const [gradeValidation, setGradeValidation] = useState({});
  const [errorMessage, setErrorMessage] = useState('');


  // Effects
  useEffect(() => {
    const getValidation = async () => {
      const validation = await api.getValidationFromGradeType(type);
      setGradeValidation(validation);
    }

    getValidation();
  }, [type]);


  // When one grade change
  useEffect(() => {
    const { minValue, maxValue } = gradeValidation;

    if (gradeValue < minValue || gradeValue > maxValue) {
      setErrorMessage(`O valor da nota deve ser entre ${minValue} e ${maxValue}!`);
      return;
    }

    setErrorMessage('');
  }, [gradeValue, gradeValidation]);

  // Close window with 'ESC'
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  });

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose(null);
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = {
      id, 
      newValue: gradeValue,
    }

    onSave(formData);
  }

  const handleGradeChange = (e) => {
    setGradeValue(+e.target.value); // I have to put "+" before converting to integer, this value comes as string
  }

  const handleModalClose = () => {
    onClose(null);
  }

  return (
    <div>
      <Modal isOpen={true}>
        <div style={styles.flexRow}>
          <span style={styles.title}>Manutenção de notas</span>
          <button className='waves-effect waves-lights btn red dark-4' onClick={handleModalClose}>X</button>
        </div>

        <form onSubmit={handleFormSubmit}>

          <div className='input-field'>
            <input id='inputName' type='text' value={student} readOnly />
            <label className='active' htmlFor='inputName'>
              Nome do Aluno:
          </label>
          </div>

          <div className='input-field'>
            <input id='inputSubject' type='text' value={subject} readOnly />
            <label className='active' htmlFor='inputSubject'>
              Disciplina:
          </label>
          </div>

          <div className='input-field'>
            <input id='inputType' type='text' value={type} readOnly />
            <label className='active' htmlFor='inputType'>
              Tipo de avaliação:
          </label>
          </div>

          <div className='input-field'>
            <input
              id='inputGrade'
              type='number'
              min={gradeValidation.minValue}
              max={gradeValidation.maxValue}
              step='1'
              autoFocus
              value={gradeValue}
              onChange={handleGradeChange}
            />
            <label className='active' htmlFor='inputGrade'>
              Nota:
          </label>
          </div>

          <div style={styles.flexRow}>
            <button className='waves-effect waves-light btn' disabled={errorMessage.trim() !== ''}>Salvar</button>
            <span style={styles.errorMessage}>{errorMessage}</span>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '40px',
  },

  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },

  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
  }
}