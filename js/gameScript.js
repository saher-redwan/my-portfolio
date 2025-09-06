const openBtn = document.getElementById("tictoe-openBtn");
const overlay = document.getElementById("tictoe-overlay");
const closeBtn = document.getElementById("tictoe-closeBtn");
const boardEl = document.getElementById("tictoe-board");
const statusEl = document.getElementById("tictoe-status");
const restartBtn = document.getElementById("tictoe-restart");

let board, currentPlayer, gameActive;

function createBoard() {
    boardEl.innerHTML = "";
    board = Array(9).fill(null);
    currentPlayer = "X";
    gameActive = true;
    statusEl.innerHTML = "Player <span>X's</span> turn";

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("tictoe-cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        boardEl.appendChild(cell);
    }
}

function handleCellClick(e) {
    const idx = e.target.dataset.index;
    if (!gameActive || board[idx]) return;

    board[idx] = currentPlayer;
    e.target.innerHTML = `<span>${currentPlayer}</span>`;

    function addAnimation() {
        statusEl.classList.remove("add-animation")
        statusEl.classList.add("add-animation")
        setTimeout(() => {
            statusEl.classList.remove("add-animation")
        }, 250);
    }

    if (checkWin(currentPlayer)) {
        statusEl.innerHTML = `Player <span>${currentPlayer}</span> wins! 🎉`;
        addAnimation()
        gameActive = false;
        return;
    }

    if (board.every(cell => cell)) {
        statusEl.innerHTML = "It's a draw! 🤝";
        addAnimation()
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusEl.innerHTML = `Player <span>${currentPlayer}'s</span> turn`;
}

function checkWin(player) {
    const wins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
        [0, 4, 8], [2, 4, 6]          // diagonals
    ];
    return wins.some(comb => comb.every(i => board[i] === player));
}

openBtn.addEventListener("click", () => {
    overlay.style.display = "flex";
    createBoard();
});

closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
});

// to close modal by overlay
overlay.addEventListener("click", (e) => {
    if (e.target.id === "tictoe-overlay") {
        overlay.style.display = "none";
    }
});

restartBtn.addEventListener("click", createBoard);