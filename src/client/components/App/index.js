import React from 'react';
import { Grid, Jumbotron, Row, Col, Button } from 'react-bootstrap';
import { BoardPanel } from '../Board';
import { Header, HeaderLeft, HeaderRight } from '../Header';
import { Icon, Title } from '../Widgets';
import { isStatusOver } from '../../game';
import './app.css';

const StartButton = ({ status, children }) => {
  if (isStatusOver(status)) {
    return (
    <div className='start-button'>
      <Button bsSize='lg' bsStyle='primary'> {children} </Button>
    </div>
    );
  }
  return <div/>
};

StartButton.propTypes = {
  status: React.PropTypes.string.isRequired,
  children: React.PropTypes.string.isRequired,
};

const App = ({ board, player, currentPlayer, status }) => (
  <Grid>
      <Header player={player}>
        <HeaderLeft>
          <Icon type='trophy' />
          <Title name='TicTacToe' />
        </HeaderLeft>
        <HeaderRight>
          <StartButton status={status}>
            Start The Game
          </StartButton>
        </HeaderRight>
      </Header>
    <Jumbotron className="content">
      <Row>
        <Col md={6} xs={12}>
          <BoardPanel board={board} currentPlayer={currentPlayer} />
        </Col>
      </Row>
    </Jumbotron>
  </Grid>
);

App.propTypes = {
  board: React.PropTypes.array.isRequired,
  player: React.PropTypes.object.isRequired,
  currentPlayer: React.PropTypes.object,
  status: React.PropTypes.string.isRequired,
};

export default App;
