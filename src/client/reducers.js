import { START_GAME } from './actions';
import { PLAYING } from './game';

const reducer = (state, action) => {
  switch(action.type) {
    case START_GAME:
      return {
        ...state,
        status: PLAYING,
        board: action.board,
        currentPlayer: action.currentPlayer,
      };
  }
};

export default reducer;
