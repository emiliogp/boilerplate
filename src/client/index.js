import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { X, O, GAME_OVER } from './game';

const { hash } = document.location;
const name = hash.slice(1) || 'Unknown player';
const player = { name };
const computer = { name: 'computer', isComputer: true };
const state = {
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

console.log('mounting React ...'); // eslint-disable-line no-console
const mountNode = window.document.getElementById('__TICTACTOE__');
render(<App {...state} />, mountNode);
