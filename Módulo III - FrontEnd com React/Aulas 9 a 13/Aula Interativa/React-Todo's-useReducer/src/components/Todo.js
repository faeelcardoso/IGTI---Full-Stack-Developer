import React from 'react';

export default function Todo(props) {
  const { children: todo, onToggle } = props;

  const { todoStyle } = styles;

  const borderColor = todo.done ? '#27ae60' : '#c0392b';

  const handleClick = () => {
    onToggle(todo);
  }

  // when I wanna get two styles together, I put the style from 'styles' with spread and what I created, next with a comma
  return (
    <div style={{...todoStyle, borderLeft: `8px solid ${borderColor}`}} onClick={handleClick}>
      <span>
        {todo.date} | {todo.description}
      </span>
    </div>
  );
}

const styles = {
  todoStyle: {
    padding: '20px',
    margin: '5px',
    border: '1px solid lightgray',
    borderRadius: '4px',
    fontFamily: 'Consolas',
    cursor: 'pointer',
  }
}

// colors get from flatuicolors