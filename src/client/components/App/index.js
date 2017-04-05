import React from 'react';
import { Grid, Jumbotron, Row, Col, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { BoardPanel } from '../Board';
import { PiePanel } from '../Pie';
import { HistoryPanel } from '../History';
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
  children: React.PropTypes.object.isRequired,
};

const App = ({ board, player, currentPlayer, status, history }) => (
  <Grid>
    <Header player={player}>
      <HeaderLeft>
        <Icon type='trophy' />
        <Title name='TicTacToe' />
      </HeaderLeft>
      <HeaderRight>
        <StartButton status={status}>
          <FormattedMessage
            id="start.the.game"
            defaultMessage="I am the default value"
          />
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

App.propTypes = {
  board: React.PropTypes.array.isRequired,
  player: React.PropTypes.object.isRequired,
  currentPlayer: React.PropTypes.object,
  status: React.PropTypes.string.isRequired,
  history: React.PropTypes.array.isRequired,
};

export default App;
