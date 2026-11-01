import { Player } from "./battleship.js";
import { Dom } from "./dom.js";
import { boatSetupHtmlBlock } from "./shipSetup.js";

// setup html win modal
const winnerModal = document.getElementById("gameModal");
const winnerText = document.getElementById("winnerText");
const restartBtn = document.getElementById("restartBtn");
const boatsFreshHtml = boatSetupHtmlBlock;
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
  playerTwo.gameboard.randomizeShipPlacement();
  dom = new Dom(playerOne, playerTwo);
  addBoats();
  dom.renderPlayerSetupBoard();
  dom.renderEnemyBoard();
  opponentSide = document.querySelector(".opponent-side");
  opponentSide.remove();
  winnerModal.classList.remove("show");
}

// main game function
function playTurn(x, y) {
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

//function that adds the ships on the setup screen
// if any buttons on the ship screen need event listeners - they go here
function addBoats() {
  gameContainer.insertAdjacentHTML("beforeend", boatSetupHtmlBlock);

  const randomizeBtn = document.querySelector("#randomize");
  randomizeBtn.addEventListener("click", () => {
    const boatsSetup = document.querySelector(".boats-setup");
    boatsSetup.remove();
    gameContainer.append(opponentSide);
    playerOne.gameboard.clearGameboard();
    playerOne.gameboard.randomizeShipPlacement();
    dom.renderPlayerBoard();
    dom.renderEnemyBoard();
  });
}

// start the game after setup
function startGame() {
  const boatsSetup = document.querySelector(".boats-setup");
  boatsSetup.remove();
  gameContainer.append(opponentSide);
  dom.renderPlayerBoard();
  dom.renderEnemyBoard();
}

// set up initial DOM and render
let dom = new Dom(playerOne, playerTwo);
let opponentSide = document.querySelector(".opponent-side");
let gameContainer = document.querySelector(".container");
opponentSide.remove();
addBoats();
dom.renderPlayerSetupBoard();

// remove enemy board and render ship placement screen

// randomize fleet button event listener

export { playTurn, startGame };
