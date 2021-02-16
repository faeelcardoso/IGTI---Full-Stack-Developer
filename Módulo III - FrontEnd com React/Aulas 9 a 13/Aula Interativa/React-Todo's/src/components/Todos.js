import React from 'react';
import Todo from './Todo';

export default function Todos(props) {
  const { children: todos } = props; // I renamed the children to todos

  return (
    <div style={{ marginTop: '20px' }}>
      {todos.map(todo => {
        return <Todo key={todo.id}>{todo}</Todo>
      })}
    </div>
  );
}
