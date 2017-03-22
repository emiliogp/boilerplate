import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { X, O, GAME_OVER } from './game';

const { hash } = document.location;
const name = hash.slice(1) || 'Unknown player';
const player = { name };

const state = {
  currentPlayer: player,
  status: GAME_OVER,
  player,
  board: [X, O, X, null, null, X, O, null, null],
};

console.log('mounting React ...'); // eslint-disable-line no-console
const mountNode = window.document.getElementById('__TICTACTOE__');
render(<App {...state} />, mountNode);
