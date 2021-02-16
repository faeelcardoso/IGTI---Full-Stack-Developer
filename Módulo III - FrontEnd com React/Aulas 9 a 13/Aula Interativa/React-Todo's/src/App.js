import React, { useEffect, useState } from 'react';

import {apiGetTodos, MONTHS, YEARS} from './api/api';

import Select from './components/Select';
import Todos from './components/Todos';

export default function App() {
  const [selectedYear, setSelectedYear] = useState(YEARS[1].value);
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[0].value);
  const [todos, setTodos] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    document.title = "React Todo's";
  }, []);

  useEffect(() => {
    async function getFilteredTodos() {
      setLoadingData(true);
      const filteredTodos = await apiGetTodos(selectedYear, selectedMonth);

      setTimeout(() => {
        setTodos(filteredTodos);
        setLoadingData(false);
      }, 1000);
    }

    getFilteredTodos();
  }, [selectedYear, selectedMonth]);

  const handleYearChange = (newYear) => {
    setSelectedYear(newYear);
  }

  const handleMonthChange = (newMonth) => {
    setSelectedMonth(newMonth);
  }

  return (
    <div className='container'>
      <h1 className='center'>React Todo's</h1>
        <Select values={YEARS} selectedValue={selectedYear} onChange={handleYearChange} />
        <Select values={MONTHS} selectedValue={selectedMonth} onChange={handleMonthChange} />
        
        {loadingData && <p>Carregando...</p>}

        {!loadingData && <Todos>{todos}</Todos>}
    </div>
  );
}