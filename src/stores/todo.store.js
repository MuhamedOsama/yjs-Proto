import { syncedStore, getYjsValue } from '@syncedstore/core';
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';
import * as awarenessProtocol from 'y-protocols/awareness.js';

// (optional, define types for TypeScript)

// Create your SyncedStore store
const initializeRoom = () => {};
export const todoStore = syncedStore({ Todos: [] });
// Get the Yjs document and sync automatically using y-socket
const doc = getYjsValue(todoStore);
console.log(doc);

const wsProvider = new WebsocketProvider(
  'ws://192.168.1.14:1234',
  'my-roomname',
  doc
);

wsProvider.awareness.setLocalState({
  online: true,
  editing: false,
});

export const awarness = wsProvider.awareness;
export const disconnect = () => wsProvider.disconnect();
export const connect = () => wsProvider.connect();
export const undoManager = new Y.UndoManager(doc.getArray('Todos'));
