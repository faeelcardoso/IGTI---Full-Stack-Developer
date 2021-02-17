import React from 'react';

export default function Summary(props) {
  const { children: todos } = props;

  const allTodos = todos.length;
  const doneTodos = todos.filter(todo => todo.done).length;
  const undoneTodos = allTodos - doneTodos;

  return (
    <div className='center' style={{ marginTop: '20px', fontSize: '1.8rem' }}>
      Total de tarefas: {allTodos} | Tarefas cumpridas: {doneTodos} | Tarefas não cumpridas: {undoneTodos}
    </div>
  );
}
