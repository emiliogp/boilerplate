import React from 'react';
import { render } from 'react-dom';

const App = () => (
  <div> Hello world! </div>
);
console.log('mounting React ...'); // eslint-disable-line no-console
const mountNode = window.document.getElementById('__TICTACTOE__');
render(<App />, mountNode);
