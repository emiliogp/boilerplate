import React from 'react';
import { Grid, Jumbotron, Row, Col } from 'react-bootstrap';
import { BoardPanel } from '../Board';
import './app.css';

const App = ({ board }) => (
  <Grid>
    <Jumbotron>
      <Row>
        <Col md={6} xs={12}>
          <BoardPanel board={board} />
        </Col>
      </Row>
    </Jumbotron>
  </Grid>
);

App.propTypes = {
  board: React.PropTypes.array.isRequired,
};

export default App;
