import R from 'ramda';

export const GAME_OVER = 'GAME_OVER';
export const X = 'x';
export const O = 'o';
export const isStatusOver = status => status === GAME_OVER;
export const addAPiece = (oldBoard) => {
  const isEmptyCell = cell => cell !== X && cell !== O;
  const index = R.findIndex(isEmptyCell, oldBoard);
  const newBoard = R.update(index, X, oldBoard);
  return newBoard;
};
