import React, { useState, useEffect } from 'react';
import './TodoItem.css';
import ContentEditable from 'react-contenteditable';
import { awarness } from '../stores/todo.store';

export const TodoItem = (props) => {
  let contentEditable = React.createRef();
  const [state, setState] = useState({ html: props.todo.content });

  const handleContentChange = (e) => {
    props.todo.content = e.target.value;
    setState({ html: e.target.value });
    awarness.setLocalState({ ...awarness.getLocalState(), editing: true });
    setTimeout(() => {
      awarness.setLocalState({ ...awarness.getLocalState(), editing: false });
    }, 3000);
  };
  return (
    <div className="todoItem">
      {props.selected ? <span>im selected</span> : ''}
      <input
        onChange={() => (props.todo.done = !props.todo.done)}
        checked={props.todo.done}
        type="checkbox"
      />
      <ContentEditable
        className="todoContent"
        innerRef={contentEditable}
        html={props.todo.content} // innerHTML of the editable div
        disabled={false} // use true to disable editing
        onChange={handleContentChange} // handle innerHTML change
        style={{
          textDecoration: props.todo.done ? 'line-through' : 'none',
        }}
      />

      <button
        onClick={() => props.deleteTodo(props.todo.id)}
        className="deleteButton"
      >
        🗑️
      </button>
    </div>
  );
};
