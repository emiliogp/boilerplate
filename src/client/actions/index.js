import { isComputer, switchPlayer, getEmptyBoard, getNewPlayer, getNextBoard, isGameOver } from '../game';

export const START_GAME = 'START_GAME';
export const END_OF_GAME = 'END_OF_GAME';
export const HAS_PLAYED = 'HAS_PLAYED';

const computerPlay = () => (dispatch, getState) => {
  const { board } = getState();
  const emptyCells = board.map((x,i) => !x && i).filter(x=> x === 0 || x != false);
  if (emptyCells.length) setTimeout(() => dispatch(played(emptyCells[0])), 500);
}

export const startGame = () => (dispatch, getState) => {
  const { computer, player } = getState();
  const board = getEmptyBoard();
  const newPlayer = getNewPlayer({ computer, player });
  //const newPlayer = computer;
  dispatch({ type: START_GAME, board, currentPlayer: newPlayer });
  if (isComputer(newPlayer)) dispatch(computerPlay());
};

export const played = cell => (dispatch, getState) => {
  const state = getState();
  const { currentPlayer } = state;
  const newBoard = getNextBoard(state, cell);
  //const winner = hasAWinner(state, newBoard);
  //if (winner) return dispatch(gameOver(newBoard, winner));
  if (isGameOver(newBoard)) {
    dispatch({ type: HAS_PLAYED, newBoard, currentPlayer });
    return dispatch(gameOver(newBoard, currentPlayer));
  }
  const nextPlayer = switchPlayer(state);
  dispatch({ type: HAS_PLAYED, newBoard, nextPlayer });
  if (isComputer(nextPlayer)) dispatch(computerPlay());
};

export const gameOver = (board, winner) => dispatch => { 
  dispatch({ type: END_OF_GAME, board, winner });
};

