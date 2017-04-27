export const GAME_OVER = 'GAME_OVER';
export const PLAYING = 'PLAYING';
export const X = 'x';
export const O = 'o';
export const isStatusOver = status => status === GAME_OVER;

export const getEmptyBoard = () => [null, null, null, null, null, null, null, null, null];
export const getNewPlayer = ({ player, computer }) => Boolean(Math.round(Math.random())) ? player : computer;


