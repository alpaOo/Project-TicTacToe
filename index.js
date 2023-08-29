const gameAsset = (function () {
  const cells = document.querySelectorAll('.cell');
  const playerStatus = document.querySelector('.playerStatus');
  const gameStatus = document.querySelector('.gameStatus');
  const resetButton = document.querySelector('.resetButton');
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
    playerStatus,
    winCondition,
    gameStatus,
    resetButton,
  };
})();

function gameInit() {
  this.board = [
    '', '', '',
    '', '', '',
    '', '', '',
  ];
  this.currentPlayer = 'X';
  this.gameRunning = true;
  gameAsset.playerStatus.textContent = `${this.currentPlayer}'s turn`;
  gameAsset.gameStatus.textContent = '';
  if (this.gameRunning === true) {
    gameAsset.cells.forEach(cell => {
      cell.textContent = '';
      cell.addEventListener('click', () => {
        cellClicked(cell);
      });
    });
  }
  displayResetButton();
}

function cellClicked(cell) {
  if (this.gameRunning === true) {
    const cellIndex = cell.getAttribute('data-cellIndex');
    updateBoard(cell, cellIndex);
  }
}

function updateBoard(cell, cellIndex) {
  this.board[cellIndex] = this.currentPlayer;
  cell.textContent = this.currentPlayer;

  // switchPlayers(board);
  switchPlayers();
  displayResetButton();

  console.log(this.board);
}

function switchPlayers() {
  if (checkWinner()) {
    gameAsset.gameStatus.textContent = `${this.currentPlayer} wins`;
    disableClickEvent();
    resetGame();
  } else {
    this.currentPlayer = (this.currentPlayer === 'X') ? 'O' : 'X';
    gameAsset.playerStatus.textContent = `${this.currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return gameAsset.winCondition.some((condition) => {
    return condition.every((index) => {
      return this.board[index] === this.currentPlayer;
    });
  });
}

function disableClickEvent() {
  this.gameRunning = false;
  gameAsset.cells.forEach(cell => {
    cell.removeEventListener('click', cellClicked);
  });
}

function displayResetButton() {
  gameAsset.resetButton.style.display = (this.gameRunning) ? 'none' : 'block';
}

function resetGame() {
  gameAsset.resetButton.addEventListener('click', () => {
    gameInit();
  });
}

gameInit();
