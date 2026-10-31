import { Player } from "./battleship.js";
import { Dom } from "./dom.js";

// setup html win modal
const winnerModal = document.getElementById("gameModal");
const winnerText = document.getElementById("winnerText");
const restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener("click", restartGame);

// set up players and randomize the board
let playerOne = new Player("Mario", "human");
// playerOne.gameboard.randomizeShipPlacement();

let playerTwo = new Player("Destroyer", "computer");
playerTwo.gameboard.randomizeShipPlacement();

// set up player turns
let currentPlayer = playerOne;
let enemyPlayer = playerTwo;

function switchTurns() {
  if (currentPlayer === playerOne) {
    currentPlayer = playerTwo;
    enemyPlayer = playerOne;
  } else {
    currentPlayer = playerOne;
    enemyPlayer = playerTwo;
  }
}

function playComputerMove() {
  if (currentPlayer.type !== "computer") return;

  // helper function to generate and verify the computer has not played the same random coordinates before
  function generateAndCheckCoordinates() {
    const randomNumber = () => Math.floor(Math.random() * 10);
    let x = randomNumber();
    let y = randomNumber();
    if (
      enemyPlayer.gameboard.tiles[y][x] === 2 ||
      enemyPlayer.gameboard.tiles[y][x] === 1
    ) {
      return false;
    } else {
      return [x, y];
    }
  }
  // keep getting coordinates if they have been played
  let targetCoordinates = generateAndCheckCoordinates();
  while (!targetCoordinates) targetCoordinates = generateAndCheckCoordinates();
  playTurn(targetCoordinates[0], targetCoordinates[1]);
}

function checkForWinner() {
  if (playerOne.gameboard.allShipsSunk()) return playerTwo;
  if (playerTwo.gameboard.allShipsSunk()) return playerOne;
  return false;
}

// restart the game
function restartGame() {
  playerOne = new Player("Mario", "human");
  playerTwo = new Player("Destroyer", "computer");
  playerOne.gameboard.randomizeShipPlacement();
  playerTwo.gameboard.randomizeShipPlacement();
  dom = new Dom(playerOne, playerTwo);
  dom.renderPlayerBoard();
  dom.renderEnemyBoard();
  winnerModal.classList.remove("show");
}

// main game function
export function playTurn(x, y) {
  enemyPlayer.gameboard.receiveAttack(x, y);
  dom.renderEnemyBoard();
  dom.renderPlayerBoard();

  const winner = checkForWinner();
  if (winner) {
    winnerText.innerText = `${winner.name} wins!`;
    winnerModal.classList.add("show");
    return;
  }
  switchTurns();
  playComputerMove();
}

// set up initial DOM and render
let dom = new Dom(playerOne, playerTwo);
dom.renderPlayerSetupBoard();

const opponentSide = document.querySelector(".opponent-side");
const gameContainer = document.querySelector(".container");
opponentSide.remove();

const randomizeBtn = document.querySelector("#randomize");

randomizeBtn.addEventListener("click", () => {
  const boatsSetup = document.querySelector(".boats-setup");
  boatsSetup.remove();
  gameContainer.append(opponentSide);
  playerOne.gameboard.randomizeShipPlacement();
  dom.renderPlayerBoard();
  dom.renderEnemyBoard();
});

// dom.renderPlayerBoard();
// dom.renderEnemyBoard();
