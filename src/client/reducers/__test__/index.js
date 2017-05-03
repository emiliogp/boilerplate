import reducer from '..';
import should from 'should';
import { CELL_FRUIT_LOADED, FRUIT_LOADED, START_GAME, HAS_PLAYED, END_OF_GAME } from '../../actions';

const { describe, it } = global;
const state = {};

describe('Reducers', () => {
  it('START_GAME', () => {
    const state = {};
    const action = {
      type: START_GAME,
      currentPlayer: 1,
      board: 2,
    };
    const newState = {
      status: 'PLAYING',
      board: action.board,
      currentPlayer: action.currentPlayer,
      winner: undefined,
    };
    should(reducer({}, action)).eql(newState);
  });

  it('HAS_PLAYED', () => {
    const state = {
      status: 'PLAYING',
      currentPlayer: 2,
      board: 1,
    };
    const action = {
      type: HAS_PLAYED,
      currentPlayer: 1,
      newBoard: 2,
    };
    const newState = {
      ...state,
      board: action.newBoard,
      currentPlayer: action.currentPlayer,
    };
    should(reducer(state, action)).eql(newState);
  });

});
