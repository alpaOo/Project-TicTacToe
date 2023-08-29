const gameAsset = (function () {
  const cells = document.querySelectorAll('.cell');
  const playerStatus = document.querySelector('.playerStatus');
  const gameStatus = document.querySelector('.gameStatus');
  const resetButton = document.querySelector('.resetButton');
  const currentPlayer = 'X';
  const gameRunning = false;
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
    currentPlayer,
    playerStatus,
    winCondition,
    gameStatus,
    resetButton,
    gameRunning
  };
})();

function gameInit() {
  gameAsset.gameRunning = true;
  const board = [
    '', '', '',
    '', '', '',
    '', '', '',
  ];
  if (gameAsset.gameRunning === true) {
    gameAsset.cells.forEach(cell => {
      cell.addEventListener('click', () => {
        cellClicked(cell, board);
      });
    });
  }
  gameAsset.playerStatus.textContent = `${gameAsset.currentPlayer}'s turn`;
  gameAsset.gameStatus.textContent = '';
  displayResetButton();
}

function cellClicked(cell, board) {
  if (gameAsset.gameRunning === true) {
    const cellIndex = cell.getAttribute('data-cellIndex');
    updateBoard(cell, cellIndex, board);
  }
}

function updateBoard(cell, cellIndex, board) {
  board[cellIndex] = gameAsset.currentPlayer;
  cell.textContent = gameAsset.currentPlayer;

  switchPlayers(board);
  displayResetButton();

  console.log(board);
}

function switchPlayers(board) {
  if (checkWinner(board)) {
    gameAsset.gameStatus.textContent = `${gameAsset.currentPlayer} wins`;
    disableClickEvent();
    // resetGame(board);
  } else {
    gameAsset.currentPlayer = (gameAsset.currentPlayer === 'X') ? 'O' : 'X';
    gameAsset.playerStatus.textContent = `${gameAsset.currentPlayer}'s turn`;
  }
}


function checkWinner(board) {
  return gameAsset.winCondition.some((condition) => {
    return condition.every((index) => {
      return board[index] === gameAsset.currentPlayer;
    });
  });
}

function disableClickEvent() {
  gameAsset.gameRunning = false;
  gameAsset.cells.forEach(cell => {
    cell.removeEventListener('click', cellClicked);
  });
}

function displayResetButton() {
  gameAsset.resetButton.style.display = (gameAsset.gameRunning) ? 'none' : 'block';
}

// function resetGame(board) {

//   gameAsset.resetButton.addEventListener('click', () => {

//     board.splice(0, board.length, '', '', '', '', '', '', '', '', '');

//     gameAsset.gameRunning = true;
//     gameAsset.gameStatus.textContent = '';
//     gameAsset.playerStatus.textContent = '';
//     gameAsset.playerStatus.textContent = `${gameAsset.currentPlayer}'s turn`;

//     gameAsset.cells.forEach(cell => {
//       cell.textContent = '';
//       cell.addEventListener('click', () => {
//         cellClicked(cell, board);
//       });
//     });
//   });
// }

gameInit();
