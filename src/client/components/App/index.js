import React from 'react';
import { Grid, Jumbotron, Row, Col, Button } from 'react-bootstrap';
import { BoardPanel } from '../Board';
import { PiePanel } from '../Pie';
import { HistoryPanel } from '../History';
import { Header, HeaderLeft, HeaderRight } from '../Header';
import { Icon, Title } from '../Widgets';
import { isStatusOver } from '../../game';
import { startGame } from '../../actions';
import { bindDispatch } from '../../store';
import Connect from '../Connect';
import './app.css';

const StartButton = ({ status, onStart, children }) => (
  <div className='start-button'>
    <Button disabled={!isStatusOver(status)} bsSize='lg' bsStyle='primary' onClick={onStart}> {children} </Button>
  </div>
);

StartButton.propTypes = {
  status: React.PropTypes.string.isRequired,
  children: React.PropTypes.string.isRequired,
  onStart: React.PropTypes.func.isRequired,
};

const App = ({ board, player, computer, currentPlayer, status, history, startGame }) => {
  const handleStart = () => startGame(player, computer);
  return (
    <Grid>
      <Header player={player}>
        <HeaderLeft>
          <Icon type='trophy' />
          <Title name='TicTacToe' />
        </HeaderLeft>
        <HeaderRight>
          <StartButton status={status} onStart={handleStart}>
            Start The Game
          </StartButton>
        </HeaderRight>
      </Header>
      <Jumbotron className="content">
        <Grid>
          <Row>
            <Col md={4} xs={12}>
              <PiePanel history={history} player={player} />
            </Col>
            <Col md={4} xs={12}>
              <BoardPanel board={board} currentPlayer={currentPlayer} />
            </Col>
            <Col md={4} xs={12}>
              <HistoryPanel history={history} />
            </Col>
          </Row>
        </Grid>
      </Jumbotron>
    </Grid>
  );
};

App.propTypes = {
  board: React.PropTypes.array.isRequired,
  player: React.PropTypes.object.isRequired,
  computer: React.PropTypes.object.isRequired,
  currentPlayer: React.PropTypes.object,
  status: React.PropTypes.string.isRequired,
  history: React.PropTypes.array.isRequired,
  startGame: React.PropTypes.func.isRequired,
};

const Wrapper = () => (
  <Connect>
    {({ getState, dispatch }) => {
      const props = { ...getState(), startGame: bindDispatch(startGame, dispatch) };
      return <App {...props} />
    }}
  </Connect>
);

export default Wrapper;


