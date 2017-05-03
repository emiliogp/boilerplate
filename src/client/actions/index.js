import axios from 'axios';
import config from '../../../config';
import { isComputer, switchPlayer, getEmptyBoard, getNewPlayer, getNextBoard, isGameOver } from '../game';

export const START_GAME = 'START_GAME';
export const END_OF_GAME = 'END_OF_GAME';
export const HAS_PLAYED = 'HAS_PLAYED';
export const FRUIT_LOADED = 'FRUIT_LOADED';
export const CELL_FRUIT_LOADED = 'CELL_FRUIT_LOADED';

const { server: { host, port } = {} }  = config;

const computerPlay = () => (dispatch, getState) => {
  const url = `http://${host}:${port}/api/computer/play`;
  const { board, computer, player } = getState();
  const data = {
    board,
    computer: computer.piece,
    player: player.piece,
  };
  const options = {
    data,
    url,
  };
  axios.post(options)
    .then(({ data }) => dispatch(played(data.move)))
    .catch(console.error);
}

// const computerPlay = () => (dispatch, getState) => {
//   const { board } = getState();
//   const emptyCells = board.map((x,i) => !x && i).filter(x=> x === 0 || x != false);
//   if (emptyCells.length) setTimeout(() => dispatch(played(emptyCells[0])), 500);
// }

const fruitLoaded = (name, fruit) => dispatch => {
  dispatch({ type: FRUIT_LOADED, name, fruit });
  if (fruit.icon !== 'paper-plane') dispatch(loadFruit(name));
};

const loadOneFruit = () => axios.get({
  url: 'https://hook.io/eric-basley/fruit',
}).then(({ data }) => data);

const cellFruitLoaded = (index, fruit) => (dispatch, getState) => {
  const { board } = getState();
  const newBoard = getNextBoard({ currentPlayer: { piece: fruit }, board }, index);
  dispatch({ type: CELL_FRUIT_LOADED, newBoard });
};

const loadCellFruit = (dispatch, i) => {
  const loadFruits = Array.from(new Array(3), () => loadOneFruit);
  return loadFruits.reduce(
    (acc, p) => acc.then(() => p().then(fruit => dispatch(cellFruitLoaded(i, fruit)))),
    Promise.resolve()
  );
};

// const loadCellFruit = (dispatch, i) => {
//   return loadOneFruit().then(fruit => {
//     dispatch(cellFruitLoaded(i, fruit));
//     if (fruit.icon !== 'paper-plane') return loadCellFruit(dispatch, i);
//     return ;
//   });
// };

const loadCellFruits = (dispatch, getState) => {
  const { board } = getState();
  const promises = Array.from(new Array(board.length), (_, i) => loadCellFruit(dispatch, i));
  return Promise.all(promises)
};

export const loadFruit = (name) => dispatch => loadOneFruit()
  .then(fruit => dispatch(fruitLoaded(name, fruit)));

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
  const { currentPlayer, player, computer } = state;
  const newBoard = getNextBoard(state, cell);
  const data = { board: newBoard };
  const url = `http://${host}:${port}/api/game/hasawinner`;
  const options = { data, url };
  axios.post(options)
    .then(({ data }) => {
      const winner = data.winner && (data.winner === computer.piece ? computer : player);

      if (winner) {
        dispatch({ type: HAS_PLAYED, newBoard, currentPlayer });
        return dispatch(gameOver(newBoard, winner));
      }
      if (isGameOver(newBoard)) {
        dispatch({ type: HAS_PLAYED, newBoard, currentPlayer });
        return dispatch(gameOver(newBoard));
      }
      const nextPlayer = switchPlayer(state);
      dispatch({ type: HAS_PLAYED, newBoard, currentPlayer: nextPlayer });
      if (isComputer(nextPlayer)) dispatch(computerPlay());
    })
    .catch(console.error);
};

export const gameOver = (board, winner) => (dispatch, getState) => { 
  loadCellFruits(dispatch, getState)
  .then(() => dispatch({ type: END_OF_GAME, board, winner }));
};

