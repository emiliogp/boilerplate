import R from 'ramda';
import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pure } from 'recompose';
import { played } from '../../actions';
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
  currentPlayer: PropTypes.object,
  winner: PropTypes.object,
};

export const PlayedCell = pure(({ piece }) => (
  <Col className='cell' xs={4}>
    {piece}
  </Col>
));

export const Fruit = pure(({ piece }) => {
  const { icon, color } = piece;
  return (
    <Col className='fruit' style={{ color }} xs={4}>
      <i className={`fa fa-${icon}`} />
    </Col>
  );
});

export const DeadCell = () => (
  <Col className='cell inactive-cell' xs={4}>
    {'\u00a0'}
  </Col>
);

export const ClickableCell = ({ onClick }) => (
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
  piece: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClick: PropTypes.func,
  currentPlayer: PropTypes.object,
};


export const Board = ({ currentPlayer, board, onPlay }) => (
  <Grid className="board">
    <Row>
      {board.map((piece, i) => <Cell key={i} currentPlayer={currentPlayer} piece={piece} onClick={() => onPlay(i)} />)}
    </Row>
  </Grid>
);

Board.propTypes = {
  board: PropTypes.array.isRequired,
  onPlay: PropTypes.func.isRequired,
  currentPlayer: PropTypes.object,
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
  board: PropTypes.array.isRequired,
  currentPlayer: PropTypes.object,
  winner: PropTypes.object,
  onPlay: PropTypes.func.isRequired,
};

const actions = { onPlay: played };
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
const mapStateToProps = R.pick(['board', 'currentPlayer', 'winner']);
export default connect(mapStateToProps, mapDispatchToProps)(BoardPanel);
