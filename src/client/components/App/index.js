import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Jumbotron, Row, Col, Button } from 'react-bootstrap';
import { BoardPanel } from '../Board';
import { PiePanel } from '../Pie';
import { HistoryPanel } from '../History';
import { Header, HeaderLeft, HeaderRight } from '../Header';
import { Icon, Title } from '../Widgets';
import { isStatusOver } from '../../game';
import { startGame, played } from '../../actions';
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

const App = ({ titleIcon, board, winner, player, computer, currentPlayer, status, history, startGame, played }) => {
  const handleStart = () => startGame();
  return (
    <Grid>
      <Header player={player}>
        <HeaderLeft>
          <Icon fruit={titleIcon} />
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
              <BoardPanel winner={winner} board={board} currentPlayer={currentPlayer} onPlay={played} />
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
  titleIcon: React.PropTypes.object,
  winner: React.PropTypes.object,
  computer: React.PropTypes.object.isRequired,
  currentPlayer: React.PropTypes.object,
  status: React.PropTypes.string.isRequired,
  history: React.PropTypes.array.isRequired,
  startGame: React.PropTypes.func.isRequired,
};

const actions = { startGame, played };
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
const mapStateToProps = state => state;
export default connect(mapStateToProps, mapDispatchToProps)(App);
