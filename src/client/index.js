import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import Provider from './components/Provider';
import { X, O, GAME_OVER } from './game';
import { createStore } from './store';
import reducer from './reducers';

const { hash } = document.location;
const name = hash.slice(1) || 'Unknown player';
const player = { name, piece: X };
const computer = { name: 'computer', isComputer: true, piece: O };
const initialState = {
  currentPlayer: player,
  status: GAME_OVER,
  player,
  computer,
  board: [X, O, X, null, null, X, O, null, null],
  history: [
    { id: 1, winner: player },
    { id: 2, winner: computer },
    { id: 3, winner: player },
    { id: 4 },
  ],
};

const store = createStore(reducer, initialState);

console.log('mounting React ...'); // eslint-disable-line no-console
const mountNode = window.document.getElementById('__TICTACTOE__');
const root = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(root, mountNode);
