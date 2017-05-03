import { CELL_FRUIT_LOADED, FRUIT_LOADED, START_GAME, HAS_PLAYED, END_OF_GAME } from '../actions';
import { PLAYING, GAME_OVER } from '../game';

const reducer = (state, action) => {
  switch(action.type) {
    case CELL_FRUIT_LOADED:
      return {
        ...state,
        board: action.newBoard,
      };
    case FRUIT_LOADED:
      return {
        ...state,
        [action.name]: action.fruit,
      };
    case START_GAME:
      return {
        ...state,
        status: PLAYING,
        board: action.board,
        currentPlayer: action.currentPlayer,
        winner: undefined,
      };
    case HAS_PLAYED:
      return {
        ...state,
        board: action.newBoard,
        currentPlayer: action.currentPlayer,
      };
    case END_OF_GAME:
      return {
        ...state,
        board: action.board,
        currentPlayer: undefined,
        winner: action.winner,
        status: GAME_OVER,
        history: [...state.history, { id: state.history.length+1, winner: action.winner }]
      };
     default:
      return state;
  }
};

export default reducer;
