var gameAsset = (function () {
    // const cells = document.querySelectorAll('.cell');
    var cells = document.querySelector('.cells');
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
        gameAsset.cells.addEventListener('click', function (event) {
            var _a;
            if (((_a = event.target) === null || _a === void 0 ? void 0 : _a.className) === 'cell') {
                cellClicked.call(gameInit, event.target);
            }
        });
    }
    displayResetButton.call(this);
}
function cellClicked(cell) {
    if (this.gameRunning === true) {
        var cellIndex = parseInt(cell.getAttribute('data-cellIndex'));
        updateBoard.call(gameInit, cell, cellIndex);
    }
}
function updateBoard(cell, cellIndex) {
    this.board[cellIndex] = this.currentPlayer;
    cell.textContent = this.currentPlayer;
    switchPlayers.call(gameInit);
    displayResetButton.call(gameInit);
    console.log(this.board);
}
function switchPlayers() {
    if (checkWinner.call(gameInit)) {
        gameAsset.gameStatus.textContent = "".concat(this.currentPlayer, " wins");
        disableClickEvent.call(gameInit);
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
    gameAsset.cells.removeEventListener('click', function (event) {
        var _a;
        if (((_a = event.target) === null || _a === void 0 ? void 0 : _a.className) === 'cell') {
            cellClicked.call(gameInit, event.target);
        }
    });
}
function displayResetButton() {
    gameAsset.resetButton.style.display = (this.gameRunning) ? 'none' : 'block';
}
function resetGame() {
    gameAsset.resetButton.addEventListener('click', function () {
        gameInit.call(gameInit);
    });
}
gameInit.call(gameInit);
