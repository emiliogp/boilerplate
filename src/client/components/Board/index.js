import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import './board.css';

export const Message = ({ currentPlayer }) => {
  const message = currentPlayer ? `${currentPlayer.name}'s turn` : 'A message';
  return (
    <Col xs={12} className="message">
      <span>{message}</span>
    </Col>
  );
};
Message.propTypes = {
  currentPlayer: React.PropTypes.object,
};

export class Cell extends React.Component {

  shouldComponentUpdate(nextProps) {
    if (nextProps.piece !== this.props.piece) {
      return true;
    }
    return false;
  }

  render() {
    const { piece } = this.props;
    return (
      <Col xs={4} className="cell">
        {piece || '\u00a0'}
      </Col>
    );
  }
}

Cell.propTypes = {
  piece: React.PropTypes.string,
};


export const Board = ({ board, computerPlay }) => (
  <div>
    <Button onClick={computerPlay}>Computer Play</Button>
    <Grid className="board">
      <Row>
        {board.map((piece, i) => <Cell key={i} piece={piece} />)}
      </Row>
    </Grid>
  </div>
);

Board.propTypes = {
  board: React.PropTypes.array.isRequired,
  computerPlay: React.PropTypes.func.isRequired,
};

export const BoardPanel = ({ board, currentPlayer, computerPlay }) => (
  <Grid className="panel">
    <Row>
      <Message currentPlayer={currentPlayer} />
    </Row>
    <Row>
      <Board board={board} computerPlay={computerPlay} />
    </Row>
  </Grid>
);

BoardPanel.propTypes = {
  board: React.PropTypes.array.isRequired,
  currentPlayer: React.PropTypes.object,
  computerPlay: React.PropTypes.func,
};
