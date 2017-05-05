import React from 'react';
import R from 'ramda';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { Route, Link } from 'react-router-dom';
import { Header, HeaderLeft, HeaderRight }  from '../Header';
import { Button } from 'react-bootstrap';
import { Icon, Title } from '../Widgets';
import { startGame } from '../../actions';
import { isStatusOver } from '../../game';
import './app.css';

const StartButton = ({ status, onStart, location, children }) => (
  <div className='start-button'>
    { console.log(location.pathname) }
    <Button disabled={!(isStatusOver(status) && location.pathname === '/')} bsSize='lg' bsStyle='primary' onClick={onStart}> {children} </Button>
  </div>
);

StartButton.propTypes = {
  status: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  onStart: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};


const HeaderApp = ({ location, status, player, titleIcon, startGame }) => {
  const handleStart = () => startGame();
  return (
     <Header player={player}>
        <HeaderLeft>
          <Icon fruit={titleIcon} />
          <Title name='TicTacToe' />
        </HeaderLeft>
        <HeaderRight>
          <StartButton location={location} status={status} onStart={handleStart}>
            Start The Game
          </StartButton>
          <Link className='info' to='/about'>
            <i className={'fa fa-info-circle'} />
          </Link>
          <Link className='info' to='/help'>
            <i className={'fa fa-question-circle'} />
          </Link>
          <Link className='info' to='/'>
            <i className={'fa fa-trophy'} />
          </Link>
        </HeaderRight>
     </Header>
  );
};
  
HeaderApp.propTypes = {
  status: PropTypes.string.isRequired,
  player: PropTypes.object.isRequired,
  startGame: PropTypes.func.isRequired,
  titleIcon: PropTypes.object,
  location: PropTypes.object.isRequired,
};

const actions = { startGame };
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
const mapStateToProps = R.pick(['status', 'player', 'titleIcon']);
//const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign({}, ownProps, stateProps, dispatchProps);
//export default withRouter(connect(mapStateToProps, mapDispatchToProps, mergeProps, { pure: false })(HeaderApp));
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderApp));
