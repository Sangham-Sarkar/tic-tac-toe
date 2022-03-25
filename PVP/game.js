const xClass = "x";
const oClass = "o";
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
const cellElement = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const restartButton = document.getElementById("restartButton");
const winningMessage = document.getElementById("winning-message");
const winningMessageTextElement = document.querySelector(
  "[winning-message-text]"
);
let oTurn;

const handleClick = (e) => {
    const cell = e.target;
    const currentClass = oTurn ? oClass : xClass;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    } else {
      swapTurns();
      setBoardHoverClass();
    }
};

const setBoardHoverClass = () => {
    board.classList.remove(xClass);
    board.classList.remove(oClass);
    if (oTurn) {
      board.classList.add(oClass);
    } else {
      board.classList.add(xClass);
    }
  };

const startGame = () => {
  oTurn = false;
  cellElement.forEach((cell) => {
    cell.classList.remove(xClass);
    cell.classList.remove(oClass);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessage.classList.remove("show");
};

startGame();
restartButton.addEventListener("click", startGame);



const endGame = (draw) => {
  if (draw) {
    winningMessageTextElement.innerText = "draw";
  } else {
    winningMessageTextElement.innerText = `${oTurn ? "O " : "X "} Wins!`;
  }
  winningMessage.classList.add("show");
};

const placeMark = (cell, currentClass) => {
  cell.classList.add(currentClass);
};

const swapTurns = () => {
  oTurn = !oTurn;
};

const isDraw = () => {
  return [...cellElement].every((cell) => {
    return cell.classList.contains(xClass) || cell.classList.contains(oClass);
  });
};



const checkWin = (currentClass) => {
  return winningCombinations.some((combinations) => {
    return combinations.every((index) => {
      return cellElement[index].classList.contains(currentClass);
    });
  });
};
