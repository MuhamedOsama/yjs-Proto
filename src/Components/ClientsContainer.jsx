import React, { useState, useEffect } from 'react';
import { awarness } from '../stores/todo.store';

export const ClientsContainer = () => {
  const [clients, setclients] = useState([]);
  awarness.on('update', () => {
    populateClients();
  });
  useEffect(() => {
    return () => {
      populateClients();
    };
  }, []);
  let populateClients = () => {
    let clnts = [];
    for (const [key, value] of awarness.getStates()) {
      clnts.push({
        clientId: key,
        value: value,
      });
    }
    setclients(clnts);
  };

  return (
    <div>
      <h1>Online Clients (Client Id)</h1>
      {clients.map((r) => (
        <div key={r.clientId}>
          {r.clientId}
          {r.clientId == awarness.clientID ? ' (This User)' : ''}
          {r.value.editing ? ' Currently Editing' : ''}
        </div>
      ))}
    </div>
  );
};
