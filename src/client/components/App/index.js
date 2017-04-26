import React from 'react';
import { Grid, Jumbotron, Row, Col, Button } from 'react-bootstrap';
import { BoardPanel } from '../Board';
import { PiePanel } from '../Pie';
import { HistoryPanel } from '../History';
import { Header, HeaderLeft, HeaderRight } from '../Header';
import { Icon, Title } from '../Widgets';
import { isStatusOver, O } from '../../game';
import LoginForm from '../LoginForm';
import Auth from '../Auth';

import './app.css';

const StartButton = ({ status, children }) => {
  if (isStatusOver(status)) {
    return (
      <div className="start-button">
        <Button bsSize="lg" bsStyle="primary"> {children} </Button>
      </div>
    );
  }
  return <div />;
};

StartButton.propTypes = {
  status: React.PropTypes.string.isRequired,
  children: React.PropTypes.string.isRequired,
};

class App extends React.Component {
  state = {
    board: this.props.board,
    user: undefined,
  }

  computerPlay = () => {
    const { board } = this.state;
    const firstEmptyCellIndex = board.indexOf(null);
    if (firstEmptyCellIndex !== -1) {
      const newBoard = board.map((cell, index) => {
        if (index === firstEmptyCellIndex) {
          return O;
        }
        return cell;
      });
      this.setState({
        board: newBoard,
      });
    }
  }

  handleAuth = (user) => this.setState({ user })

  render() {
    const { currentPlayer, status, history } = this.props;
    const { board, user } = this.state;
    const player = user && { name: user.username } || {};
    return (
      <Grid>
        <Header player={player}>
          <HeaderLeft>
            <Icon type="trophy" />
            <Title name="TicTacToe" />
          </HeaderLeft>
          <HeaderRight>
            <StartButton status={status}>
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
                <Auth user={user} onAuth={this.handleAuth}>
                  <BoardPanel
                    computerPlay={this.computerPlay}
                    board={board}
                    currentPlayer={currentPlayer}
                  />
                </Auth>
              </Col>
              <Col md={4} xs={12}>
                <HistoryPanel history={history} />
              </Col>
            </Row>
          </Grid>
        </Jumbotron>
      </Grid>
    );
  }
}

App.propTypes = {
  board: React.PropTypes.array.isRequired,
  player: React.PropTypes.object.isRequired,
  currentPlayer: React.PropTypes.object,
  status: React.PropTypes.string.isRequired,
  history: React.PropTypes.array.isRequired,
};

export default App;
