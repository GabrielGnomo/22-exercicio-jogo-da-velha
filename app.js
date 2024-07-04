// Obtém elementos HTML
const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
const currentPlayerText = document.querySelector(".currentPlayer");
const restartBtn = document.querySelector(".restart");
const playersForm = document.querySelector(".players");
const player1Input = document.querySelector("#player1");
const player2Input = document.querySelector("#player2");
const themeBtn = document.querySelector(".theme");
const startBtn = document.querySelector(".start");

// Define variáveis do jogo
let boardArray = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let winner = null;
let winningLine = null;
let darkThemeEnabled = false;

// Define funções
function drawBoard() {
  boardArray.forEach((cell, index) => {
    cells[index].textContent = cell;
    cells[index].classList.remove("winning");
  });
}

function checkWin() {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];

    if (
      boardArray[a] &&
      boardArray[a] === boardArray[b] &&
      boardArray[a] === boardArray[c]
    ) {
      winningLine = winningLines[i];
      return boardArray[a];
    }
  }

  return null;
}

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell"));

  if (boardArray[clickedCellIndex] !== "" || winner !== null) {
    return;
  }

  boardArray[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.classList.add(currentPlayer);

  const result = checkWin();

  if (result !== null) {
    winner = result;
    currentPlayerText.textContent = `${winner} venceu!`;

    // Destaca a linha vencedora em verde
    winningLine.forEach((index) => {
      cells[index].classList.add("winning", "winning-line");
    });
  } else if (boardArray.indexOf("") === -1) {
    currentPlayerText.textContent = "Empate!";
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    currentPlayerText.textContent = `${currentPlayer}'s vez`;
  }
}

function handleRestartClick() {
  boardArray = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  winner = null;
  winningLine = null;
  drawBoard();
  currentPlayerText.textContent = `${player1Input.value}'s vez`;

  // Limpa o destaque
  cells.forEach((cell) => {
    cell.classList.remove("winning", "winning-line");
  });
}

function handlePlayersFormSubmit(event) {
  event.preventDefault();
  currentPlayerText.textContent = `${player1Input.value}'s vez`;
}

function handleThemeClick() {
  darkThemeEnabled = !darkThemeEnabled;

  if (darkThemeEnabled) {
    document.body.classList.add("dark");
    themeBtn.textContent = "Trocar para tema claro";
  } else {
    document.body.classList.remove("dark");
    themeBtn.textContent = "Trocar para tema escuro";
  }
}

function handleStartClick() {
  let countdown = 3;

  currentPlayerText.textContent = "Preparando o jogo...";

  const intervalId = setInterval(() => {
    if (countdown === 0) {
      clearInterval(intervalId);
      currentPlayerText.textContent = `${player1Input.value}'s vez`;
      cells.forEach((cell) => {
        cell.addEventListener("click", handleCellClick);
      });
    } else {
      currentPlayerText.textContent = `Começando em ${countdown}...`;
      countdown--;
    }
  }, 1000);
}

// Adiciona listeners de eventos

restartBtn.addEventListener("click", handleRestartClick);
playersForm.addEventListener("submit", handlePlayersFormSubmit);
themeBtn.addEventListener("click", handleThemeClick);
startBtn.addEventListener("click", handleStartClick);
playAgainstAIButton.addEventListener("click", playAgainstAI);

// Chama a função para desenhar/ iniciar o tabuleiro
drawBoard();
