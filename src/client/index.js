import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { X, O, GAME_OVER } from './game';
import { IntlProvider, addLocaleData } from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import en from 'react-intl/locale-data/en';
import messages from './messages.json';

addLocaleData([...fr, ...en]);

const language = 'fr';

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

const Root = (
  <IntlProvider
    locale={language}
    messages={messages[language]}
  >
    <App {...state} />
  </IntlProvider>
)

console.log('mounting React ...'); // eslint-disable-line no-console
const mountNode = window.document.getElementById('__TICTACTOE__');
render(Root, mountNode);
