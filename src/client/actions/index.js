import { getEmptyBoard, getNewPlayer } from '../game';

export const START_GAME = 'START_GAME';

export const startGame = () => (dispatch, getState) => {
  const { computer, player } = getState();
  const board = getEmptyBoard();
  const newPlayer = getNewPlayer({ computer, player });
  dispatch({ 
    type: START_GAME, 
    board, 
    currentPlayer: newPlayer,
  });
};

