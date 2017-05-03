import should from 'should';
import axios from 'axios';
import sinon from 'sinon';
import reducer from '../../reducers';
import { configureStore } from './utils';
import { played,  HAS_PLAYED, CELL_FRUIT_LOADED, START_GAME, END_OF_GAME, startGame, gameOver } from '..';
import { X, O } from '../../game';

const { describe, it } = global;

describe('Actions', () => {
  it('START_GAME', function(done) {
    const hook = {
      START_GAME: () =>  done(),
    };
    const store = configureStore(reducer, {}, hook);
    store.dispatch(startGame());
  });

  it('END_OF_GAME', function(done) {
    const fruit = { icon: 'test', color: 'red' };
    const stub = sinon.stub(axios, 'get').callsFake(() => Promise.resolve({ data: fruit }));
    const state = {
      board: [null],
      history: [],
    };
    let fruits = 0
    const hook = {
      CELL_FRUIT_LOADED: () =>  fruits++,
      END_OF_GAME: () =>  {
        should(fruits).eql(state.board.length * 3);
        stub.restore();
        done();
      }
    };
    const store = configureStore(reducer, state, hook);
    store.dispatch(gameOver([], {}));
  });

  it('HAS_PLAYED with a winner', function(done) {
    const fruit = { icon: 'test', color: 'red' };
    const stub1 = sinon.stub(axios, 'post').callsFake(() => Promise.resolve({ data: { winner: O } }));
    const stub2 = sinon.stub(axios, 'get').callsFake(() => Promise.resolve({ data: fruit }));
    const player = { name: 'test', piece: X };
    const computer = { name: 'computer', isComputer: true, piece: O };
    const state = {
      board: [null],
      history: [],
      currentPlayer: computer,
      computer,
      player,
    };
    const hook = {
      END_OF_GAME: getState =>  {
        const { board, winner } = getState();
        should(board).eql([ 'o' ]);
        should(winner).eql(computer);
        stub1.restore();
        stub2.restore();
        done();
      }
    };
    const store = configureStore(reducer, state, hook);
    store.dispatch(played(0));
  });

  it('HAS_PLAYED without a winner', function(done) {
    const fruit = { icon: 'test', color: 'red' };
    const stub = sinon.stub(axios, 'post').callsFake(() => Promise.resolve({ data: { } }));
    const player = { name: 'test', piece: X };
    const computer = { name: 'computer', isComputer: true, piece: O };
    const state = {
      board: [null],
      history: [],
      currentPlayer: computer,
      computer,
      player,
    };
    const hook = {
      HAS_PLAYED: getState =>  {
        const { board, winner } = getState();
        should(board).eql([ 'o' ]);
        stub.restore();
        done();
      }
    };
    const store = configureStore(reducer, state, hook);
    store.dispatch(played(0));
  });

});
