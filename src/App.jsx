import logo from './logo.svg';
import './App.css';
import { TodoContainer } from './Components/TodoContainer';
import { ClientsContainer } from './Components/ClientsContainer';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { CollaborationPlugin } from '@lexical/react/LexicalCollaborationPlugin';
import * as Y from 'yjs';

import { WebsocketProvider } from 'y-websocket';
import Heading from './Components/Heading';
import { useEffect } from 'react';
import { undoManager } from './stores/todo.store';
function App() {
  useEffect(() => {
    const onKeypress = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'z') {
        undoManager.undo();
      }
      if (e.ctrlKey && e.key.toLowerCase() === 'y') {
        undoManager.redo();
      }
    };

    window.addEventListener('keydown', onKeypress);

    return () => {
      window.removeEventListener('keydown', onKeypress);
    };
  }, []);
  let initialConfig = {};
  return (
    <div className="App">
      <ClientsContainer></ClientsContainer>
      <TodoContainer></TodoContainer>
    </div>
  );
}

export default App;
