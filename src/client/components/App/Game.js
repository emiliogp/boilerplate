import R from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col } from 'react-bootstrap';
import BoardPanel from '../Board';
import PiePanel from '../Pie';
import HistoryPanel from '../History';
import { played } from '../../actions';
import { getVisibleHistory } from '../../selectors';
import './app.css';

const Game = ({ board, winner, player, computer, currentPlayer, status, history, played }) => {
  return (
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
  );
};

Game.propTypes = {
  board: PropTypes.array.isRequired,
  player: PropTypes.object.isRequired,
  winner: PropTypes.object,
  computer: PropTypes.object.isRequired,
  currentPlayer: PropTypes.object,
  status: PropTypes.string.isRequired,
  history: PropTypes.array.isRequired,
  played: PropTypes.func.isRequired,
};

const actions = { played };
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
const mapStateToProps = state => ({
  ...R.pick(['board', 'player', 'winner', 'computer', 'currentPlayer', 'status'], state),
  history: getVisibleHistory(state),
});
export default connect(mapStateToProps, mapDispatchToProps)(Game);
