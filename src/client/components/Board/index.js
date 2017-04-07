import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
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

class Cell extends React.Component {
  componentWillMount() {
    console.log('COMPONENT WILL MOUNT');
  }

  componentDidMount() {
    console.log('COMPONENT DID MOUNT');
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.piece !== nextProps.piece;
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

export const BoardPanel = ({ board, currentPlayer, putAPiece }) => (
  <div>
    <Button onClick={putAPiece}>Put a piece</Button>
    <Grid className="panel">
      <Row>
        <Message currentPlayer={currentPlayer} />
      </Row>
      <Row>
        <Board board={board} />
      </Row>
    </Grid>
  </div>
);

BoardPanel.propTypes = {
  board: React.PropTypes.array.isRequired,
  currentPlayer: React.PropTypes.object,
  putAPiece: React.PropTypes.func.isRequired,
};

