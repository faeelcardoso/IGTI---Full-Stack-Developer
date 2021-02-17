import React, { useEffect, useState } from 'react';

import {apiGetTodos, apiToggleTodo, MONTHS, YEARS} from './api/api';

import Select from './components/Select';
import Summary from './components/Summary';
import Todos from './components/Todos';

export default function App() {
  const [selectedYear, setSelectedYear] = useState(YEARS[2].value);
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[1].value);
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

  const handleToggle = (todo) => {
    const { id, done } = todo;

    // it was updated?
    const didUpdate = apiToggleTodo(todo);

    // if yes...
    if (didUpdate) {
      const newTodos = [...todos]; // creating a new array
      const index = todos.findIndex(todo => todo.id === id); // took the right index
      newTodos[index].done = !done; // done to undone in every click

      setTodos(newTodos);
    }
  }

  return (
    <div className='container'>
      <h1 className='center'>React Todo's</h1>
        <Select values={YEARS} selectedValue={selectedYear} onChange={handleYearChange} />
        <Select values={MONTHS} selectedValue={selectedMonth} onChange={handleMonthChange} />
        
        {loadingData && <p>Carregando...</p>}

        {!loadingData && (
          <React.Fragment>
            <Summary>{todos}</Summary>
            <Todos onToggle={handleToggle}>{todos}</Todos>
          </React.Fragment>
        )}
    </div>
  );
}