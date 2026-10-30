import { Player, Ship } from "./battleship.js";
import { Dom } from "./dom.js";

// set up players
const playerOne = new Player("Mario", "human");
playerOne.gameboard.placeShip(3, 2, new Ship(3), "vertical");

const playerTwo = new Player("Luigi", "computer");
playerTwo.gameboard.placeShip(2, 7, new Ship(3), "horizontal");

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
  const randomNumber = () => Math.floor(Math.random() * 9) + 1;
  playTurn(randomNumber(), randomNumber());
}

export function playTurn(x, y) {
  enemyPlayer.gameboard.receiveAttack(x, y);
  dom.renderEnemyBoard();
  dom.renderPlayerBoard();
  switchTurns();
  playComputerMove();
}

// set up DOM and render
const dom = new Dom(playerOne, playerTwo);
dom.renderPlayerBoard();
dom.renderEnemyBoard();
