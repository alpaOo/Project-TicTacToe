"use strict";
const gameAsset = (function () {
    const cells = document.querySelector(".cells");
    const playerStatus = document.querySelector(".playerStatus");
    const gameStatus = document.querySelector(".gameStatus");
    const resetButton = document.querySelector(".resetButton");
    const winCondition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
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
    this.board = ["", "", "", "", "", "", "", "", ""];
    this.currentPlayer = "X";
    this.gameRunning = true;
    gameAsset.playerStatus.textContent = `${this.currentPlayer}'s turn`;
    gameAsset.gameStatus.textContent = "";
    gameAsset.cells.addEventListener("click", (event) => {
        cellClicked.call(gameInit, event.target);
        console.log(this.board);
    });
    resetGame.call(gameInit);
}
function cellClicked(cell) {
    if (this.gameRunning === true && cell.textContent === "") {
        updateBoard.call(gameInit, cell);
        if (checkWinner.call(gameInit) === true) {
            gameAsset.gameStatus.textContent = `${this.currentPlayer} wins`;
            disableClickEvent.call(gameInit);
        }
        if (checkDraw.call(gameInit) === true) {
            gameAsset.gameStatus.textContent = "It's a DRAW";
            disableClickEvent.call(gameInit);
        }
    }
}
function updateBoard(cell) {
    const cellIndex = parseInt(cell.id);
    if (this.currentPlayer === "X") {
        this.board[cellIndex] = this.currentPlayer;
        cell.textContent = this.currentPlayer;
        aiPlayer.call(this);
    }
    else {
        this.board[cellIndex] = this.currentPlayer;
        cell.textContent = this.currentPlayer;
        this.currentPlayer = "X";
    }
}
function aiPlayer() {
    this.currentPlayer = "O";
    const emptyCells = this.board
        .map(function (cell, index) {
        return { cell, index };
    })
        .filter(function ({ cell }) {
        return cell === "";
    });
    if (emptyCells.length === 0)
        return;
    const rndIndex = Math.floor(Math.random() * emptyCells.length);
    const { index } = emptyCells[rndIndex];
    this.board[index] = this.currentPlayer;
    const cell = document.getElementById(index.toString());
    if (cell)
        cell.textContent = this.currentPlayer;
    this.currentPlayer = "X";
}
function checkWinner() {
    const XWinner = gameAsset.winCondition.some((condition) => {
        const playerCells = condition.map((index) => this.board[index]);
        return playerCells.every((cell) => cell === "X");
    });
    const OWinner = gameAsset.winCondition.some((condition) => {
        const playerCells = condition.map((index) => this.board[index]);
        return playerCells.every((cell) => cell === "O");
    });
    if (XWinner) {
        this.currentPlayer = "X";
        return true;
    }
    if (OWinner) {
        this.currentPlayer = "O";
        return true;
    }
    return false;
}
function checkDraw() {
    return this.board.every((value) => value !== "");
}
function disableClickEvent() {
    this.gameRunning = false;
    gameAsset.cells.removeEventListener("click", (event) => {
        cellClicked.call(gameInit, event.target);
    });
}
function resetGame() {
    gameAsset.resetButton.addEventListener("click", () => {
        this.board = ["", "", "", "", "", "", "", "", ""];
        this.currentPlayer = "X";
        this.gameRunning = true;
        gameAsset.playerStatus.textContent = `${this.currentPlayer}'s turn`;
        gameAsset.gameStatus.textContent = "";
        Array.from(gameAsset.cells.children).forEach((cell) => {
            cell.firstElementChild.textContent = "";
        });
    });
}
gameInit.call(gameInit);
