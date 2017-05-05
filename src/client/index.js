import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { loadFruit } from './actions';
import App from './components/App';

import { X, O, GAME_OVER, getEmptyBoard } from './game';
import reducer from './reducers';

const { hash } = document.location;
const name = hash.slice(1) || 'Unknown player';
const player = { name, piece: X };
const computer = { name: 'computer', isComputer: true, piece: O };
const initialState = {
  status: GAME_OVER,
  player,
  computer,
  board: getEmptyBoard(),
  history: [],
};

const store = createStore(reducer, initialState, applyMiddleware(thunk, createLogger()));
//store.dispatch(loadFruit('titleIcon'));

console.log('mounting React ...'); // eslint-disable-line no-console
const mountNode = window.document.getElementById('__TICTACTOE__');
const root = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(root, mountNode);
