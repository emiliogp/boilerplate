import React  from 'react';
import { renderToString } from 'react-dom/server';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import messages from '../client/messages.json';
import App from '../client/components/App'
import { X, O, GAME_OVER } from '../client/game';

addLocaleData([...en, ...fr]);

const indexHtml = ({ html, state, language }) => `
  <html>
    <head>
      <title>Tic Tac Toe</title>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css">
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
      <link rel="stylesheet" href="/build/styles.css">
    </head>
    <body>
      <div id='__TICTACTOE__'>
        ${html}
      </div>
      <script> window.__STATE__ = ${JSON.stringify({ ...state, language })}; </script>
      <script src="/build/bundle.js"></script>
    </body>
  </html>
`;

const name = 'Server';
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



const renderIndexPage = (req, res) => {
  const language = req.query.language || 'en';
  const store = {};
  const Root = (
    <IntlProvider locale={language} messages={messages[language]}> 
      <App {...state}/>
    </IntlProvider>
  );
  const html = renderToString(Root);
  res.send(indexHtml({ html, state, language }));
}

export default renderIndexPage;

