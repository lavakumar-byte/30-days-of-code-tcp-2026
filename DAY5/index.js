const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X";
let gameActive = true;
let gameState = Array(9).fill("");

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

const X_SVG = `
<svg viewBox="0 0 100 100">
  <line x1="10" y1="10" x2="90" y2="90" stroke="#00fff0" stroke-width="12" stroke-linecap="round"/>
  <line x1="90" y1="10" x2="10" y2="90" stroke="#00fff0" stroke-width="12" stroke-linecap="round"/>
</svg>
`;

const O_SVG = `
<svg viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="35" stroke="#ff4d6d" stroke-width="12" fill="none"/>
</svg>
`;

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || gameState[index] !== "") return;

  gameState[index] = currentPlayer;
  e.target.innerHTML = currentPlayer === "X" ? X_SVG : O_SVG;

  checkResult();
}

function checkResult() {
  let roundWon = false;
  let winningCombo = [];

  for (let pattern of winPatterns) {
    const [a,b,c] = pattern;
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      roundWon = true;
      winningCombo = pattern;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    winningCombo.forEach(i => cells[i].classList.add("win"));
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusText.textContent = "It's a Draw!";
    board.classList.add("draw");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  gameState.fill("");
  statusText.textContent = "Player X's turn";
  board.classList.remove("draw");

  cells.forEach(cell => {
    cell.innerHTML = "";
    cell.classList.remove("win");
  });
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);
