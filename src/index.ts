const gameAsset = (function () {
  const cells = document.querySelectorAll('.cell');
  const playerStatus = document.querySelector('.playerStatus');
  const gameStatus = document.querySelector('.gameStatus');
  const resetButton = document.querySelector('.resetButton') as HTMLElement;
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

interface GameInit {
  board: string[],
  currentPlayer: string,
  gameRunning: boolean
}

function gameInit(this: GameInit) {
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
      cell.addEventListener('click', (event) => {
        cellClicked.call(this, event.currentTarget as HTMLElement)
      });
    });
  }
  displayResetButton.call(this);
}

function cellClicked(this: GameInit, cell: HTMLElement) {
  if (this.gameRunning === true) {
    const cellIndex: number = parseInt(cell.getAttribute('data-cellIndex'));
    updateBoard.call(gameInit, cell, cellIndex);
  }
}

function updateBoard(this: GameInit, cell: HTMLElement, cellIndex: number) {
  this.board[cellIndex] = this.currentPlayer;
  cell.textContent = this.currentPlayer;

  // switchPlayers(board);
  switchPlayers.call(gameInit);
  displayResetButton.call(gameInit);

  console.log(this.board);
}

function switchPlayers(this: GameInit) {
  if (checkWinner.call(gameInit)) {
    gameAsset.gameStatus.textContent = `${this.currentPlayer} wins`;
    disableClickEvent.call(gameInit);
    resetGame();
  } else {
    this.currentPlayer = (this.currentPlayer === 'X') ? 'O' : 'X';
    gameAsset.playerStatus.textContent = `${this.currentPlayer}'s turn`;
  }
}

function checkWinner(this: GameInit) {
  return gameAsset.winCondition.some((condition) => {
    return condition.every((index) => {
      return this.board[index] === this.currentPlayer;
    });
  });
}

function disableClickEvent(this: GameInit) {
  this.gameRunning = false;
  gameAsset.cells.forEach(cell => {
    cell.removeEventListener('click', (event) => {
      cellClicked.call(this, event.currentTarget as HTMLElement)
    });
  });
}

function displayResetButton(this: GameInit) {
  gameAsset.resetButton.style.display = (this.gameRunning) ? 'none' : 'block';
}

function resetGame() {
  gameAsset.resetButton.addEventListener('click', () => {
    gameInit.call(gameInit);
  });
}

gameInit.call(gameInit);
