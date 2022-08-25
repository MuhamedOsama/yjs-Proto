import React, { useState } from 'react';
import './TodoContainer.css';
import { todoStore } from '../stores/todo.store';
import { useSyncedStore } from '@syncedstore/react';
import { getYjsValue } from '@syncedstore/core';
import SelectionArea, { SelectionEvent } from '@viselect/react';

import { TodoItem } from './TodoItem';
export const TodoContainer = () => {
  const state = useSyncedStore(todoStore);
  let handleDelete = (id) => {
    state.Todos.splice(
      state.Todos.indexOf(state.Todos.find((r) => r.id == id)),
      1
    );
  };

  return (
    <div id="todo-container">
      <h1>Todo items</h1>

      {state.Todos.map((t, i) => (
        <TodoItem deleteTodo={handleDelete} key={t.id} todo={t}></TodoItem>
      ))}

      <button
        className="addButton"
        onClick={() =>
          state.Todos.push({
            id: state.Todos.length
              ? state.Todos[state.Todos.length - 1].id + 1
              : 1,
            content: 'example todo 🙌',
            done: true,
          })
        }
      >
        Add Todo
      </button>
    </div>
  );
};
