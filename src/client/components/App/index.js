import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Jumbotron, Row, Col, Button } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import Header from './Header';
import Game from './Game';
import { played } from '../../actions';
import './app.css';

const About = () => (
  <span>
    Tic Tac Toe ...
  </span>
);

const Help = () => (
  <span>
    Please help me ...
  </span>
);

const App = () => {
  return (
    <Router>
      <Grid>
        <Header />
        <Jumbotron className="content">
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/help" component={Help} />
            <Route exact path="/" component={Game} />
          </Switch>
        </Jumbotron>
      </Grid>
    </Router>
  );
};

export default App;
