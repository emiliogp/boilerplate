import { getEmptyBoard, getNewPlayer } from '../game';

export const START_GAME = 'START_GAME';

export const startGame = (player, computer) => {
  const board = getEmptyBoard();
  const newPlayer = getNewPlayer({ computer, player });
  console.log('Start the game');
  return { 
    type: START_GAME, 
    board, 
    currentPlayer: newPlayer,
  };
};

