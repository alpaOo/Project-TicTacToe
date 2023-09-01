var gameAsset = (function () {
    var cells = document.querySelectorAll('.cell');
    var playerStatus = document.querySelector('.playerStatus');
    var gameStatus = document.querySelector('.gameStatus');
    var resetButton = document.querySelector('.resetButton');
    var winCondition = [
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
        cells: cells,
        playerStatus: playerStatus,
        winCondition: winCondition,
        gameStatus: gameStatus,
        resetButton: resetButton,
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
    gameAsset.playerStatus.textContent = "".concat(this.currentPlayer, "'s turn");
    gameAsset.gameStatus.textContent = '';
    if (this.gameRunning === true) {
        gameAsset.cells.forEach(function (cell) {
            cell.textContent = '';
            cell.addEventListener('click', function () {
                cellClicked(cell);
            });
        });
    }
    displayResetButton();
}
function cellClicked(cell) {
    if (this.gameRunning === true) {
        var cellIndex = cell.getAttribute('data-cellIndex');
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
        gameAsset.gameStatus.textContent = "".concat(this.currentPlayer, " wins");
        disableClickEvent();
        resetGame();
    }
    else {
        this.currentPlayer = (this.currentPlayer === 'X') ? 'O' : 'X';
        gameAsset.playerStatus.textContent = "".concat(this.currentPlayer, "'s turn");
    }
}
function checkWinner() {
    var _this = this;
    return gameAsset.winCondition.some(function (condition) {
        return condition.every(function (index) {
            return _this.board[index] === _this.currentPlayer;
        });
    });
}
function disableClickEvent() {
    this.gameRunning = false;
    gameAsset.cells.forEach(function (cell) {
        cell.removeEventListener('click', cellClicked);
    });
}
function displayResetButton() {
    gameAsset.resetButton.style.display = (this.gameRunning) ? 'none' : 'block';
}
function resetGame() {
    gameAsset.resetButton.addEventListener('click', function () {
        gameInit();
    });
}
gameInit();
