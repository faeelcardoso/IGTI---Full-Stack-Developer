import React from 'react';
import Todo from './Todo';

export default function Todos(props) {
  const { children: todos, onToggle } = props; // I renamed the children to todos

  return (
    <div style={{ marginTop: '20px' }}>
      {todos.map(todo => {
        return <Todo onToggle={onToggle} key={todo.id}>{todo}</Todo>
      })}
    </div>
  );
}
