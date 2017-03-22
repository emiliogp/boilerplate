import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import './board.css';

const Message = ({ currentPlayer }) => {
  const message = currentPlayer ? `${currentPlayer.name}'s turn` : 'A message';
  return (
    <Col xs={12} className="message">
      <span>{message}</span>
    </Col>
  )
};
Message.propTypes = {
  currentPlayer: React.PropTypes.object,
};

const Cell = ({ piece }) => (
  <Col xs={4} className="cell">
    {piece || '\u00a0'}
  </Col>
);
Cell.propTypes = {
  piece: React.PropTypes.string,
};


const Board = ({ board }) => (
  <Grid className="board">
    <Row>
      {board.map((piece, i) => <Cell key={i} piece={piece} />)}
    </Row>
  </Grid>
);

Board.propTypes = {
  board: React.PropTypes.array.isRequired,
};

export const BoardPanel = ({ board, currentPlayer }) => (
  <Grid className="panel">
    <Row>
      <Message currentPlayer={currentPlayer} />
    </Row>
    <Row>
      <Board board={board} />
    </Row>
  </Grid>
);

BoardPanel.propTypes = {
  board: React.PropTypes.array.isRequired,
  currentPlayer: React.PropTypes.object,
};

