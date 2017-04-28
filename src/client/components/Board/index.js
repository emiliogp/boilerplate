import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { isComputer, isEmptyCell, isFruit } from '../../game';
import './board.css';

export const Message = ({ winner, currentPlayer }) => {
  let message;
  if (winner) {
    message = `${winner.name} is the winner!`;
  } else if (currentPlayer) {
    message = `${currentPlayer.name}'s turn to play`;
  } else {
    message = 'Game is over.';
  }
  return (
    <Col xs={12} className="message">
      <span>{message}</span>
    </Col>
  )
};

Message.propTypes = {
  currentPlayer: React.PropTypes.object,
  winner: React.PropTypes.object,
};

const PlayedCell = ({ piece }) => (
  <Col className='cell' xs={4}>
    {piece}
  </Col>
);

const Fruit = ({ piece }) => {
  const { icon, color } = piece;
  return (
    <Col className='fruit' style={{ color }} xs={4}>
      <i className={`fa fa-${icon}`} />
    </Col>
  );
};

const DeadCell = () => (
  <Col className='cell inactive-cell' xs={4}>
    {'\u00a0'}
  </Col>
);

const ClickableCell = ({ onClick }) => (
  <Col className='cell empty-cell' xs={4} onClick={() => onClick()}>
    {'\u00a0'}
  </Col>
);

export const Cell = ({ currentPlayer, piece, onClick }) => {
  if (isFruit(piece)) return <Fruit piece={piece}/>
  if (isEmptyCell(piece)) {
    if(!currentPlayer || isComputer(currentPlayer)) return <DeadCell />
    return <ClickableCell onClick={onClick} />
  }
  return <PlayedCell piece={piece} />
};

Cell.propTypes = {
  piece: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
  onClick: React.PropTypes.func.isRequired,
  currentPlayer: React.PropTypes.object,
};


export const Board = ({ currentPlayer, board, onPlay }) => (
  <Grid className="board">
    <Row>
      {board.map((piece, i) => <Cell key={i} currentPlayer={currentPlayer} piece={piece} onClick={() => onPlay(i)} />)}
    </Row>
  </Grid>
);

Board.propTypes = {
  board: React.PropTypes.array.isRequired,
  onPlay: React.PropTypes.func.isRequired,
  currentPlayer: React.PropTypes.object,
};

export const BoardPanel = ({ board, winner, currentPlayer, onPlay }) => (
  <Grid className="panel">
    <Row>
      <Message currentPlayer={currentPlayer} winner={winner} />
    </Row>
    <Row>
      <Board currentPlayer={currentPlayer} board={board} onPlay={onPlay} />
    </Row>
  </Grid>
);

BoardPanel.propTypes = {
  board: React.PropTypes.array.isRequired,
  currentPlayer: React.PropTypes.object,
  winner: React.PropTypes.object,
  onPlay: React.PropTypes.func.isRequired,
};

