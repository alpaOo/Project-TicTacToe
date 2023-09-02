const gameAsset = (function () {
    // const cells = document.querySelectorAll('.cell');
    const cells: HTMLElement = document.querySelector(".cells");
    const playerStatus: HTMLElement = document.querySelector(".playerStatus");
    const gameStatus: HTMLElement = document.querySelector(".gameStatus");
    const resetButton: HTMLElement = document.querySelector(".resetButton");
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
interface GameInit {
    board: string[];
    currentPlayer: string;
    gameRunning: boolean;
}
function gameInit(this: GameInit) {
    this.board = ["", "", "", "", "", "", "", "", ""];
    this.currentPlayer = "X";
    this.gameRunning = true;
    gameAsset.playerStatus.textContent = `${this.currentPlayer}'s turn`;
    gameAsset.gameStatus.textContent = "";
    if (this.gameRunning === true) {
        gameAsset.cells.addEventListener("click", (event) => {
            if ((event.target as HTMLElement)?.className === "cell") {
                cellClicked.call(gameInit, event.target as HTMLElement);
                console.log(this.board);
            }
        });
    }
    resetGame.call(gameInit);
}
function cellClicked(this: GameInit, cell: HTMLElement) {
    if (this.gameRunning === true) {
        const cellIndex: number = parseInt(cell.getAttribute("data-cellIndex"));
        updateBoard.call(gameInit, cell, cellIndex);
    }
}
function updateBoard(this: GameInit, cell: HTMLElement, cellIndex: number) {
    this.board[cellIndex] = this.currentPlayer;
    cell.textContent = this.currentPlayer;
    switchPlayers.call(gameInit);
}
function switchPlayers(this: GameInit) {
    if (checkWinner.call(gameInit)) {
        gameAsset.gameStatus.textContent = `${this.currentPlayer} wins`;
        disableClickEvent.call(gameInit);
    }
    if (checkDraw.call(gameInit)) {
        gameAsset.gameStatus.textContent = "It's a DRAW";
        disableClickEvent.call(gameInit);
    }
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    gameAsset.playerStatus.textContent = `${this.currentPlayer}'s turn`;
}
function checkWinner(this: GameInit) {
    return gameAsset.winCondition.some((condition) => {
        return condition.every((index) => {
            return this.board[index] === this.currentPlayer;
        });
    });
}
function checkDraw(this: GameInit) {
    return this.board.every((value) => value !== "");
}
function disableClickEvent(this: GameInit) {
    this.gameRunning = false;
    gameAsset.cells.removeEventListener("click", function (event) {
        if ((event.target as HTMLElement)?.className === "cell") {
            cellClicked.call(gameInit, event.target as HTMLElement);
        }
    });
}
function resetGame(this: GameInit) {
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
