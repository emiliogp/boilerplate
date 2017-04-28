export const GAME_OVER = 'GAME_OVER';
export const PLAYING = 'PLAYING';
export const X = 'x';
export const O = 'o';
export const isStatusOver = status => status === GAME_OVER;

const isX = piece => piece === X;
const isO = piece => piece === O;
const isAPiece = piece => isX(piece) || isO(piece);

export const isComputer = (currentPlayer) => currentPlayer && currentPlayer.isComputer;
export const switchPlayer = ({ currentPlayer, player, computer }) => isComputer(currentPlayer) ? player : computer;
export const isNotEmptyCell = value => isAPiece(value);
export const isEmptyCell = value => !isNotEmptyCell(value);
export const isGameOver = board => board.filter(isNotEmptyCell).length === 9;
export const getEmptyBoard = () => [null, null, null, null, null, null, null, null, null];
export const getNewPlayer = ({ player, computer }) => Boolean(Math.round(Math.random())) ? player : computer;
export const getNextBoard = ({ currentPlayer: { piece }, board }, cell) => {
  const newBoard = [...board];
  newBoard[cell] = piece;
  return newBoard;
};


