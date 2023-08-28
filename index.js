const gameAsset = (function () {
  const cells = document.querySelectorAll('.cell');
  const currentPlayer = 'X';
  const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  return {
    cells,
    currentPlayer
  };
})();

function gameInit() {
  const board = [
    '', '', '',
    '', '', '',
    '', '', '',
  ];
  gameAsset.cells.forEach(cell => {
    cell.addEventListener('click', () => {
      cellClicked(cell, board);
    });
  });
}

function cellClicked(cell, board) {
  const cellIndex = cell.getAttribute('data-cellIndex');
  updateBoard(cell, cellIndex, board);
}

function updateBoard(cell, cellIndex, board) {
  board[cellIndex] = gameAsset.currentPlayer;
  cell.textContent = gameAsset.currentPlayer;
  switchPlayers();

  console.log(board);
}

function switchPlayers() {
  if (gameAsset.currentPlayer === 'X') {
    gameAsset.currentPlayer = 'O';
  } else {
    gameAsset.currentPlayer = 'X';
  }
}

function checkWinner() {

}

gameInit();
