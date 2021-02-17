import React, { useEffect, useReducer } from 'react';

import {apiGetTodos, apiToggleTodo, MONTHS, YEARS} from './api/api';

import Select from './components/Select';
import Summary from './components/Summary';
import Todos from './components/Todos';

const ACTION_TYPES = {
  CHANGE_MONTH: 'CHANGE_MONTH',
  CHANGE_YEAR: 'CHANGE_YEAR',
  LOAD_DATA_FROM_API: 'LOAD_DATA_FROM_API',
  CHANGE_TODOS: 'CHANGE_TODOS',
  TOGGLE_TODO: 'TOGGLE_TODO',
}

const initialState = {
  loadingData: true, 
  selectedYear: YEARS[2].value,
  selectedMonth: MONTHS[1].value,
  todos: [],
}

const todosReducer = (state, action) => {
  const { type, payload } = action;

  // actions
  switch (type) {
    case ACTION_TYPES.CHANGE_MONTH: {
      return {
        ...state,
        selectedMonth: payload,
      }
    }

    case ACTION_TYPES.CHANGE_YEAR: {
      return {
        ...state,
        selectedYear: payload,
      }
    }

    case ACTION_TYPES.LOAD_DATA_FROM_API: {
      return {
        ...state,
        loadingData: true,
      }
    }

    case ACTION_TYPES.CHANGE_TODOS: {
      return {
        ...state,
        todos: payload,
        loadingData: false,
      }
    }

    case ACTION_TYPES.TOGGLE_TODO: {
      const newTodos = [...state.todos]; 
      const { id, done } = payload;

      const index = state.todos.findIndex(todo => todo.id === id); 
      newTodos[index].done = done; 

      return {
        ...state,
        todos: newTodos,
      }
    }

    default: {
      return state;
    }  
  }
}

export default function App() {
  const [state, dispath] = useReducer(todosReducer, initialState);

  const { selectedYear, selectedMonth, loadingData, todos } = state;

  useEffect(() => {
    document.title = "React Todo's - useReducer";
  }, []);

  useEffect(() => {
    async function getFilteredTodos() {
      dispath({ type: ACTION_TYPES.LOAD_DATA_FROM_API }); 

      const filteredTodos = await apiGetTodos(selectedYear, selectedMonth);

      setTimeout(() => {
        dispath({ type: ACTION_TYPES.CHANGE_TODOS, payload: filteredTodos });
      }, 1000);
    }

    getFilteredTodos();
  }, [selectedYear, selectedMonth]);

  const handleYearChange = (newYear) => {
    dispath({ type: ACTION_TYPES.CHANGE_YEAR, payload: newYear });
  }

  const handleMonthChange = (newMonth) => {
    dispath({ type: ACTION_TYPES.CHANGE_MONTH, payload: newMonth });
  }

  const handleToggle = (todo) => {
    const { id, done } = todo;

    // it was updated?
    const didUpdate = apiToggleTodo(todo);

    // if yes...
    if (didUpdate) {
      dispath({ type: ACTION_TYPES.TOGGLE_TODO, payload: { id, done: !done } })
    }
  }

  return (
    <div className='container'>
      <h1 className='center'>React Todo's - useReducer</h1>
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