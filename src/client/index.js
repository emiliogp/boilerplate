import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { X, O, GAME_OVER } from './game';
import { IntlProvider, addLocaleData } from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import en from 'react-intl/locale-data/en';
import messages from './messages.json';

addLocaleData([...fr, ...en]);

const state = window.__STATE__;
const { language } = state;
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
