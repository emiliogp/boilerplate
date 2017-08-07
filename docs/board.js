const X = 1;
const O = 2;
const board = [
  X, , O,
   ,O, X,
  O, , X
];
const isX = piece => piece === X;
const isO = piece => piece === O;
const patterns = [
  isLineFull(0), 
  isLineFull(1), 
  isLineFull(2), 
  isColumnFull(0),
  isColumnFull(1),
  isColumnFull(2),
  isLeftDiagonalFull,
  isRightDiagonalFull,
];
const isEndend = board => patterns.some(fct => fct(board));
console.log(isEndend(board));

