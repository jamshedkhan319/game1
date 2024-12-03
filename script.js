// গেম স্টেট
let currentPlayer = "X";
let boardState = Array(9).fill(null);
let isClickSoundEnabled = true;
let isWinDrawSoundEnabled = true;

// HTML এলিমেন্ট গুলো নির্বাচন
const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");
const clickSound = document.getElementById("click-sound");
const winSound = document.getElementById("win-sound");
const drawSound = document.getElementById("draw-sound");
const settingsIcon = document.getElementById("settings-icon");
const settingsMenu = document.getElementById("settings-menu");
const clickSoundIcon = document.getElementById("click-sound-icon");
const winDrawSoundIcon = document.getElementById("win-draw-sound-icon");

// বোর্ড তৈরি করা
function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = i;
    board.appendChild(cell);
  }
}

// গেম শুরু করা
function startGame() {
  createBoard();
  currentPlayer = "X";
  boardState = Array(9).fill(null);
  statusText.textContent = "Player X এর পালা";
  addEventListeners();
}

// ইভেন্ট লিসেনার যোগ করা
function addEventListeners() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", handleMove);
  });
  resetButton.addEventListener("click", startGame);

  // সেটিংস মেনু টগল হ্যান্ডলার
  settingsIcon.addEventListener("click", () => {
    settingsMenu.classList.toggle("hidden");
  });

  // ক্লিক সাউন্ড টগল
  clickSoundIcon.addEventListener("click", () => {
    isClickSoundEnabled = !isClickSoundEnabled;
    clickSoundIcon.textContent = isClickSoundEnabled ? "🔈" : "🔇";
  });

  // উইন/ড্র সাউন্ড টগল
  winDrawSoundIcon.addEventListener("click", () => {
    isWinDrawSoundEnabled = !isWinDrawSoundEnabled;
    winDrawSoundIcon.textContent = isWinDrawSoundEnabled ? "🔈" : "🔇";
  });
}

// খেলোয়াড়ের চাল
function handleMove(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (boardState[index] === null) {
    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (isClickSoundEnabled) clickSound.play();

    if (checkWinner()) {
      statusText.textContent = `Player ${currentPlayer} বিজয়ী! 🎉`;
      if (isWinDrawSoundEnabled) winSound.play();
      disableBoard();
    } else if (boardState.every((cell) => cell !== null)) {
      statusText.textContent = "ড্র হয়েছে!";
      if (isWinDrawSoundEnabled) drawSound.play();
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.textContent = `Player ${currentPlayer} এর পালা`;
    }
  }
}

// বোর্ড ডিজেবল করা
function disableBoard() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.style.pointerEvents = "none";
  });
}

// বিজয়ী নির্ধারণ
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winningCombinations.some((combination) => {
    const [a, b, c] = combination;
    return (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    );
  });
}

// গেম শুরু করা
startGame();
