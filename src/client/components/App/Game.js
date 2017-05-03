import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import BoardPanel from '../Board';
import PiePanel from '../Pie';
import HistoryPanel from '../History';
import './app.css';

const Game = () => {
  return (
    <Grid>
      <Row>
        <Col md={4} xs={12}>
          <PiePanel />
        </Col>
        <Col md={4} xs={12}>
          <BoardPanel />
        </Col>
        <Col md={4} xs={12}>
          <HistoryPanel history={history} /> 
        </Col>
      </Row>
    </Grid>
  );
};

export default Game;
